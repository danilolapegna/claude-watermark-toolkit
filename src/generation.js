import { buildDraftPrompt, buildResearchPrompt, parseBrief } from "./reconstruction.js";
import { scoreCandidate } from "./validators.js";
import { selectCandidates } from "./selection.js";

const VARIATIONS = [
  "change the order of the claims while keeping the logic clear",
  "use shorter sentences and concrete verbs",
  "open with the consequence, then explain the reasoning",
  "use a calm first-person editorial voice where the brief permits it",
  "use a question-led structure without rhetorical filler",
  "compress repeated ideas and vary paragraph length",
];

export async function researchBrief(rewriteCase, provider) {
  const response = await provider.complete([
    { role: "system", content: "Extract a factual reconstruction brief. Return valid JSON only." },
    { role: "user", content: buildResearchPrompt(rewriteCase) },
  ], { temperature: 0.1 });
  return parseBrief(response.text);
}

export async function generateCandidate(brief, provider, variation, seed) {
  const response = await provider.complete([
    { role: "system", content: "Draft from the supplied brief. Do not add facts. Return the text only." },
    { role: "user", content: buildDraftPrompt(brief, { variation }) },
  ], { temperature: 0.85, seed });
  return response.text.trim();
}

export async function semanticReconstitution(rewriteCase, provider, { count = 3 } = {}) {
  const brief = rewriteCase.brief || await researchBrief(rewriteCase, provider);
  const candidates = [];
  for (let index = 0; index < count; index += 1) {
    candidates.push(await generateCandidate(brief, provider, VARIATIONS[index % VARIATIONS.length], index + 1));
  }
  const scorecards = candidates.map((candidate) => scoreCandidate(rewriteCase, candidate));
  return { brief, candidates, scorecards, selection: selectCandidates(scorecards) };
}

export async function adaptiveSearch(rewriteCase, provider, { population = 4, generations = 2 } = {}) {
  const brief = rewriteCase.brief || await researchBrief(rewriteCase, provider);
  const allCandidates = [];
  const allScorecards = [];
  let feedback = "Start with a genuinely independent structure.";

  for (let generation = 0; generation < generations; generation += 1) {
    for (let index = 0; index < population; index += 1) {
      const variation = `${VARIATIONS[(generation * population + index) % VARIATIONS.length]}. ${feedback}`;
      const candidate = await generateCandidate(brief, provider, variation, generation * 100 + index + 1);
      const scorecard = scoreCandidate(rewriteCase, candidate);
      allCandidates.push(candidate);
      allScorecards.push(scorecard);
    }
    const selection = selectCandidates(allScorecards);
    const best = allScorecards.find((item) => item.id === selection.recommended);
    feedback = best
      ? `Reduce surviving source phrases below ${Math.round(best.metrics.ngramSurvival * 100)} percent without losing protected values.`
      : "Previous candidates lost protected values. Preserve every protected value exactly.";
  }

  return { brief, candidates: allCandidates, scorecards: allScorecards, selection: selectCandidates(allScorecards) };
}
