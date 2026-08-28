import test from "node:test";
import assert from "node:assert/strict";
import { assertNonAnthropic, createProvider } from "../src/providers.js";

test("rejects Anthropic hosts and Claude model names", () => {
  assert.throws(() => assertNonAnthropic({ provider: "openai-compatible", baseUrl: "https://api.anthropic.com", model: "other" }), /Blocked provider/u);
  assert.throws(() => assertNonAnthropic({ provider: "openai-compatible", baseUrl: "http://localhost:11434", model: "claude-copy" }), /Blocked provider/u);
});

test("requires a supported provider", () => {
  assert.throws(() => createProvider({ provider: "unknown", model: "mistral" }), /Unsupported provider/u);
});
