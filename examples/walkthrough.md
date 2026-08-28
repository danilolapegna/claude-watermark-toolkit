# Worked example

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

Both scorecards return `valid: true` and `missingInvariants: []`. The exact readability number can move if the formula changes, so the repository does not freeze it into this page. The useful comparison is stable: Candidate B changes the structure more, while Candidate A stays closer to the source tone.
