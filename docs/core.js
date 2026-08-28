(function attachRewriteRoomCore(scope) {
  "use strict";

  const PATTERNS = [
    ["url", /https?:\/\/[^\s)\]}>,]+/giu],
    ["email", /[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}/giu],
    ["quote", /[“”"]([^“”"\n]{3,240})[“”"]/gu],
    ["date", /\b(?:\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/gu],
    ["number", /(?<![\p{L}\p{N}])(?:€|\$|£)?\d+(?:[.,]\d+)*(?:\s?%|\s?[kKmMbB])?(?![\p{L}\p{N}])/gu],
    ["acronym", /\b[A-ZÀ-ÖØ-Þ]{2,8}(?:-[A-ZÀ-ÖØ-Þ0-9]{1,8})?\b/gu],
  ];

  const COPY = {
    en: {
      promptTitle: "CLEAN-ROOM WRITING BRIEF",
      task: "Write a genuinely new text from the brief below.",
      rules: [
        "Use only the ideas, facts and constraints in this brief. You do not have the original text.",
        "Preserve every protected value exactly.",
        "Choose a fresh order, sentence rhythm and paragraph structure.",
        "Follow the voice notes. Avoid polished filler that the author would not use.",
        "Do not add facts. Return only the draft.",
      ],
      labels: {
        purpose: "PURPOSE",
        claims: "CLAIMS AND IDEAS",
        audience: "AUDIENCE",
        voice: "VOICE",
        constraints: "CONSTRAINTS",
        protected: "PROTECTED VALUES",
      },
      none: "None supplied",
    },
    it: {
      promptTitle: "SCHEDA DI SCRITTURA A CAMERA STAGNA",
      task: "Scrivi un testo davvero nuovo partendo solo dalla scheda qui sotto.",
      rules: [
        "Usa soltanto le idee, i fatti e i vincoli presenti nella scheda. Non hai il testo originale.",
        "Conserva esattamente ogni valore protetto.",
        "Scegli un ordine, un ritmo delle frasi e una struttura dei paragrafi nuovi.",
        "Segui le note sulla voce. Evita il riempitivo levigato che l'autore non userebbe.",
        "Non aggiungere fatti. Restituisci soltanto la bozza.",
      ],
      labels: {
        purpose: "SCOPO",
        claims: "IDEE E AFFERMAZIONI",
        audience: "PUBBLICO",
        voice: "VOCE",
        constraints: "VINCOLI",
        protected: "VALORI PROTETTI",
      },
      none: "Nessuno indicato",
    },
  };

  function normalizeText(value) {
    return String(value || "").normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase();
  }

  function words(value) {
    return normalizeText(value).match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) || [];
  }

  function splitLines(value) {
    return String(value || "")
      .split(/\r?\n/gu)
      .map((line) => line.replace(/^\s*[-*•]\s*/u, "").trim())
      .filter(Boolean);
  }

  function uniqueByNormalized(items) {
    const seen = new Set();
    return items.filter((item) => {
      const key = normalizeText(item.value);
      if (!item.value || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function extractProtectedValues(text, extras) {
    const found = [];
    for (const [type, pattern] of PATTERNS) {
      pattern.lastIndex = 0;
      for (const match of String(text || "").matchAll(pattern)) {
        const value = type === "url" ? match[0].replace(/[.!?:;'”"]+$/gu, "") : match[0];
        const start = match.index;
        const end = start + value.length;
        const nestedInsideExisting = found.some((item) => item.start !== undefined && start >= item.start && end <= item.end);
        if (value && !nestedInsideExisting) found.push({ type, value, start, end });
      }
    }
    for (const value of splitLines(extras)) found.push({ type: "manual", value });
    return uniqueByNormalized(found).map(({ type, value }) => ({ type, value }));
  }

  function missingProtectedValues(candidate, protectedValues) {
    const haystack = normalizeText(candidate);
    return (protectedValues || []).filter((item) => !haystack.includes(normalizeText(item.value)));
  }

  function ngramSet(tokens, size) {
    const grams = new Set();
    for (let index = 0; index <= tokens.length - size; index += 1) {
      grams.add(tokens.slice(index, index + size).join(" "));
    }
    return grams;
  }

  function ngramSurvival(source, candidate, size) {
    const sourceGrams = ngramSet(words(source), size);
    if (!sourceGrams.size) return 0;
    const candidateGrams = ngramSet(words(candidate), size);
    let shared = 0;
    for (const gram of sourceGrams) if (candidateGrams.has(gram)) shared += 1;
    return shared / sourceGrams.size;
  }

  function longestSharedPhrase(source, candidate) {
    const sourceWords = words(source);
    const candidateWords = words(candidate);
    const previous = new Array(candidateWords.length + 1).fill(0);
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
      for (let index = 0; index < current.length; index += 1) previous[index] = current[index];
    }

    return {
      length: bestLength,
      phrase: sourceWords.slice(bestEnd - bestLength, bestEnd).join(" "),
    };
  }

  function sentences(value) {
    return String(value || "")
      .split(/(?<=[.!?])\s+|\n+/u)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
  }

  function sentenceOpeningReuse(source, candidate, openingSize) {
    const size = openingSize || 3;
    const sourceOpenings = new Set(
      sentences(source)
        .map((sentence) => words(sentence).slice(0, size).join(" "))
        .filter((opening) => opening.split(" ").length === size),
    );
    if (!sourceOpenings.size) return 0;
    const candidateOpenings = new Set(
      sentences(candidate)
        .map((sentence) => words(sentence).slice(0, size).join(" "))
        .filter((opening) => opening.split(" ").length === size),
    );
    let shared = 0;
    for (const opening of sourceOpenings) if (candidateOpenings.has(opening)) shared += 1;
    return shared / sourceOpenings.size;
  }

  function closeness(a, b) {
    if (a === 0 && b === 0) return 1;
    return Math.min(a, b) / Math.max(a, b, 1);
  }

  function structureSimilarity(source, candidate) {
    const sourceParagraphs = String(source || "").split(/\n\s*\n/u).filter((part) => part.trim());
    const candidateParagraphs = String(candidate || "").split(/\n\s*\n/u).filter((part) => part.trim());
    const sourceSentences = sentences(source);
    const candidateSentences = sentences(candidate);
    const sourceAverage = words(source).length / Math.max(sourceSentences.length, 1);
    const candidateAverage = words(candidate).length / Math.max(candidateSentences.length, 1);
    const score = (
      closeness(sourceParagraphs.length, candidateParagraphs.length)
      + closeness(sourceSentences.length, candidateSentences.length)
      + closeness(sourceAverage, candidateAverage)
    ) / 3;
    return Number(score.toFixed(4));
  }

  function compareTexts(source, candidate, protectedValues) {
    const missing = missingProtectedValues(candidate, protectedValues || []);
    const longest = longestSharedPhrase(source, candidate);
    const sourceWordCount = words(source).length;
    const candidateWordCount = words(candidate).length;
    return {
      sourceWordCount,
      candidateWordCount,
      lengthRatio: sourceWordCount ? candidateWordCount / sourceWordCount : 0,
      protectedCount: (protectedValues || []).length,
      protectedRetention: (protectedValues || []).length
        ? ((protectedValues || []).length - missing.length) / (protectedValues || []).length
        : 1,
      missingProtectedValues: missing,
      ngramSurvival: {
        3: ngramSurvival(source, candidate, 3),
        4: ngramSurvival(source, candidate, 4),
        5: ngramSurvival(source, candidate, 5),
      },
      longestSharedPhrase: longest,
      sentenceOpeningReuse: sentenceOpeningReuse(source, candidate, 3),
      structureSimilarity: structureSimilarity(source, candidate),
    };
  }

  function buildCleanRoomPrompt(brief, language) {
    const copy = COPY[language] || COPY.en;
    const lines = [copy.promptTitle, "", copy.task, "", "RULES:"];
    copy.rules.forEach((rule, index) => lines.push(`${index + 1}. ${rule}`));
    lines.push("");

    const sections = [
      [copy.labels.purpose, brief.purpose],
      [copy.labels.claims, brief.claims],
      [copy.labels.audience, brief.audience],
      [copy.labels.voice, brief.voice],
      [copy.labels.constraints, brief.constraints],
      [copy.labels.protected, (brief.protectedValues || []).map((item) => item.value).join("\n")],
    ];

    for (const [label, value] of sections) {
      lines.push(`${label}:`);
      lines.push(String(value || "").trim() || copy.none);
      lines.push("");
    }
    return lines.join("\n").trim();
  }

  scope.RewriteRoomCore = Object.freeze({
    buildCleanRoomPrompt,
    compareTexts,
    extractProtectedValues,
    longestSharedPhrase,
    missingProtectedValues,
    ngramSurvival,
    normalizeText,
    sentenceOpeningReuse,
    structureSimilarity,
    words,
  });
}(globalThis));
