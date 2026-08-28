import test from "node:test";
import assert from "node:assert/strict";
import { extractInvariants, missingInvariants } from "../src/invariants.js";

test("extracts values that should survive a rewrite", () => {
  const text = "On 2026-08-28, API costs fell 15%. Read https://example.com and email hello@example.com. The rule says “keep this exact”.";
  const values = extractInvariants(text);
  assert.ok(values.some((item) => item.type === "date" && item.value === "2026-08-28"));
  assert.ok(values.some((item) => item.type === "number" && item.value === "15%"));
  assert.ok(values.some((item) => item.type === "url"));
  assert.ok(values.some((item) => item.type === "email"));
  assert.ok(values.some((item) => item.type === "quote"));
});

test("reports missing protected values", () => {
  const values = extractInvariants("The price is €500 and the date is 2026-08-28.");
  const missing = missingInvariants("The date is 2026-08-28.", values);
  assert.ok(missing.some((item) => item.value === "€500"));
});

test("does not protect punctuation after a URL", () => {
  const values = extractInvariants("Read https://example.com. Then continue.");
  const url = values.find((item) => item.type === "url");
  assert.equal(url.value, "https://example.com");
  assert.equal(missingInvariants("Continue from https://example.com without copying the sentence.", values).length, 0);
});

test("suppresses nested fragments inside dates, URLs, emails and quotations", () => {
  const values = extractInvariants('Use https://example.com/2026/08/28, write to API@example.com and keep “Budget €1.200,50 on 28 agosto 2026” exact.');
  assert.ok(values.some((item) => item.type === "url" && item.value === "https://example.com/2026/08/28"));
  assert.ok(values.some((item) => item.type === "email" && item.value === "API@example.com"));
  assert.ok(values.some((item) => item.type === "quote" && item.value.includes("€1.200,50")));
  assert.equal(values.some((item) => item.type === "number" && ["2026", "08", "28", "€1.200,50"].includes(item.value)), false);
});

test("recognizes common English and Italian dates and currency formats", () => {
  const values = extractInvariants("Meet on August 28, 2026 or 28 agosto 2026. Budgets are $1,200.50 and 1.200,50 €.");
  assert.ok(values.some((item) => item.type === "date" && item.value === "August 28, 2026"));
  assert.ok(values.some((item) => item.type === "date" && item.value === "28 agosto 2026"));
  assert.ok(values.some((item) => item.type === "number" && item.value === "$1,200.50"));
  assert.ok(values.some((item) => item.type === "number" && item.value === "1.200,50 €"));
});

test("requires character-for-character protected values", () => {
  const values = extractInvariants("Contact API at €500.", ["DL Solutions"]);
  const missing = missingInvariants("Contact api at €500. DL  Solutions", values);
  assert.ok(missing.some((item) => item.value === "API"));
  assert.ok(missing.some((item) => item.value === "DL Solutions"));
});

test("protects an acronym-led proper name as one value", () => {
  const values = extractInvariants("DL Solutions published the protocol. API costs stayed flat.");
  assert.ok(values.some((item) => item.type === "name" && item.value === "DL Solutions"));
  assert.equal(values.some((item) => item.value === "DL"), false);
  assert.ok(values.some((item) => item.type === "acronym" && item.value === "API"));
});

test("handles a large multilingual source within a bounded time", () => {
  const source = "Il report API del 28 agosto 2026 costa €1.200,50. Read https://example.com. ".repeat(3_000);
  const started = performance.now();
  const values = extractInvariants(source);
  assert.ok(values.length >= 4);
  assert.ok(performance.now() - started < 2_000);
});
