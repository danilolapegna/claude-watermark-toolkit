# Method 5: adaptive candidate search

Use this when you can afford several drafts and want visible trade-offs.

## Command

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out result.json
```

This makes eight bounded candidate calls after the research pass.

## Objectives

- keep every protected value;
- reduce surviving source phrases;
- stay near the useful source length;
- remain readable.

Candidates missing protected values are rejected. The remaining non-dominated candidates form a Pareto set. The recommended candidate uses public weights, so you can disagree with the choice and inspect another draft.

## Pros

- several structures instead of one paraphrase;
- explicit budget;
- failed candidates remain visible;
- no claim of a private detector score.

## Cons

- more calls and more local compute;
- proxies can reward bland prose;
- semantic quality still needs a person;
- results depend on the chosen drafting model.

## Stop rule

Stop when the best valid candidates repeat the same quality problem. More generations will often amplify that problem. Fix the brief or draft by hand instead.

