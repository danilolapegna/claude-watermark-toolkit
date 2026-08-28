import test from "node:test";
import assert from "node:assert/strict";
import { rankRewriteTargets } from "../src/targeting.js";

test("ranks every sentence and explains the score source", () => {
  const targets = rankRewriteTargets("This is a plain sentence. Photosynthesis converts light through chlorophyll. This is another plain sentence.");
  assert.equal(targets.length, 3);
  assert.ok(targets.every((item) => item.scoreType === "transparent-lexical-proxy"));
});

test("uses supplied self-information when available", () => {
  const text = "First sentence. Second sentence.";
  const targets = rankRewriteTargets(text, { externalTokenScores: [{ start: 0, end: 5, score: 9 }] });
  assert.equal(targets[0].scoreType, "supplied-self-information");
  assert.equal(targets[0].score, 9);
});

test("keeps a URL inside its sentence", () => {
  const text = "Read the method at https://example.com. Then check the result.";
  const targets = rankRewriteTargets(text);
  assert.equal(targets.length, 2);
  assert.ok(targets.some((item) => item.text.includes("https://example.com")));
  assert.ok(targets.every((item) => item.text !== "com."));
});
