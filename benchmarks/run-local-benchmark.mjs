#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createRewriteCase } from "../src/contracts.js";
import { extractInvariants, restoreProtectedPlaceholders } from "../src/invariants.js";
import { buildPrecisionRewritePrompt } from "../src/reconstruction.js";
import { scoreCandidate } from "../src/validators.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const baseUrl = process.env.BENCHMARK_BASE_URL || "http://127.0.0.1:18081/v1";

async function jsonRequest(path, body) {
  const response = await fetch(`${baseUrl.replace(/\/+$/u, "")}/${path.replace(/^\/+/, "")}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Benchmark endpoint returned HTTP ${response.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

async function complete(model, prompt, { temperature = 0.2, seed = 1, maxTokens = 1_800 } = {}) {
  const value = await jsonRequest("chat/completions", {
    model,
    messages: [{ role: "user", content: prompt }],
    temperature,
    seed,
    max_tokens: maxTokens,
    reasoning_effort: "low",
  });
  const raw = value.choices?.[0]?.message?.content?.trim() || "";
  const text = raw.includes("<|end|>")
    ? raw.split("<|end|>").at(-1)
      .replace(/<\|channel\|>\s*\w*\s*/gu, "")
      .replace(/<\|constrain\|>\s*\w*\s*/gu, "")
      .replace(/<\|message\|>/gu, "")
      .trim()
    : raw;
  if (!text) throw new Error("Benchmark model returned no draft.");
  return text;
}

function baselinePrompt(source, language) {
  return language === "it"
    ? `Parafrasa il testo seguente senza cambiarne il significato. Restituisci soltanto il risultato.\n\nTESTO:\n${source}`
    : `Paraphrase the following text without changing its meaning. Return only the result.\n\nTEXT:\n${source}`;
}

function judgePrompt(item, protectedValues, candidateA, candidateB) {
  return `Act as a strict bilingual editorial evaluator. Compare two anonymous drafts with the source. Do not reward polish, verbosity or low overlap by itself.

Score each draft from 0 to 100 on:
- fidelity: every claim, negation, qualification, causal relationship, exclusion, exact value and conclusion survives with no unsupported addition;
- independence: ordinary wording, sentence openings, local phrase sequences and paragraph construction are genuinely rebuilt;
- voice: the source's degree of formality, emphasis, directness and rhythm survive without generic polish.

Important focus for this case: ${item.focus}

Protected values that must be character-for-character exact:
${JSON.stringify(protectedValues, null, 2)}

Return exactly these plain-text lines. Use semicolons inside issue lists and write NONE when a list is empty:
A_FIDELITY=0
A_INDEPENDENCE=0
A_VOICE=0
A_MISSING_OR_ALTERED=NONE
A_UNSUPPORTED=NONE
B_FIDELITY=0
B_INDEPENDENCE=0
B_VOICE=0
B_MISSING_OR_ALTERED=NONE
B_UNSUPPORTED=NONE
FIDELITY_WINNER=A|B|TIE
INDEPENDENCE_WINNER=A|B|TIE
OVERALL_WINNER=A|B|TIE
REASON=one concise evidence-based sentence

SOURCE
<<<BEGIN SOURCE>>>
${item.source}
<<<END SOURCE>>>

CANDIDATE A
<<<BEGIN A>>>
${candidateA}
<<<END A>>>

CANDIDATE B
<<<BEGIN B>>>
${candidateB}
<<<END B>>>`;
}

function parseJudge(text) {
  const values = new Map(String(text).split("\n").map((line) => {
    const index = line.indexOf("=");
    return index < 0 ? [line.trim(), ""] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  }));
  const number = (key) => {
    const value = Number(values.get(key));
    if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error(`Judge returned an invalid ${key} score.`);
    return value;
  };
  const list = (key) => {
    const value = values.get(key);
    if (!value || value.toUpperCase() === "NONE") return [];
    return value.split(";").map((item) => item.trim()).filter(Boolean);
  };
  return {
    A: { fidelity: number("A_FIDELITY"), independence: number("A_INDEPENDENCE"), voice: number("A_VOICE"), missing_or_altered: list("A_MISSING_OR_ALTERED"), unsupported: list("A_UNSUPPORTED") },
    B: { fidelity: number("B_FIDELITY"), independence: number("B_INDEPENDENCE"), voice: number("B_VOICE"), missing_or_altered: list("B_MISSING_OR_ALTERED"), unsupported: list("B_UNSUPPORTED") },
    fidelity_winner: values.get("FIDELITY_WINNER")?.toLowerCase(),
    independence_winner: values.get("INDEPENDENCE_WINNER")?.toLowerCase(),
    overall_winner: values.get("OVERALL_WINNER")?.toLowerCase(),
    reason: values.get("REASON") || "",
  };
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

const models = await jsonRequest("models");
const model = models.data?.[0]?.id;
if (!model) throw new Error("No model is loaded at the benchmark endpoint.");

const corpus = JSON.parse(await readFile(new URL("./corpus.json", import.meta.url), "utf8"));
const cases = [];

for (let index = 0; index < corpus.length; index += 1) {
  const item = corpus[index];
  const rewriteCase = createRewriteCase({ source: item.source, language: item.language });
  rewriteCase.invariants = extractInvariants(item.source);
  const baseline = await complete(model, baselinePrompt(item.source, item.language), { temperature: 0.2, seed: 100 + index });
  const precisionRaw = await complete(model, buildPrecisionRewritePrompt(rewriteCase), { temperature: 0.2, seed: 100 + index });
  const firstPrecision = restoreProtectedPlaceholders(precisionRaw, rewriteCase.invariants);
  const firstScore = scoreCandidate(rewriteCase, firstPrecision);
  const precision = firstPrecision;

  // Swap display order on alternating cases so the judge cannot learn which label is the precision prompt.
  const precisionIsA = index % 2 === 1;
  const candidateA = precisionIsA ? precision : baseline;
  const candidateB = precisionIsA ? baseline : precision;
  const judgeText = await complete(model, judgePrompt(item, rewriteCase.invariants.map(({ type, value }) => ({ type, value })), candidateA, candidateB), {
    temperature: 0,
    seed: 900 + index,
    maxTokens: 2_200,
  });
  const judged = parseJudge(judgeText);
  const precisionJudge = precisionIsA ? judged.A : judged.B;
  const baselineJudge = precisionIsA ? judged.B : judged.A;

  cases.push({
    id: item.id,
    language: item.language,
    source: item.source,
    protectedValues: rewriteCase.invariants.map(({ type, value }) => ({ type, value })),
    baseline: { draft: baseline, mechanical: scoreCandidate(rewriteCase, baseline), judge: baselineJudge },
    precision: {
      firstRawDraft: precisionRaw,
      firstDraft: firstPrecision,
      firstMechanical: firstScore,
      draft: precision,
      mechanical: scoreCandidate(rewriteCase, precision),
      judge: precisionJudge,
    },
    blindJudge: judged,
    precisionWasLabel: precisionIsA ? "A" : "B",
  });
  process.stdout.write(`Finished ${item.id}\n`);
}

const summary = {
  baseline: {
    fidelity: average(cases.map((item) => item.baseline.judge.fidelity)),
    independence: average(cases.map((item) => item.baseline.judge.independence)),
    voice: average(cases.map((item) => item.baseline.judge.voice)),
    exactValuePasses: cases.filter((item) => item.baseline.mechanical.metrics.invariantRetention === 1).length,
    fourWordSurvival: average(cases.map((item) => item.baseline.mechanical.metrics.ngramSurvival)),
    longestSharedPhrase: average(cases.map((item) => item.baseline.mechanical.metrics.longestSharedPhrase.length)),
  },
  precision: {
    fidelity: average(cases.map((item) => item.precision.judge.fidelity)),
    independence: average(cases.map((item) => item.precision.judge.independence)),
    voice: average(cases.map((item) => item.precision.judge.voice)),
    exactValuePasses: cases.filter((item) => item.precision.mechanical.metrics.invariantRetention === 1).length,
    fourWordSurvival: average(cases.map((item) => item.precision.mechanical.metrics.ngramSurvival)),
    longestSharedPhrase: average(cases.map((item) => item.precision.mechanical.metrics.longestSharedPhrase.length)),
  },
};

const independenceWins = cases.filter(
  (item) => item.precision.mechanical.metrics.ngramSurvival + 0.01 < item.baseline.mechanical.metrics.ngramSurvival,
).length;

const mechanicalGate = {
  allPrecisionExactValues: summary.precision.exactValuePasses === cases.length,
  independenceMajority: independenceWins >= Math.ceil(cases.length * 0.75),
  surfaceMargin: summary.precision.fourWordSurvival <= summary.baseline.fourWordSurvival - 0.02
    && summary.precision.longestSharedPhrase <= summary.baseline.longestSharedPhrase,
};
mechanicalGate.pass = Object.values(mechanicalGate).every(Boolean);

const modelJudgeAdvisory = {
  fidelityNotWorse: summary.precision.fidelity >= summary.baseline.fidelity - 2,
  voiceNotWorse: summary.precision.voice >= summary.baseline.voice - 5,
  status: "advisory-only-requires-human-inspection",
};

const result = {
  schema: "claude-watermark-toolkit/local-prompt-benchmark/1.0",
  runAt: new Date().toISOString(),
  model: basename(model),
  corpusSize: cases.length,
  design: "Same local non-Anthropic model and seed per case. Baseline and precision drafts judged blind with alternating labels. Mechanical evidence is deterministic; judge scores are model-assisted and require human inspection.",
  summary,
  mechanicalGate,
  modelJudgeAdvisory,
  semanticReleaseStatus: "REQUIRES_MANUAL_SEMANTIC_REVIEW",
  cases,
};

await mkdir(new URL("./results/", import.meta.url), { recursive: true });
await writeFile(new URL("./results/local-gpt-oss-20b.json", import.meta.url), `${JSON.stringify(result, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({ summary, mechanicalGate, modelJudgeAdvisory }, null, 2)}\n`);
if (!mechanicalGate.pass) process.exitCode = 1;
