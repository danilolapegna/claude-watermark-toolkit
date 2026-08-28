import { hashText } from "./contracts.js";
import { missingInvariants } from "./invariants.js";

export function words(text) {
  return String(text).normalize("NFKC").toLocaleLowerCase().match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) || [];
}

function sentences(text) {
  const parts = String(text).split(/[.!?]+(?:\s+|$)/u).map((part) => part.trim()).filter(Boolean);
  return parts.length || 1;
}

function ngramSet(tokens, size) {
  const result = new Set();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.add(tokens.slice(index, index + size).join(" "));
  }
  return result;
}

export function ngramSurvival(source, candidate, size = 4) {
  const sourceSet = ngramSet(words(source), size);
  if (sourceSet.size === 0) return 0;
  const candidateSet = ngramSet(words(candidate), size);
  let shared = 0;
  for (const gram of sourceSet) if (candidateSet.has(gram)) shared += 1;
  return shared / sourceSet.size;
}

function englishSyllables(word) {
  const clean = word.toLocaleLowerCase().replace(/[^a-z]/gu, "");
  if (!clean) return 1;
  const groups = clean.replace(/e$/u, "").match(/[aeiouy]+/gu);
  return Math.max(1, groups?.length || 1);
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function readability(text, language = "en") {
  const tokens = words(text);
  const wordCount = Math.max(tokens.length, 1);
  const sentenceCount = sentences(text);
  if (language === "it") {
    const letters = tokens.join("").length;
    return Math.round(clamp(89 + (300 * sentenceCount - 10 * letters) / wordCount));
  }
  const syllables = tokens.reduce((total, word) => total + englishSyllables(word), 0);
  return Math.round(clamp(206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount)));
}

export function scoreCandidate(rewriteCase, candidate, { ngramSize = 4 } = {}) {
  const missing = missingInvariants(candidate, rewriteCase.invariants);
  const sourceWords = Math.max(words(rewriteCase.source).length, 1);
  const candidateWords = words(candidate).length;
  const retention = rewriteCase.invariants.length === 0 ? 1 : (rewriteCase.invariants.length - missing.length) / rewriteCase.invariants.length;
  const lengthRatio = candidateWords / sourceWords;
  const overlap = ngramSurvival(rewriteCase.source, candidate, ngramSize);
  const ease = readability(candidate, rewriteCase.language);
  const failures = [];
  if (missing.length > 0) failures.push(`Missing ${missing.length} protected value${missing.length === 1 ? "" : "s"}.`);
  if (candidateWords === 0) failures.push("Candidate is empty.");
  if (lengthRatio < 0.45 || lengthRatio > 1.8) failures.push(`Length ratio ${lengthRatio.toFixed(2)} is outside the default 0.45 to 1.80 range.`);

  return {
    id: hashText(candidate).slice(0, 12),
    valid: failures.length === 0,
    failures,
    missingInvariants: missing.map(({ type, value }) => ({ type, value })),
    metrics: {
      invariantRetention: Number(retention.toFixed(4)),
      ngramSurvival: Number(overlap.toFixed(4)),
      lengthRatio: Number(lengthRatio.toFixed(4)),
      readability: ease,
      wordCount: candidateWords,
    },
  };
}

export function explainScore(scorecard, language = "en") {
  const m = scorecard.metrics;
  if (language === "it") {
    return `${scorecard.valid ? "Valido" : "Respinto"}. Fatti protetti: ${Math.round(m.invariantRetention * 100)}%. Frasi di quattro parole sopravvissute: ${Math.round(m.ngramSurvival * 100)}%. Lunghezza rispetto alla fonte: ${Math.round(m.lengthRatio * 100)}%. Leggibilità: ${m.readability}/100.`;
  }
  return `${scorecard.valid ? "Valid" : "Rejected"}. Protected facts: ${Math.round(m.invariantRetention * 100)}%. Surviving four-word phrases: ${Math.round(m.ngramSurvival * 100)}%. Length versus source: ${Math.round(m.lengthRatio * 100)}%. Readability: ${m.readability}/100.`;
}
