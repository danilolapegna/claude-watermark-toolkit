# Worked example

This page shows what the optional CLI's `compare` command is for. It does not create drafts. It reads one source and two drafts that already exist, then puts the same mechanical checks side by side. That can help you choose what to inspect. It cannot choose the final wording for you.

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

You do not need to run this command to understand the example. If you downloaded the repository and have Node.js 20 or later, open a terminal in the toolkit folder and run:

```bash
node bin/watermark-toolkit.js compare examples/fixtures/source-en.txt examples/fixtures/candidate-a-en.txt examples/fixtures/candidate-b-en.txt
```

The output names each file and shows whether exact values survived, the longest shared phrase and other visible overlap. Both drafts pass the configured mechanical checks. Candidate B changes the structure more sharply. Candidate A stays closer to the source tone. You still choose after checking every qualification and reading for voice.

If “CLI” or “terminal” is new to you, start with the [from-zero CLI guide](../methods/semantic-reconstitution/README.md). For one text, [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) is easier.
