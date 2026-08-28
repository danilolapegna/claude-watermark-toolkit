# Ideas Don't Carry Watermarks

Claude Watermark Toolkit is a practical, open-source guide to reconstructing AI-assisted text in your own voice. It starts with a five-minute manual method and ends with tested local tools for semantic reconstitution, protected-fact checks, information targeting and bounded candidate search.

No Anthropic model, API, SDK or coding tool is part of the runtime.

[Leggi in italiano](README.it.md) · [Read the manifesto](MANIFESTO.md) · [Start from zero](start-here/en/README.md) · [See a worked example](examples/walkthrough.md) · [Open the full guide](https://danilolapegna.com/guides/claude-text-watermark-guide?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide)

## What this project does

It gives you five routes, ordered by effort:

| Route | Time | Technical level | Privacy | Best use |
|---|---:|---|---|---|
| Fresh human redraft | 10 to 30 min | none | stays with you | short, important text |
| Independent draft from an outline | 10 min | none | depends on your chosen tool | everyday writing |
| Semantic reconstitution | 5 to 20 min | beginner | local or chosen endpoint | strong default for longer text |
| Information-targeted rewrite | 15 to 45 min | advanced | local | research and stubborn passages |
| Adaptive candidate search | 10 to 60 min | technical | local or chosen endpoint | several candidates with explicit trade-offs |

Every route tells you what it preserves, what it changes, where it can fail and how to check the result. [See the method comparison](LIMITS.md).

## The important fact about Claude

Anthropic announced on 14 August 2026 that future Claude models would use a variant of SynthID Text. Its own announcement also said that rollout to older models would happen over the following months. Anthropic's current help page says supported models launched on or after 2 August carry the mark at launch, while rollout to existing models is still in progress.

That does not prove that every Claude output has been marked since 14 August. It also does not prove the opposite. Anthropic has not published a model-by-model coverage table or a public detector. The honest status is model-level uncertainty. [The claim ledger records the exact distinction](CLAIMS.md).

## Five-minute start

You do not need to install anything.

1. Put the original text away.
2. Write a fact sheet containing only claims, numbers, names, URLs, quotes and constraints.
3. Choose a new order for those claims.
4. Draft from the fact sheet in your normal voice.
5. Compare facts, not sentences.

This works because a fresh draft replaces the sampling choices that a statistical text watermark would need to detect. It also produces a result you can defend as your own editorial work. [Follow the complete manual walkthrough](methods/human-redraft/README.md).

## Install the local tool

You need Node.js 20 or newer. The toolkit has no required runtime packages.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-en.txt
```

Prepare a case and protect facts:

```bash
node bin/watermark-toolkit.js prepare draft.txt --lang en --out case.json
```

Create a two-pass prompt pair for any non-Anthropic system:

```bash
node bin/watermark-toolkit.js prompt draft.txt --lang en --out prompts.json
```

Compare several drafts:

```bash
node bin/watermark-toolkit.js compare draft.txt candidate-a.txt candidate-b.txt --json
```

Use a local Ollama model:

```bash
node bin/watermark-toolkit.js rewrite draft.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out result.json
```

The tool rejects Anthropic hosts and Claude model identifiers before making a request.

## How the stronger workflow works

The source goes through two separate passes:

1. The research pass extracts claims, evidence, constraints, protected values and voice notes.
2. The drafting pass sees that brief, not the source wording.

Candidates must keep protected facts before they can be ranked. The selector then shows trade-offs across phrase survival, length fit and readability. It returns a Pareto set rather than hiding everything behind one detector-like score.

This is not a Claude detector. It is a quality-controlled reconstruction workflow built around the probable mechanics of statistical text watermarking.

## What we know and what we do not

- Official fact: Anthropic describes its approach as a SynthID Text variant with no hidden characters.
- Official fact: Anthropic says light edits are unlikely to remove the signal and a complete rewrite that replaces every word does.
- Reproduced elsewhere: public research shows that paraphrasing attacks trade detection strength against text quality.
- Plausible inference: high-choice parts of a text are more useful marking sites than fixed facts or low-entropy passages.
- Unknown: Claude's exact keying, window size, model coverage, detector threshold and error rates.

Read [probable mechanics](research/probable-mechanics.md), [known unknowns](research/known-unknowns.md) and the [experiment protocol](research/experiment-protocol.md).

## Why this exists

AI involvement is not a verdict on authorship. A person may own the idea, the evidence and the judgment while using software to overcome dyslexia, dysgraphia, motor limitations, cognitive fatigue or a language barrier. Turning a hidden technical signal into a presumption of fraud can punish the person who needed an assistive writing layer.

Image provenance can protect people when a synthetic image is likely to be mistaken for a real event or person. Text is different. A mark on statistical word choices cannot settle who had the idea, checked the facts or made the final decision. [The manifesto makes that case in full](MANIFESTO.md).

## Project status

The offline analyzer, prompt pair, provider guard, protected-fact validation, information targeting and adaptive selection are implemented and tested. The public SynthID surrogate lab is a reproducible research protocol, not a production detector. See [STATUS.md](STATUS.md) before relying on an advanced method.

## Contributing

Useful contributions include new language fixtures, failed cases, quality reviews, primary sources and provider adapters that respect the non-Anthropic boundary. Read [CONTRIBUTING.md](CONTRIBUTING.md).

MIT licensed. Built and maintained by [Danilo Lapegna](https://danilolapegna.com/?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide).
