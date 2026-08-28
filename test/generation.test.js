import test from "node:test";
import assert from "node:assert/strict";
import { createRewriteCase } from "../src/contracts.js";
import { extractInvariants } from "../src/invariants.js";
import { semanticReconstitution } from "../src/generation.js";

test("runs research, drafting, validation and selection end to end", async () => {
  const source = "On 2026-08-28, 120 readers opened https://example.com. The test asked one narrow question about clarity.";
  const rewriteCase = createRewriteCase({ source });
  rewriteCase.invariants = extractInvariants(source);
  let call = 0;
  const provider = {
    async complete() {
      call += 1;
      if (call === 1) {
        return { text: JSON.stringify({
          purpose: "Report a clarity test",
          claims: ["120 readers opened the public page on the stated date", "The test asked one narrow question"],
          protectedValues: rewriteCase.invariants.map(({ type, value }) => ({ type, value })),
          constraints: [],
          voice: ["direct"],
        }) };
      }
      return { text: "A focused clarity test ran on 2026-08-28. Its 120 readers used https://example.com. The researchers limited the work to one narrow question." };
    },
  };

  const result = await semanticReconstitution(rewriteCase, provider, { count: 2 });
  assert.equal(result.candidates.length, 2);
  assert.equal(result.scorecards.every((item) => item.valid), true);
  assert.ok(result.selection.recommended);
});
