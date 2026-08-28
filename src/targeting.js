import { words } from "./validators.js";

function splitSentences(text) {
  const segmenter = new Intl.Segmenter("und", { granularity: "sentence" });
  const result = [];
  for (const segment of segmenter.segment(text)) {
    const value = segment.segment.trim();
    if (!value) continue;
    const leadingWhitespace = segment.segment.length - segment.segment.trimStart().length;
    const actualStart = segment.index + leadingWhitespace;
    result.push({ text: value, start: actualStart, end: actualStart + value.length });
  }
  return result;
}

export function rankRewriteTargets(text, { externalTokenScores = [] } = {}) {
  const sentences = splitSentences(text);
  const documentFrequency = new Map();
  for (const sentence of sentences) {
    for (const token of new Set(words(sentence.text))) {
      documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
    }
  }

  return sentences.map((sentence, index) => {
    const tokens = words(sentence.text);
    const lexicalNovelty = tokens.length === 0
      ? 0
      : tokens.reduce((total, token) => total + 1 / (documentFrequency.get(token) || 1), 0) / tokens.length;
    const diversity = tokens.length === 0 ? 0 : new Set(tokens).size / tokens.length;
    const supplied = externalTokenScores.filter((item) => item.start < sentence.end && item.end > sentence.start);
    const suppliedInformation = supplied.length
      ? supplied.reduce((sum, item) => sum + Number(item.score || 0), 0) / supplied.length
      : null;
    const proxyScore = 0.55 * lexicalNovelty + 0.45 * diversity;
    return {
      id: `segment-${index + 1}`,
      ...sentence,
      score: Number((suppliedInformation ?? proxyScore).toFixed(4)),
      scoreType: suppliedInformation === null ? "transparent-lexical-proxy" : "supplied-self-information",
    };
  }).sort((a, b) => b.score - a.score);
}
