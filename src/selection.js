function objectives(scorecard) {
  const metrics = scorecard.metrics;
  return {
    retained: metrics.invariantRetention,
    changed: 1 - metrics.ngramSurvival,
    lengthFit: 1 - Math.min(1, Math.abs(1 - metrics.lengthRatio)),
    readable: metrics.readability / 100,
  };
}

function dominates(a, b) {
  const aa = objectives(a);
  const bb = objectives(b);
  const keys = Object.keys(aa);
  return keys.every((key) => aa[key] >= bb[key]) && keys.some((key) => aa[key] > bb[key]);
}

export function paretoFront(scorecards) {
  const valid = scorecards.filter((item) => item.valid);
  return valid.filter((candidate) => !valid.some((other) => other.id !== candidate.id && dominates(other, candidate)));
}

export function recommendationScore(scorecard) {
  const value = objectives(scorecard);
  return 0.3 * value.retained + 0.35 * value.changed + 0.2 * value.lengthFit + 0.15 * value.readable;
}

export function selectCandidates(scorecards) {
  const front = paretoFront(scorecards);
  const ranked = [...front].sort((a, b) => recommendationScore(b) - recommendationScore(a));
  return {
    pareto: ranked.map((item) => item.id),
    recommended: ranked[0]?.id || null,
    rejected: scorecards.filter((item) => !item.valid).map((item) => item.id),
  };
}
