const MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December|gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre";

// The order prevents nested fragments. A URL is one protected value, not a URL
// plus every acronym, date and number that happens to appear inside it.
const PATTERNS = [
  ["url", /https?:\/\/[^\s)\]}>,]+/giu],
  ["email", /[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}/giu],
  ["quote", /(?:“[^”\n]{3,240}”|"[^"\n]{3,240}")/gu],
  ["date", /\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4})\b/gu],
  ["date", new RegExp(`\\b(?:\\d{1,2}\\s+(?:${MONTHS})\\s+\\d{4}|(?:${MONTHS})\\s+\\d{1,2}(?:st|nd|rd|th)?(?:,)?\\s+\\d{4})\\b`, "giu")],
  ["number", /(?<![\p{L}\p{N}])(?:(?:€|\$|£)\s?\d+(?:[.,]\d+)*(?:\s?[kKmMbB])?|\d+(?:[.,]\d+)*(?:\s?(?:€|\$|£|%|[kKmMbB]))?)(?![\p{L}\p{N}])/gu],
  ["name", /\b[A-ZÀ-ÖØ-Þ]{2,8}(?:-[A-ZÀ-ÖØ-Þ0-9]{1,8})?\s+[A-ZÀ-ÖØ-Þ][\p{L}’'-]{1,40}(?:\s+[A-ZÀ-ÖØ-Þ][\p{L}’'-]{1,40}){0,2}\b/gu],
  ["acronym", /\b[A-ZÀ-ÖØ-Þ]{2,8}(?:-[A-ZÀ-ÖØ-Þ0-9]{1,8})?\b/gu],
];

function overlaps(start, end, item) {
  return start < item.end && end > item.start;
}

export function extractInvariants(text, extraValues = []) {
  const found = [];
  const seen = new Set();

  for (const [type, pattern] of PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const value = type === "url" ? match[0].replace(/[.!?:;'"]+$/gu, "") : match[0];
      if (!value) continue;
      const item = { type, value, start: match.index, end: match.index + value.length, source: "automatic" };
      if (found.some((existing) => overlaps(item.start, item.end, existing))) continue;
      if (!seen.has(value)) {
        seen.add(value);
        found.push(item);
      }
    }
  }

  for (const value of extraValues) {
    const normalized = String(value).trim();
    if (!normalized) continue;
    const start = text.indexOf(normalized);
    const item = {
      type: "user",
      value: normalized,
      start: start >= 0 ? start : null,
      end: start >= 0 ? start + normalized.length : null,
      source: "user",
    };
    if (!seen.has(normalized)) {
      seen.add(normalized);
      found.push(item);
    }
  }

  return found.sort((a, b) => (a.start ?? Number.MAX_SAFE_INTEGER) - (b.start ?? Number.MAX_SAFE_INTEGER));
}

export function missingInvariants(candidate, invariants) {
  const haystack = String(candidate);
  return invariants.filter((item) => !haystack.includes(item.value));
}

export function restoreProtectedPlaceholders(candidate, invariants) {
  return invariants.reduce(
    (text, item, index) => text.replaceAll(`[PV-${String(index + 1).padStart(2, "0")}]`, item.value),
    String(candidate),
  );
}

export function maskProtectedValues(text, invariants) {
  return invariants
    .map((item, index) => ({ ...item, placeholder: `[PV-${String(index + 1).padStart(2, "0")}]` }))
    .sort((a, b) => b.value.length - a.value.length)
    .reduce((result, item) => result.replaceAll(item.value, item.placeholder), String(text));
}

export function invariantSummary(invariants) {
  return invariants.reduce((summary, item) => {
    summary[item.type] = (summary[item.type] || 0) + 1;
    return summary;
  }, {});
}
