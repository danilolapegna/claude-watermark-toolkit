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
