const PATTERNS = [
  ["url", /https?:\/\/[^\s)\]}>,]+/giu],
  ["email", /[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}/giu],
  ["date", /\b(?:\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/gu],
  ["number", /(?<![\p{L}\p{N}])(?:€|\$|£)?\d+(?:[.,]\d+)*(?:\s?%|\s?[kKmMbB])?(?![\p{L}\p{N}])/gu],
  ["quote", /[“”"]([^“”"\n]{3,240})[“”"]/gu],
  ["acronym", /\b[A-ZÀ-ÖØ-Þ]{2,8}(?:-[A-ZÀ-ÖØ-Þ0-9]{1,8})?\b/gu],
];

function keyOf(item) {
  return `${item.type}:${item.value.toLocaleLowerCase()}`;
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
      const key = keyOf(item);
      if (!seen.has(key)) {
        seen.add(key);
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
    const key = keyOf(item);
    if (!seen.has(key)) {
      seen.add(key);
      found.push(item);
    }
  }

  return found.sort((a, b) => (a.start ?? Number.MAX_SAFE_INTEGER) - (b.start ?? Number.MAX_SAFE_INTEGER));
}

function searchable(value) {
  return value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase();
}

export function missingInvariants(candidate, invariants) {
  const haystack = searchable(candidate);
  return invariants.filter((item) => !haystack.includes(searchable(item.value)));
}

export function invariantSummary(invariants) {
  return invariants.reduce((summary, item) => {
    summary[item.type] = (summary[item.type] || 0) + 1;
    return summary;
  }, {});
}
