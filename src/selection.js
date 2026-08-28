function objectives(scorecard) {
  const metrics = scorecard.metrics;
  return {
    retained: metrics.invariantRetention,
    changed: 1 - metrics.ngramSurvival,
    lengthFit: 1 - Math.min(1, Math.abs(1 - metrics.lengthRatio)),
    readabilityFit: 1 - Math.min(1, Math.abs(metrics.readabilityDelta) / 40),
  };
}

function dominates(a, b) {
  const aa = objectives(a);
  const bb = objectives(b);
  const keys = Object.keys(aa);
  return keys.every((key) => aa[key] >= bb[key]) && keys.some((key) => aa[key] > bb[key]);
}

export function paretoFront(scorecards) {
  const valid = scorecards.filter((item) => item.mechanicallyValid);
  return valid.filter((candidate) => !valid.some((other) => other.id !== candidate.id && dominates(other, candidate)));
}

export function selectCandidates(scorecards) {
  const front = paretoFront(scorecards);
  return {
    pareto: front.map((item) => item.id),
    mechanicalShortlist: front.map((item) => item.id),
    recommended: null,
    requiresManualChoice: true,
    rejected: scorecards.filter((item) => !item.mechanicallyValid).map((item) => item.id),
  };
}
