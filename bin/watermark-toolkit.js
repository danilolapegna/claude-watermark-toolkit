#!/usr/bin/env node

import { readFile, realpath, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import {
  buildPrecisionRewritePrompt,
  createManualBrief,
  createRewriteCase,
  explainScore,
  extractInvariants,
  buildPromptPair,
  scoreCandidate,
  selectCandidates,
  restoreProtectedPlaceholders,
} from "../src/index.js";

const VERSION = "1.1.0";

function output(value, json = false) {
  process.stdout.write(json ? `${JSON.stringify(value, null, 2)}\n` : `${value}\n`);
}

function fail(message, code = 1) {
  process.stderr.write(`Error: ${message}\n`);
  process.exitCode = code;
}

function help(language = "en") {
  if (language === "it") return `Claude Watermark Toolkit ${VERSION}

Le idee non dovrebbero portare watermark. Questa CLI serve a ricostruire la formulazione di testi dei quali idee, fatti e responsabilità sono tuoi.
Non scrive e non chiama alcun modello: prepara prompt, protegge valori esatti e confronta le bozze che ricevi altrove.

Uso:
  watermark-toolkit start <source.txt> [--lang en|it] [--json]
  watermark-toolkit prepare <source.txt> [--lang en|it] [--protect VALUE] [--out case.json]
  watermark-toolkit prompt <source.txt> [--lang en|it] [--clean-room] [--out prompt.txt]
  watermark-toolkit check <source.txt> <candidate.txt> [--lang en|it] [--json]
  watermark-toolkit compare <source.txt> <candidate-a.txt> <candidate-b.txt...> [--lang en|it] [--json]

Da dove partire:
  start     ti indica la strada in base a tempo e separazione desiderata
  prepare   inventaria i valori che devono restare identici
  prompt    esporta il prompt rapido o la coppia separata dalla fonte
  check     ripristina i valori e controlla una sola bozza
  compare   mostra gli stessi controlli su due o più bozze, senza scegliere al posto tuo

I file di partenza e le bozze non vengono mai modificati. Il risultato descrive fatti e somiglianze osservabili, non certifica il responso di un detector privato.`;

  return `Claude Watermark Toolkit ${VERSION}

Ideas shouldn't carry watermarks. This CLI prepares prompts and checks drafts for texts whose ideas, facts and final responsibility are yours.
It does not write or call a model: it prepares prompts, protects exact values and compares drafts you receive elsewhere.

Usage:
  watermark-toolkit start <source.txt> [--lang en|it] [--json]
  watermark-toolkit prepare <source.txt> [--lang en|it] [--protect VALUE] [--out case.json]
  watermark-toolkit prompt <source.txt> [--lang en|it] [--clean-room] [--out prompt.txt]
  watermark-toolkit check <source.txt> <candidate.txt> [--lang en|it] [--json]
  watermark-toolkit compare <source.txt> <candidate-a.txt> <candidate-b.txt...> [--lang en|it] [--json]

Where to start:
  start     choose a route by time and desired wording separation
  prepare   inventory values that must remain exact
  prompt    export the quick prompt or the source-separated pair
  check     restore exact values and inspect one draft
  compare   show the same evidence for two or more drafts, without choosing for you

Source and candidate files are never modified. Output describes observable facts and similarities. It is not a private-detector verdict.`;
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
    if (name === "json" || name === "help" || name === "clean-room") {
      options[name.replace(/-([a-z])/gu, (_, letter) => letter.toUpperCase())] = true;
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

async function pathIdentity(file) {
  try {
    return await realpath(file);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return resolve(file);
  }
}

async function saveOrPrint(value, options, human, protectedFiles = []) {
  if (options.out) {
    const outputPath = await pathIdentity(options.out);
    for (const file of protectedFiles) {
      if (outputPath === await pathIdentity(file)) {
        throw new Error(`Refusing to overwrite input file: ${file}. Choose a different --out path.`);
      }
    }
    await writeFile(options.out, `${JSON.stringify(value, null, 2)}\n`, "utf8");
    output(`Wrote ${options.out}`);
    return;
  }
  output(options.json ? value : human, Boolean(options.json));
}

async function savePlainTextOrPrint(value, options, protectedFiles = []) {
  if (options.out) {
    const outputPath = await pathIdentity(options.out);
    for (const file of protectedFiles) {
      if (outputPath === await pathIdentity(file)) {
        throw new Error(`Refusing to overwrite input file: ${file}. Choose a different --out path.`);
      }
    }
    await writeFile(options.out, `${value.trim()}\n`, "utf8");
    output(`Wrote ${options.out}`);
    return;
  }
  output(value);
}

async function run() {
  const { command, options } = parse(process.argv.slice(2));
  if (!command || command === "help" || command === "--help") return output(help(options.lang));
  if (command === "version" || command === "--version") return output(VERSION);
  if (options.help) return output(help(options.lang));
  const language = options.lang || "en";

  if (command === "start") {
    if (options._.length !== 1) throw new Error("start needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const wordCount = rewriteCase.source.trim().split(/\s+/u).length;
    const sourceFile = options._[0];
    const result = {
      language: rewriteCase.language,
      wordCount,
      protectedValues: rewriteCase.invariants.length,
      choices: {
        fastest: `watermark-toolkit prompt ${sourceFile}`,
        strongestSeparation: `watermark-toolkit prompt ${sourceFile} --clean-room`,
        repeatedLocalWork: `watermark-toolkit prompt ${sourceFile} --out prompt.txt`,
      },
      note: "No command can certify a private detector result. Choose by time, privacy and review effort.",
    };
    const human = rewriteCase.language === "it"
      ? `Questa è la CLI facoltativa del toolkit. Non scrive la bozza: prepara il prompt e controlla ciò che ricevi da una persona o da un modello non Anthropic.\n\nInput letto: ${sourceFile}\nParole: ${wordCount}\nValori esatti trovati: ${rewriteCase.invariants.length}\n\nIL PERCORSO NORMALE\n1. Crea un file facile da copiare:\n   node bin/watermark-toolkit.js prompt ${sourceFile} --lang it --out prompt.txt\n2. Apri prompt.txt. Copia tutto in un modello non Anthropic, ospitato oppure locale.\n3. Salva la risposta del modello come bozza.txt nella stessa cartella.\n4. Controlla e ripristina i valori protetti:\n   node bin/watermark-toolkit.js check ${sourceFile} bozza.txt --lang it\n\n"prepare" serve soltanto per ispezionare prima l'elenco dei valori protetti. "compare" serve soltanto quando possiedi almeno due bozze. Nessun comando certifica il responso di un detector privato.`
      : `This is the toolkit's optional CLI. It does not write the draft. It prepares the prompt and checks text returned by a person or a non-Anthropic model.\n\nInput read: ${sourceFile}\nWords: ${wordCount}\nExact values found: ${rewriteCase.invariants.length}\n\nTHE NORMAL PATH\n1. Create a prompt file that is easy to copy:\n   node bin/watermark-toolkit.js prompt ${sourceFile} --out prompt.txt\n2. Open prompt.txt. Copy all of it into a hosted or local non-Anthropic model.\n3. Save the model's answer as draft.txt in the same folder.\n4. Restore protected values and check the draft:\n   node bin/watermark-toolkit.js check ${sourceFile} draft.txt\n\nUse "prepare" only when you want to inspect the protected-value list first. Use "compare" only when you already have at least two drafts. No command certifies a private detector result.`;
    return saveOrPrint(result, options, human, options._);
  }

  if (command === "prepare") {
    if (options._.length !== 1) throw new Error("prepare needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const human = rewriteCase.language === "it"
      ? `Inventario pronto: ${rewriteCase.invariants.length} valori protetti. Non ho riscritto, caricato o modificato il testo. Usa --json per controllare l'inventario oppure --out case.json per salvarlo.`
      : `Inventory ready: ${rewriteCase.invariants.length} protected values. The text was not rewritten, uploaded or modified. Use --json to inspect the inventory or --out case.json to save it.`;
    return saveOrPrint(rewriteCase, options, human, options._);
  }

  if (command === "prompt") {
    if (options._.length !== 1) throw new Error("prompt needs one source file.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    if (options.cleanRoom) {
      const pair = buildPromptPair(rewriteCase);
      const human = `${pair.step1.instruction}\n\n${pair.step1.prompt}\n\n${pair.step2.instruction}\n\n${pair.step2.prompt}`;
      return saveOrPrint(pair, options, human, options._);
    }
    const prompt = buildPrecisionRewritePrompt(rewriteCase);
    if (options.json) return saveOrPrint({ mode: "precision", prompt }, options, prompt, options._);
    return savePlainTextOrPrint(prompt, options, options._);
  }

  if (command === "check" || command === "compare") {
    if (command === "check" && options._.length !== 2) throw new Error("check needs exactly one source file and one candidate file.");
    if (command === "compare" && options._.length < 3) throw new Error("compare needs one source file and at least two candidate files.");
    const rewriteCase = await loadSource(options._[0], language, options.protect);
    const rawCandidates = await Promise.all(options._.slice(1).map((file) => readFile(file, "utf8")));
    const candidates = rawCandidates.map((candidate) => restoreProtectedPlaceholders(candidate, rewriteCase.invariants));
    const scorecards = candidates.map((candidate) => scoreCandidate(rewriteCase, candidate));
    const result = { finalizedCandidates: candidates, scorecards, selection: selectCandidates(scorecards) };
    const summaries = scorecards.map((scorecard, index) => `Candidate ${index + 1}: ${explainScore(scorecard, rewriteCase.language)}`).join("\n");
    const restored = rawCandidates.some((candidate, index) => candidate !== candidates[index]);
    const human = command === "check"
      ? (rewriteCase.language === "it"
        ? `${restored ? "I segnaposto trovati sono stati sostituiti con i valori esatti della fonte." : "La bozza non conteneva segnaposto da sostituire."} Nessun file è stato modificato.\n\nBOZZA CONTROLLATA\n${candidates[0]}\n\nCHE COSA HA CONTROLLATO LA CLI\n${summaries}\n\nCHE COSA DEVI CONTROLLARE TU\nConfronta fonte e bozza per idee, negazioni, precisazioni, tono e fatti inventati. La CLI non sa approvare il significato.`
        : `${restored ? "Protected markers were replaced with the exact source values." : "The draft contained no protected markers to replace."} No file was modified.\n\nCHECKED DRAFT\n${candidates[0]}\n\nWHAT THE CLI CHECKED\n${summaries}\n\nWHAT YOU MUST CHECK\nCompare source and draft for claims, negations, qualifications, voice and invented facts. The CLI cannot approve meaning.`)
      : summaries;
    return saveOrPrint(result, options, human, options._);
  }

  if (command === "targets") throw new Error("targets was removed because its public lexical proxy did not identify Claude's private watermark positions reliably. Use prompt, check or compare instead.");

  throw new Error(`Unknown command: ${command}. Run watermark-toolkit help.`);
}

run().catch((error) => fail(error.message));
