# Worked example

This page shows what the local comparison tool can and cannot decide. It follows one source through protected values, a checked brief and two valid drafts so you can see why “less copied wording” is not the same as “better writing.”

The ideas and evidence in a real case must be yours to use. Here the source is an invented fixture, and the point is deliberately narrow: repeat the check, inspect the evidence, then make the semantic decision yourself.

Source fixture: `examples/fixtures/source-en.txt`.

## Protected values

- `2026-08-28`
- `120`
- `https://example.com`

## Reconstruction brief

Purpose: report a small test of information structure.

Claims:

1. 120 readers used a short public guide on 2026-08-28.
2. The test compared a fact-first structure with the time needed to find the main claim.
3. The question was deliberately narrow.
4. The method was published before the result was inspected.

Voice: plain, restrained, no claim beyond the study question.

## Candidate A

On 2026-08-28, 120 people read a short guide at https://example.com. The researchers wanted to know whether placing facts first made the central claim quicker to find. They limited the study to that question and published their method before examining the outcome.

The file is [`examples/fixtures/candidate-a-en.txt`](fixtures/candidate-a-en.txt).

## Candidate B

Could readers locate a guide's main point faster when facts came first? A test with 120 readers on 2026-08-28 used https://example.com to examine that narrow question. The authors registered the method before checking what happened.

The file is [`examples/fixtures/candidate-b-en.txt`](fixtures/candidate-b-en.txt).

## What the tool reports

Both candidates retain the protected values. Candidate B changes the structure more sharply. Candidate A stays closer to the source tone. Neither automated result settles which one sounds more like the author.

Run the comparison:

```bash
node bin/watermark-toolkit.js compare \
  examples/fixtures/source-en.txt \
  examples/fixtures/candidate-a-en.txt \
  examples/fixtures/candidate-b-en.txt \
  --json
```

Both scorecards return `mechanicallyValid: true`, `semanticStatus: "requires-manual-review"` and `missingInvariants: []`. The tool also leaves `recommended` empty. Candidate B changes the structure more sharply. Candidate A stays closer to the source tone. Only a reader can verify which one keeps every qualification and sounds like the author.
