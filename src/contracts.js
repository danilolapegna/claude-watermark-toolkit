import { createHash } from "node:crypto";

export const CASE_SCHEMA = "claude-watermark-toolkit/rewrite-case/1.0";

export function hashText(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export function normalizeLanguage(language) {
  const value = String(language || "en").toLowerCase();
  if (value === "en" || value.startsWith("en-")) return "en";
  if (value === "it" || value.startsWith("it-")) return "it";
  throw new Error(`Unsupported language: ${language}. Use en or it.`);
}

export function createRewriteCase({ source, language = "en", invariants = [], method = "semantic-reconstitution" }) {
  if (typeof source !== "string" || source.trim().length === 0) {
    throw new Error("Source text is empty.");
  }

  return {
    schema: CASE_SCHEMA,
    language: normalizeLanguage(language),
    source,
    sourceHash: hashText(source),
    invariants: structuredClone(invariants),
    brief: null,
    method: {
      id: method,
      createdAt: new Date().toISOString(),
    },
    candidates: [],
    scorecards: [],
  };
}

export function assertRewriteCase(value) {
  if (!value || value.schema !== CASE_SCHEMA) throw new Error("Unsupported rewrite case schema.");
  if (hashText(value.source) !== value.sourceHash) throw new Error("Source hash does not match the rewrite case.");
  if (!Array.isArray(value.invariants) || !Array.isArray(value.candidates)) {
    throw new Error("Rewrite case arrays are malformed.");
  }
  return value;
}
