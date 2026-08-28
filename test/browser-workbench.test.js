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
  assert.match(prompt, /2026-08-28/u);
  assert.match(prompt, /You do not have the original text\./u);
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
  assert.match(prompt, /300/u);
});
