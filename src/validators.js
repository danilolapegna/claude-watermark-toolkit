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

export function longestSharedPhrase(source, candidate) {
  const sourceWords = words(source);
  const candidateWords = words(candidate);
  let previous = new Array(candidateWords.length + 1).fill(0);
  let bestLength = 0;
  let bestEnd = 0;

  for (let sourceIndex = 1; sourceIndex <= sourceWords.length; sourceIndex += 1) {
    const current = new Array(candidateWords.length + 1).fill(0);
    for (let candidateIndex = 1; candidateIndex <= candidateWords.length; candidateIndex += 1) {
      if (sourceWords[sourceIndex - 1] === candidateWords[candidateIndex - 1]) {
        current[candidateIndex] = previous[candidateIndex - 1] + 1;
        if (current[candidateIndex] > bestLength) {
          bestLength = current[candidateIndex];
          bestEnd = sourceIndex;
        }
      }
    }
    previous = current;
  }

  return { length: bestLength, phrase: sourceWords.slice(bestEnd - bestLength, bestEnd).join(" ") };
}

function sentenceList(text) {
  return String(text).split(/(?<=[.!?])\s+|\n+/u).map((part) => part.trim()).filter(Boolean);
}

export function sentenceOpeningReuse(source, candidate, openingSize = 3) {
  const openings = (text) => new Set(sentenceList(text)
    .map((sentence) => words(sentence).slice(0, openingSize).join(" "))
    .filter((opening) => opening.split(" ").length === openingSize));
  const sourceOpenings = openings(source);
  if (sourceOpenings.size === 0) return 0;
  const candidateOpenings = openings(candidate);
  let shared = 0;
  for (const opening of sourceOpenings) if (candidateOpenings.has(opening)) shared += 1;
  return shared / sourceOpenings.size;
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
  const sourceEase = readability(rewriteCase.source, rewriteCase.language);
  const sharedPhrase = longestSharedPhrase(rewriteCase.source, candidate);
  const openingReuse = sentenceOpeningReuse(rewriteCase.source, candidate);
  const failures = [];
  if (missing.length > 0) failures.push(`Missing ${missing.length} protected value${missing.length === 1 ? "" : "s"}.`);
  if (candidateWords === 0) failures.push("Candidate is empty.");
  if (lengthRatio < 0.45 || lengthRatio > 1.8) failures.push(`Length ratio ${lengthRatio.toFixed(2)} is outside the default 0.45 to 1.80 range.`);

  const mechanicallyValid = failures.length === 0;
  return {
    id: hashText(candidate).slice(0, 12),
    mechanicallyValid,
    // Kept for rewrite-case 1.0 consumers. It means mechanical checks only.
    valid: mechanicallyValid,
    semanticStatus: "requires-manual-review",
    releaseReady: false,
    failures,
    missingInvariants: missing.map(({ type, value }) => ({ type, value })),
    metrics: {
      invariantRetention: Number(retention.toFixed(4)),
      ngramSurvival: Number(overlap.toFixed(4)),
      lengthRatio: Number(lengthRatio.toFixed(4)),
      readability: ease,
      sourceReadability: sourceEase,
      readabilityDelta: ease - sourceEase,
      wordCount: candidateWords,
      longestSharedPhrase: sharedPhrase,
      sentenceOpeningReuse: Number(openingReuse.toFixed(4)),
    },
  };
}

export function explainScore(scorecard, language = "en") {
  const m = scorecard.metrics;
  if (language === "it") {
    return `${scorecard.mechanicallyValid ? "Controlli meccanici superati" : "Controlli meccanici non superati"}. Valori protetti: ${Math.round(m.invariantRetention * 100)}%. Sequenze di quattro parole rimaste: ${Math.round(m.ngramSurvival * 100)}%. Sequenza identica più lunga: ${m.longestSharedPhrase.length} parole. Lunghezza rispetto alla fonte: ${Math.round(m.lengthRatio * 100)}%. Il controllo umano del significato è ancora obbligatorio.`;
  }
  return `${scorecard.mechanicallyValid ? "Mechanical checks passed" : "Mechanical checks failed"}. Protected values: ${Math.round(m.invariantRetention * 100)}%. Surviving four-word sequences: ${Math.round(m.ngramSurvival * 100)}%. Longest identical run: ${m.longestSharedPhrase.length} words. Length versus source: ${Math.round(m.lengthRatio * 100)}%. Human meaning review is still required.`;
}
