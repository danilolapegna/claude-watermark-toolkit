import { invariantSummary } from "./invariants.js";

const LABELS = {
  en: {
    purpose: "What should the reader understand or do after reading?",
    claims: "List the claims in your own notes, one per line.",
    voice: "Describe your natural voice with three concrete traits.",
    constraints: "Record length, format, audience and any wording that must stay exact.",
  },
  it: {
    purpose: "Che cosa deve capire o fare il lettore dopo aver letto?",
    claims: "Elenca le idee con parole tue, una per riga.",
    voice: "Descrivi la tua voce naturale con tre tratti concreti.",
    constraints: "Indica lunghezza, formato, pubblico e le formule che devono restare identiche.",
  },
};

export function createManualBrief(rewriteCase) {
  const labels = LABELS[rewriteCase.language];
  return {
    language: rewriteCase.language,
    invariantSummary: invariantSummary(rewriteCase.invariants),
    protectedValues: rewriteCase.invariants.map(({ type, value }) => ({ type, value })),
    worksheet: [labels.purpose, labels.claims, labels.voice, labels.constraints],
    purpose: "",
    claims: [],
    voice: [],
    constraints: [],
  };
}

export function buildResearchPrompt(rewriteCase) {
  const languageName = rewriteCase.language === "it" ? "Italian" : "English";
  const protectedValues = rewriteCase.invariants.map(({ type, value }) => `- ${type}: ${value}`).join("\n") || "- none detected";

  return `You are the research pass in a two-pass reconstruction workflow.

Read the source and return JSON only. Do not draft or paraphrase the source. Extract:
1. purpose
2. claims as short factual propositions
3. evidence, examples and causal links
4. audience
5. constraints
6. voice traits stated as practical instructions
7. protectedValues exactly as supplied

Output language for the brief: ${languageName}.

Protected values:
${protectedValues}

Source:
<source>
${rewriteCase.source}
</source>`;
}

export function buildDraftPrompt(brief, { variation = "fresh structure" } = {}) {
  return `Write a new text from the reconstruction brief below.

Rules:
- Work from the ideas and constraints in the brief, not from any prior wording.
- Preserve every protected value exactly.
- Use a fresh structure and natural sentence rhythm.
- Do not mention watermarks, detectors or this workflow.
- Do not add facts.
- Variation goal: ${variation}.
- Return the text only.

Reconstruction brief:
${JSON.stringify(brief, null, 2)}`;
}

export function buildPromptPair(rewriteCase) {
  return {
    step1: {
      name: "research",
      instruction: "Run this in one non-Anthropic conversation. Save the JSON response.",
      prompt: buildResearchPrompt(rewriteCase),
    },
    step2: {
      name: "draft",
      instruction: "Start a separate non-Anthropic conversation. Replace BRIEF_JSON, then run the prompt.",
      prompt: buildDraftPrompt({ BRIEF_JSON: "Paste the JSON from step 1 here" }),
    },
  };
}

export function parseBrief(text) {
  const lines = String(text).trim().split("\n");
  const unfenced = lines[0]?.startsWith("```")
    ? lines.slice(1, lines.at(-1)?.startsWith("```") ? -1 : undefined).join("\n")
    : lines.join("\n");
  const value = JSON.parse(unfenced);
  if (!value || !Array.isArray(value.claims) || value.claims.length === 0) {
    throw new Error("Research pass did not return a brief with claims.");
  }
  return value;
}
