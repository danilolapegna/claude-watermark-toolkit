# Make an AI-assisted text yours again

<p align="center">
  <strong>A practical, open-source guide to rebuilding Claude-assisted writing from the ideas up.</strong>
</p>

If you are looking for a practical way to remove a possible Claude text watermark, start here. You may have a text that says what you mean, but still feels tied to the way Claude phrased it. The ideas are yours. The facts are right. You just want a genuinely new version, without random synonym swaps or a detector score pretending to be certainty.

**The method in one sentence:** extract what must remain, put the original wording aside, then write a fresh draft from the checked brief.

You do not need to understand SynthID. You do not need to install anything for the first route.

This is for text you own and are willing to stand behind. It is not a way to borrow somebody else's authorship.

<p align="center">
  <a href="start-here/en/README.md"><img src="https://img.shields.io/badge/START_HERE-no_installation-2F855A?style=for-the-badge" alt="Start here without installing anything" /></a>
  <a href="README.it.md"><img src="https://img.shields.io/badge/LEGGI_IN-ITALIANO-C9A84C?style=for-the-badge&labelColor=1A1A2E" alt="Leggi in italiano" /></a>
  <a href="https://github.com/danilolapegna/claude-watermark-toolkit/actions/workflows/ci.yml"><img src="https://github.com/danilolapegna/claude-watermark-toolkit/actions/workflows/ci.yml/badge.svg" alt="Tests and documentation checks" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-1A1A2E?style=for-the-badge" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="https://danilolapegna.com/guides/claude-text-watermark-guide?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide">Read the friendly web guide</a>
  ·
  <a href="examples/walkthrough.md">See one complete example</a>
</p>

---

## 🧭 Choose the route that fits today

| What you want | Use this | Time | What you need |
|---|---|---:|---|
| The simplest answer | [Fresh redraft](methods/human-redraft/README.md) | 10 to 30 min | A blank page |
| Help from another AI system | [Two separate conversations](methods/independent-draft/README.md) | 10 to 20 min | Any non-Anthropic system |
| A repeatable local workflow | [Fresh draft from a checked brief](methods/semantic-reconstitution/README.md) | 10 to 30 min | Node.js, optionally Ollama |
| Several drafts and visible trade-offs | [Adaptive search](methods/adaptive-search/README.md) | 10 to 60 min | A local or compatible model |

Not sure? Pick the first route. A true fresh draft is a stronger starting point than light editing, and it keeps you in charge of the final words.

---

## ✍️ Do this now, no installation required

1. Read the original once.
2. On a blank page, list only the ideas, facts, numbers, names, links, quotes and constraints that must survive.
3. Close the original.
4. Put the points in the order your reader needs, even if that order is different.
5. Write the text again without looking back.
6. Reopen the original and compare facts, not sentences.

That is the whole method. Do not replace words one by one. Do not keep the same paragraph structure just because it is already there.

[Open the detailed manual method](methods/human-redraft/README.md) or [follow the beginner guide from zero](start-here/en/README.md).

---

## 📋 Prefer two copy-and-paste prompts?

Use two separate conversations in a non-Anthropic system:

1. In the first conversation, use the [research prompt](prompts/en/research-pass.md) to turn the source into a factual brief.
2. Check that brief yourself.
3. Start a new conversation and use the [drafting prompt](prompts/en/drafting-pass.md). Give it the brief, never the original.

The separation matters. If the writing conversation can still see the source, it can carry more of the original phrasing and structure into the new draft.

---

## 💻 Want the local tool?

The command-line tool keeps the source untouched, protects exact values and compares several drafts. It needs Node.js 20 or newer and has no required runtime packages.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-en.txt
```

For your own file:

```bash
node bin/watermark-toolkit.js prepare draft.txt --lang en --out case.json
node bin/watermark-toolkit.js prompt draft.txt --lang en --out prompts.json
```

If you want everything to stay on your computer, connect a non-Anthropic local model through Ollama:

```bash
node bin/watermark-toolkit.js rewrite draft.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out result.json
```

The tool blocks Anthropic hosts and Claude model names before sending a request. The [from-zero guide](start-here/en/README.md) explains downloading the ZIP, opening a terminal and fixing common errors.

---

## 🔎 What this can honestly promise

Anthropic describes its watermark as a statistical pattern in token choices, not hidden characters. It also says light edits are unlikely to remove the signal, while a complete rewrite that replaces every word does.

What nobody outside Anthropic can currently promise is a result against its private detector. There is no public model-by-model coverage table, public threshold or detector that can certify your text.

So this project does not sell a magic score. It gives you stronger and weaker reconstruction methods, protects facts before changing prose and labels every research inference as an inference. [Read the claim ledger](CLAIMS.md) and [the honest trade-offs](LIMITS.md).

---

## 💡 Why this project exists

Detectable AI involvement is not the same thing as false authorship.

A person may own the idea, evidence and judgment while using software to bridge dyslexia, dysgraphia, motor limitations, cognitive fatigue or a language barrier. If a school, employer or publisher treats the presence of AI as proof of dishonesty, it may punish the person who needed help putting an idea into readable form.

Image provenance can answer a useful question when a synthetic image may be mistaken for a photograph of a real event. Text is different. A statistical mark cannot tell us who had the idea, checked the facts or accepted responsibility for the result.

[Read the full manifesto](MANIFESTO.md).

---

## 🧪 Go deeper only if you need to

- [Probable mechanics](research/probable-mechanics.md), what public SynthID research suggests and where the analogy stops.
- [Information-targeted rewriting](methods/information-targeted/README.md), for choice-rich passages with fact protection first.
- [Adaptive candidate search](methods/adaptive-search/README.md), for several drafts and a visible Pareto set.
- [Experiment protocol](research/experiment-protocol.md), for reproducible surrogate testing without pretending it is Claude's detector.
- [Project status](STATUS.md), what is stable, experimental, research-only or unavailable.

Useful contributions include new language fixtures, failed cases, quality reviews and primary sources. See [CONTRIBUTING.md](CONTRIBUTING.md).

No source file is ever overwritten. MIT licensed. Built and maintained by [Danilo Lapegna](https://danilolapegna.com/?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide).
