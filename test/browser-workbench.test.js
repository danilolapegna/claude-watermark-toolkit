import assert from "node:assert/strict";
import test from "node:test";

await import("../docs/core.js");

const core = globalThis.RewriteRoomCore;

test("browser core extracts and deduplicates protected values", () => {
  const values = core.extractProtectedValues(
    'DL Solutions launches on 2026-08-28 at https://example.com. Price: €120. Email hello@example.com. "Keep this exact."',
    "DL Solutions\n€120",
  );

  assert.ok(values.some((item) => item.type === "date" && item.value === "2026-08-28"));
  assert.ok(values.some((item) => item.type === "url" && item.value === "https://example.com"));
  assert.ok(values.some((item) => item.type === "email" && item.value === "hello@example.com"));
  assert.equal(values.filter((item) => item.value === "€120").length, 1);
  assert.equal(values.some((item) => item.type === "number" && item.value === "2026"), false);
});

test("browser protection is exact and suppresses nested fragments", () => {
  const values = core.extractProtectedValues(
    'Meet on August 28, 2026. Keep “Budget €1.200,50 on 28 agosto 2026” exact. Read https://example.com/2026/08/28.',
    "DL Solutions",
  );
  assert.ok(values.some((item) => item.value === "August 28, 2026"));
  assert.ok(values.some((item) => item.type === "quote" && item.value.includes("€1.200,50")));
  assert.ok(values.some((item) => item.value === "https://example.com/2026/08/28"));
  assert.equal(values.some((item) => item.type === "number" && item.value === "2026"), false);

  const report = core.compareTexts("DL Solutions", "dl solutions", [{ type: "manual", value: "DL Solutions" }]);
  assert.deepEqual(report.missingProtectedValues.map((item) => item.value), ["DL Solutions"]);
});

test("browser protection keeps acronym-led proper names intact", () => {
  const values = core.extractProtectedValues("DL Solutions published the protocol. API costs stayed flat.", "");
  assert.ok(values.some((item) => item.type === "name" && item.value === "DL Solutions"));
  assert.equal(values.some((item) => item.value === "DL"), false);
  assert.ok(values.some((item) => item.type === "acronym" && item.value === "API"));
});

test("clean-room prompt contains the brief and never receives source wording", () => {
  const prompt = core.buildCleanRoomPrompt({
    purpose: "Explain the decision.",
    claims: "The project starts Friday.",
    audience: "Clients",
    voice: "Direct and slightly informal.",
    constraints: "Under 300 words.",
    protectedValues: [{ type: "date", value: "2026-08-28" }],
  }, "en");

  assert.match(prompt, /Explain the decision\./u);
  assert.match(prompt, /\[PV-01\]/u);
  assert.doesNotMatch(prompt, /2026-08-28/u);
  assert.match(prompt, /You do not have the original text\./u);
});

test("precision prompt protects facts while requiring a full ordinary-wording rebuild", () => {
  const source = "DL Solutions will publish the guide on 2026-08-28. The conclusion remains deliberately narrow.";
  const prompt = core.buildPrecisionRewritePrompt(source, [
    { type: "acronym", value: "DL" },
    { type: "date", value: "2026-08-28" },
  ], "en");

  assert.match(prompt, /PRECISION EDITORIAL RECONSTRUCTION/u);
  assert.match(prompt, /ledger of claims/u);
  assert.match(prompt, /ordinary four-word sequence/u);
  assert.match(prompt, /\[PV-01\]/u);
  assert.doesNotMatch(prompt, /2026-08-28/u);
  assert.match(prompt, /<<<BEGIN SOURCE MATERIAL>>>/u);
  assert.match(prompt, /\[PV-01\] Solutions will publish the guide on \[PV-02\]/u);
  assert.doesNotMatch(prompt, /watermark|detector/iu);
});

test("comparison reports missing facts and exact phrase survival", () => {
  const source = "The launch is on 2026-08-28. We will publish the complete field guide for careful writers.";
  const candidate = "We will publish the complete field guide for careful writers, but the date is missing.";
  const report = core.compareTexts(source, candidate, [{ type: "date", value: "2026-08-28" }]);

  assert.deepEqual(report.missingProtectedValues.map((item) => item.value), ["2026-08-28"]);
  assert.ok(report.longestSharedPhrase.length >= 8);
  assert.ok(report.ngramSurvival[4] > 0);
});

test("independent structure has lower overlap than a copied draft", () => {
  const source = "First we collect the facts. Then we close the source. Finally we write a new draft from the checked brief.";
  const copied = "First we collect the facts. Then we close the source. Finally we write a new draft from the checked outline.";
  const fresh = "A checked outline is enough to begin again. Put the original away, preserve the evidence and choose a different order for the reader.";

  const copiedReport = core.compareTexts(source, copied, []);
  const freshReport = core.compareTexts(source, fresh, []);

  assert.ok(freshReport.ngramSurvival[4] < copiedReport.ngramSurvival[4]);
  assert.ok(freshReport.longestSharedPhrase.length < copiedReport.longestSharedPhrase.length);
});

test("Italian prompt uses native labels and keeps protected values", () => {
  const prompt = core.buildCleanRoomPrompt({
    purpose: "Spiegare la scelta.",
    claims: "Il progetto parte venerdì.",
    audience: "Clienti",
    voice: "Diretta e leggermente informale.",
    constraints: "Meno di 300 parole.",
    protectedValues: [{ type: "number", value: "300" }],
  }, "it");

  assert.match(prompt, /SCHEDA DI SCRITTURA A CAMERA STAGNA/u);
  assert.match(prompt, /IDEE E AFFERMAZIONI/u);
  assert.match(prompt, /\[PV-01\]/u);
  assert.doesNotMatch(prompt, /300/u);
});

test("Italian precision prompt preserves exact values and returns draft-only instructions", () => {
  const prompt = core.buildPrecisionRewritePrompt(
    "Il progetto parte il 2026-08-28 e costa €120.",
    [{ type: "date", value: "2026-08-28" }, { type: "number", value: "€120" }],
    "it",
  );

  assert.match(prompt, /RICOSTRUZIONE EDITORIALE DI PRECISIONE/u);
  assert.match(prompt, /registro di affermazioni/u);
  assert.match(prompt, /Restituisci soltanto la bozza finale/u);
  assert.match(prompt, /\[PV-02\]/u);
  assert.doesNotMatch(prompt, /€120/u);
});

test("restores protected placeholders before comparison", () => {
  const values = [{ type: "date", value: "2026-08-28" }, { type: "number", value: "18,4%" }];
  const restored = core.restoreProtectedPlaceholders("Published on [PV-01] after a [PV-02] result.", values);
  assert.equal(restored, "Published on 2026-08-28 after a 18,4% result.");
});
