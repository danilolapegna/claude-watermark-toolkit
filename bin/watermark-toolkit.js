#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";
import {
  adaptiveSearch,
  assertRewriteCase,
  createManualBrief,
  createProvider,
  createRewriteCase,
  explainScore,
  extractInvariants,
  buildPromptPair,
  rankRewriteTargets,
  scoreCandidate,
  selectCandidates,
  semanticReconstitution,
} from "../src/index.js";

const VERSION = "1.0.0";

function output(value, json = false) {
  process.stdout.write(json ? `${JSON.stringify(value, null, 2)}\n` : `${value}\n`);
}

function fail(message, code = 1) {
  process.stderr.write(`Error: ${message}\n`);
  process.exitCode = code;
}

function help() {
  return `Claude Watermark Toolkit ${VERSION}

Usage:
  watermark-toolkit start <source.txt> [--lang en|it] [--json]
  watermark-toolkit prepare <source.txt> [--lang en|it] [--protect VALUE] [--out case.json]
  watermark-toolkit prompt <source.txt> [--lang en|it] [--out prompts.json]
  watermark-toolkit targets <source.txt> [--scores token-scores.json] [--json]
  watermark-toolkit check <source.txt> <candidate.txt> [--lang en|it] [--json]
  watermark-toolkit compare <source.txt> <candidate.txt...> [--lang en|it] [--json]
  watermark-toolkit rewrite <source.txt> --provider ollama|openai-compatible --model MODEL [options]

Rewrite options:
  --method semantic|adaptive
  --count N
  --generations N
  --base-url URL
  --api-key KEY
  --out result.json

The source file is never modified.`;
}

function parse(argv) {
  const [command, ...rest] = argv;
  const options = { _: [] };
  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index];
    if (!value.startsWith("--")) {
      options._.push(value);
      continue;
    }
    const name = value.slice(2);
    if (name === "json") {
      options.json = true;
      continue;
    }
    const next = rest[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`Option --${name} needs a value.`);
    index += 1;
    if (name === "protect") {
      options.protect = [...(options.protect || []), next];
    } else {
      options[name.replace(/-([a-z])/gu, (_, letter) => letter.toUpperCase())] = next;
    }
  }
  return { command, options };
}

async function loadSource(file, language, protect = []) {
  const source = await readFile(file, "utf8");
  const rewriteCase = createRewriteCase({ source, language });
  rewriteCase.invariants = extractInvariants(source, protect);
  rewriteCase.brief = createManualBrief(rewriteCase);
  return rewriteCase;
}

async function saveOrPrint(value, options, human) {
  if (options.out) {
    await writeFile(options.out, `${JSON.stringify(value, null, 2)}\n`, "utf8");
    output(`Wrote ${options.out}`);
    return;
  }
  output(options.json ? value : human, Boolean(options.json));
}

function providerFrom(options) {
  return createProvider({
    provider: options.provider,
    model: options.model || process.env.OPENAI_COMPATIBLE_MODEL || process.env.OLLAMA_MODEL,
    baseUrl: options.baseUrl || (options.provider === "ollama" ? process.env.OLLAMA_BASE_URL : process.env.OPENAI_COMPATIBLE_BASE_URL),
    apiKey: options.apiKey || process.env.OPENAI_COMPATIBLE_API_KEY,
  });
}

async function run() {
  const { command, options } = parse(process.argv.slice(2));
  if (!command || command === "help" || command === "--help") return output(help());
  if (command === "version" || command === "--version") return output(VERSION);
  const language = options.lang || "en";

  if (command === "start") {
    if (options._.length !== 1) throw new Error("start needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const wordCount = rewriteCase.source.trim().split(/\s+/u).length;
    const targets = rankRewriteTargets(rewriteCase.source).slice(0, 3);
    const method = wordCount < 250 ? "fresh human redraft" : "semantic reconstitution";
    const result = { language: rewriteCase.language, wordCount, protectedValues: rewriteCase.invariants.length, recommendedMethod: method, firstTargets: targets };
    return saveOrPrint(result, options, `Start with ${method}. I found ${rewriteCase.invariants.length} protected values in ${wordCount} words. Run "prompt" for the two-pass workflow.`);
  }

  if (command === "prepare") {
    if (options._.length !== 1) throw new Error("prepare needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    return saveOrPrint(rewriteCase, options, `Prepared ${rewriteCase.invariants.length} protected values. Use --out case.json to save the full case.`);
  }

  if (command === "prompt") {
    if (options._.length !== 1) throw new Error("prompt needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const pair = buildPromptPair(rewriteCase);
    return saveOrPrint(pair, options, `${pair.step1.instruction}\n\n${pair.step1.prompt}\n\n${pair.step2.instruction}\n\n${pair.step2.prompt}`);
  }

  if (command === "targets") {
    if (options._.length !== 1) throw new Error("targets needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const externalTokenScores = options.scores ? JSON.parse(await readFile(options.scores, "utf8")) : [];
    const targets = rankRewriteTargets(rewriteCase.source, { externalTokenScores });
    return saveOrPrint(targets, options, targets.map((target) => `${target.id} ${target.score.toFixed(3)} ${target.scoreType}: ${target.text}`).join("\n"));
  }

  if (command === "check" || command === "compare") {
    const minimum = command === "check" ? 2 : 2;
    if (options._.length < minimum) throw new Error(`${command} needs a source file and at least one candidate file.`);
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const candidates = await Promise.all(options._.slice(1).map((file) => readFile(file, "utf8")));
    const scorecards = candidates.map((candidate) => scoreCandidate(rewriteCase, candidate));
    const result = { scorecards, selection: selectCandidates(scorecards) };
    const human = scorecards.map((scorecard, index) => `Candidate ${index + 1}: ${explainScore(scorecard, rewriteCase.language)}`).join("\n");
    return saveOrPrint(result, options, human);
  }

  if (command === "rewrite") {
    if (options._.length !== 1) throw new Error("rewrite needs one source file.");
    if (!options.provider) throw new Error("rewrite needs --provider ollama or --provider openai-compatible.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    rewriteCase.brief = null;
    const provider = providerFrom(options);
    const method = options.method || "semantic";
    const result = method === "adaptive"
      ? await adaptiveSearch(rewriteCase, provider, { population: Number(options.count || 4), generations: Number(options.generations || 2) })
      : await semanticReconstitution(rewriteCase, provider, { count: Number(options.count || 3) });
    assertRewriteCase({ ...rewriteCase, brief: result.brief, candidates: result.candidates, scorecards: result.scorecards });
    return saveOrPrint(result, options, `Generated ${result.candidates.length} candidates. Recommended candidate: ${result.selection.recommended || "none passed"}.`);
  }

  throw new Error(`Unknown command: ${command}. Run watermark-toolkit help.`);
}

run().catch((error) => fail(error.message));
