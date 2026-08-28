#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { createRewriteCase } from "../src/contracts.js";
import { extractInvariants, restoreProtectedPlaceholders } from "../src/invariants.js";
import { buildDraftPrompt } from "../src/reconstruction.js";
import { scoreCandidate } from "../src/validators.js";

const baseUrl = process.env.BENCHMARK_BASE_URL || "http://127.0.0.1:18081/v1";

async function jsonRequest(path, body) {
  const response = await fetch(`${baseUrl.replace(/\/+$/u, "")}/${path}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Local endpoint returned HTTP ${response.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

function finalText(raw) {
  return String(raw || "").split("<|end|>").at(-1)
    .replace(/<\|channel\|>\s*\w*\s*/gu, "")
    .replace(/<\|message\|>/gu, "")
    .trim();
}

const models = await jsonRequest("models");
const model = models.data?.[0]?.id;
if (!model) throw new Error("No local model is loaded.");
const corpus = JSON.parse(await readFile(new URL("./clean-room-corpus.json", import.meta.url), "utf8"));
const cases = [];

for (let index = 0; index < corpus.length; index += 1) {
  const item = corpus[index];
  const rewriteCase = createRewriteCase({ source: item.source, language: item.language });
  rewriteCase.invariants = extractInvariants(item.source);
  const prompt = buildDraftPrompt(item.reviewedBrief, {
    variation: "begin with the narrowest supported conclusion, then earn it with evidence and attach every limit to the claim it qualifies",
  });
  const response = await jsonRequest("chat/completions", {
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    seed: 700 + index,
    max_tokens: 1_200,
    reasoning_effort: "low",
  });
  const rawDraft = finalText(response.choices?.[0]?.message?.content);
  if (!rawDraft || /^(?:```|\{|\[|BRIEF_ERROR)/u.test(rawDraft)) throw new Error(`${item.id} did not return a prose draft.`);
  const draft = restoreProtectedPlaceholders(rawDraft, rewriteCase.invariants);
  const scorecard = scoreCandidate(rewriteCase, draft);
  cases.push({ id: item.id, language: item.language, source: item.source, reviewedBrief: item.reviewedBrief, rawDraft, draft, scorecard });
  process.stdout.write(`Finished ${item.id}\n`);
}

const meanOverlap = cases.reduce((sum, item) => sum + item.scorecard.metrics.ngramSurvival, 0) / cases.length;
const gate = {
  allOutputsAreProse: cases.every((item) => !/^(?:```|\{|\[|BRIEF_ERROR)/u.test(item.rawDraft)),
  allExactValuesRetained: cases.every((item) => item.scorecard.metrics.invariantRetention === 1),
  allRemainManualReview: cases.every((item) => item.scorecard.semanticStatus === "requires-manual-review" && item.scorecard.releaseReady === false),
  boundedMeanSurfaceReuse: meanOverlap <= 0.4,
  boundedReadabilityDrift: cases.every((item) => Math.abs(item.scorecard.metrics.readabilityDelta) <= 30),
};
gate.pass = Object.values(gate).every(Boolean);

const result = {
  schema: "claude-watermark-toolkit/clean-room-prompt-smoke/1.0",
  runAt: new Date().toISOString(),
  model: basename(model),
  design: "Two bilingual, human-reviewed briefs are drafted in clean contexts by one local non-Anthropic model. The gate checks prose shape, exact values, manual semantic status and bounded surface reuse. Human reading remains required.",
  meanFourWordSurvival: meanOverlap,
  gate,
  cases,
};

await mkdir(new URL("./results/", import.meta.url), { recursive: true });
await writeFile(new URL("./results/local-clean-room-smoke.json", import.meta.url), `${JSON.stringify(result, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({ model: result.model, meanFourWordSurvival: meanOverlap, gate }, null, 2)}\n`);
if (!gate.pass) process.exitCode = 1;
