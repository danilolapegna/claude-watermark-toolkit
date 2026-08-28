import test from "node:test";
import assert from "node:assert/strict";
import { createRewriteCase } from "../src/contracts.js";
import { extractInvariants } from "../src/invariants.js";
import { ngramSurvival, scoreCandidate } from "../src/validators.js";
import { selectCandidates } from "../src/selection.js";

function fixtureCase() {
  const source = "The study began on 2026-08-28. It included 120 people and used https://example.com as the public record. The result matters because the original question was narrow.";
  const rewriteCase = createRewriteCase({ source });
  rewriteCase.invariants = extractInvariants(source);
  return rewriteCase;
}

test("rejects a candidate that loses a protected fact", () => {
  const score = scoreCandidate(fixtureCase(), "A narrow study used a public record and reached a useful result.");
  assert.equal(score.valid, false);
  assert.ok(score.missingInvariants.length >= 3);
});

test("measures phrase survival", () => {
  const source = "one two three four five six seven";
  assert.equal(ngramSurvival(source, source, 4), 1);
  assert.equal(ngramSurvival(source, "seven six five four three two one", 4), 0);
});

test("shortlists mechanically sound candidates without pretending to choose for the author", () => {
  const rewriteCase = fixtureCase();
  const weak = scoreCandidate(rewriteCase, rewriteCase.source);
  const fresh = scoreCandidate(rewriteCase, "On 2026-08-28, 120 participants entered a focused investigation. Its public record is https://example.com. The finding is useful because the researchers kept the question narrow and avoided broader claims.");
  const selection = selectCandidates([weak, fresh]);
  assert.ok(selection.pareto.length >= 1);
  assert.equal(selection.recommended, null);
  assert.equal(selection.requiresManualChoice, true);
  assert.ok(selection.mechanicalShortlist.length > 0);
});

test("does not mark semantic inversions as release-ready", () => {
  const rewriteCase = fixtureCase();
  const inverted = "The study did not begin on 2026-08-28. It excluded 120 people, while https://example.com remained the public record. The result does not matter because the question was broad.";
  const score = scoreCandidate(rewriteCase, inverted);
  assert.equal(score.mechanicallyValid, true);
  assert.equal(score.semanticStatus, "requires-manual-review");
  assert.equal(score.releaseReady, false);
});
