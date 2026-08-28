# Every practical route, from “do nothing” to a candidate tournament

Yes, some of the early methods look obvious. They are here on purpose.

This is meant to be the complete ladder, not a sales funnel where every answer somehow ends with installing our tool. One person has twelve minutes and a public blog post. Another has a confidential report, a local model and a weekend. They should not receive the same prescription.

One rule applies to every route: use it for ideas and writing you own, then check and accept responsibility for the final text.

## The short comparison

| Route | Effort | Privacy | Expected surface change | Main cost or weakness |
|---|---:|---|---|---|
| 0. Leave it alone or disclose the assistance | none | best | none | does not help where detectable assistance itself triggers enforcement |
| 1. Rewrite it yourself from a fact sheet | 10 to 60 min | best | high | time and the temptation to peek at the source |
| 2. Two-envelope clean room | 15 to 40 min | depends on writer | high | the brief must be checked carefully |
| 3. Rewrite Room | 10 to 30 min | best for preparation and comparison | high when the method is followed | it guides and checks, but does not generate prose |
| 4. Another non-Anthropic agent with the prompt or skill | 10 to 30 min | depends on provider | high | a fluent model can still invent or flatten facts |
| 5. Local CLI and local model | setup plus 10 to 60 min | local | high | installation and compute |
| 6. Confidence-aware micro-surgery | 20 to 90 min | local option | medium | targeting can damage rare but important facts |
| 7. Candidate tournament | 30 to 120 min | local option | high within the search budget | more compute and proxy gaming |
| 8. Independent rewrite chain | 30 to 120 min | depends on writer | potentially very high | meaning drift compounds at every pass |
| 9. Human editor | paid time | depends on agreement | high | cost and availability |

There is no universal winner. For most people, Route 2 or Route 3 is the sensible start.

## 0. Leave it alone or disclose the assistance

You may be thinking, “I came here to change the text, not to be told to do nothing.” Fair. This route still belongs in a complete guide because some contexts permit AI-assisted writing and only require disclosure. In that case, rebuilding a sound text can be wasted work.

Use it when the relevant policy is clear, the assistance is allowed and attribution answers the real concern. Do not use it when the policy is vague and a private detector is being treated as proof of misconduct. That is a governance problem, not a writing problem.

## 1. Rewrite it yourself from a fact sheet

The immediate reaction is probably: “Well, obviously. Just rewrite it. Thanks.”

Yes. Duh. It is included because it costs no money, sends nothing anywhere and is often the strongest method for a short text. The useful part is not the instruction to type again. It is the separation:

1. extract facts, claims and constraints;
2. close the source;
3. choose a different order;
4. write from your own understanding;
5. reopen the source only to verify facts.

If the source stays beside you, you will often preserve its paragraph logic even while changing every obvious word. [Use the full manual method](methods/human-redraft/README.md).

## 2. The two-envelope clean room

This sounds a little theatrical until you see what the two envelopes prevent.

- Envelope 1 holds purpose, claims, evidence, names, numbers, dates, links and exact quotations.
- Envelope 2 holds your voice: rhythm, formality, favorite connectors, rough edges and words you would never use.

The original sentences go into neither envelope. A person or a separate non-Anthropic model writes from the two envelopes only.

Why two envelopes instead of one giant summary? Because facts and voice fail differently. Facts need exactness. Voice needs concrete instructions and examples. Mixing both into one loose prompt makes it easy to preserve neither.

[Follow the English method](methods/two-envelope-clean-room/README.md) or [the Italian method](methods/two-envelope-clean-room/README.it.md).

## 3. Rewrite Room, no installation

You may reasonably say: “So it is a form. How is that a brilliant algorithm?”

The form is the guardrail. The browser core does the less visible work:

- finds values that must survive;
- keeps the source in the current tab only;
- hides the source before drafting;
- exports a prompt containing the checked brief but not the source;
- lists missing protected values;
- measures the longest shared phrase and three-, four- and five-word survival;
- checks repeated sentence openings and rough structural similarity.

It does not rewrite for you because doing that inside every browser would require a large model download or a remote provider. It gives you the part that should be universal and local, then lets you write by hand or use any non-Anthropic system you trust.

[Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) or download the repository and open `docs/index.html`.

## 4. Give the clean brief to another non-Anthropic agent

“Why not paste the source into a new chat and ask for a paraphrase?” Because a new window is not the important separation. A new context that never receives the old wording is.

Choose one of these delivery formats:

- [two copyable prompts](prompts/en/research-pass.md);
- [the copyable agent skill](skills/non-anthropic-text-rewrite/SKILL.md);
- the source-free prompt exported by Rewrite Room.

The research context may see the source and produce a brief. Check it. The writing context receives only that brief. If confidentiality matters, use a local non-Anthropic model for both stages.

## 5. Run the local CLI and a local model

“I do not use a terminal.” Then skip this route. You do not lose the method.

The CLI is for repeated work, long files and people who want machine-readable reports. It protects values, exports prompts, calls Ollama or a compatible non-Anthropic endpoint and keeps several trade-offs visible.

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out result.json
```

This costs setup and compute. Its advantage is repeatability, not superior taste.

## 6. Confidence-aware micro-surgery

“Now we are overengineering a paragraph.” Sometimes, yes. Use this only when a complete rebuild is impractical or when you are studying the mechanism.

SIRA targets high self-information tokens. Watermark Smoothing Attacks reports strong signal around lower-confidence positions and selectively resamples them. These are different technical views of where an edit budget may matter most. Neither reveals Claude's secret configuration.

The safe order is:

1. protect facts and exact language;
2. use a suitable local reference model to identify uncertain or high-information positions;
3. remove protected spans from the target list;
4. rewrite complete clauses or passages around the remaining targets;
5. recheck meaning, facts and transitions.

The danger is obvious once stated: rare words are often precisely the names, terms and evidence you cannot change. [Read the implementation boundary](methods/information-targeted/README.md).

## 7. Run a candidate tournament

“A genetic algorithm for writing sounds like a wonderful way to produce twelve bad paragraphs.” It can be. That is why the tournament rejects broken candidates before ranking anything.

Inspired by B4 and TSAPA, this route treats rewriting as several competing objectives:

- keep every protected fact;
- reduce source phrase survival;
- avoid a wild length change;
- retain readable, useful prose;
- keep different non-dominated candidates instead of hiding everything behind one score.

The algorithm can show trade-offs. It cannot decide which sentence sounds like you. [Use adaptive search](methods/adaptive-search/README.md).

## 8. Use an independent rewrite chain

This is the route people reach for when one rewrite still feels too close. It also has the easiest failure mode: every pass can sand away another qualification.

Do not pass Draft 1 into Draft 2, then Draft 2 into Draft 3. That creates a telephone game. Give the same checked brief to several independent contexts, or repeat the pass from the brief with a new structural instruction. Validate facts after every candidate.

Chainwash reports stronger signal erosion from repeated independent rewriting in studied diffusion language-model watermarks. That is narrower evidence than Claude, so this route remains experimental. [Read the careful version](methods/independent-rewrite-chain/README.md).

## 9. Hire a human editor

This may be the most radical plug-and-play answer: pay a good editor, give them the facts and the purpose, and do not give them the original wording until fact check.

The upside is judgment. The downside is money, time and trust. Agree on confidentiality and make clear that the job is a clean reconstruction, not synonym replacement.

## Tempting shortcuts that do not earn a route number

- **Light synonym swaps:** most contexts and structure survive. Anthropic itself says light editing is unlikely to be enough.
- **Punctuation changes:** they alter very few sampling choices.
- **Unicode cleaners and invisible-character removers:** useful for unrelated hygiene, irrelevant to a statistical token watermark.
- **Backtranslation:** unpredictable surface change with a high risk of meaning drift.
- **A Claude translation or paraphrase:** Anthropic says Claude-made translations carry a watermark, and this project excludes Anthropic transformation tools anyway.
- **A public SynthID detector:** it does not have Anthropic's secret key or configuration.
- **Random word deletion:** it can lower overlap by making the text worse. That is not success.

## The honest ending

No public route can certify a result against Anthropic's private detector today. The strong methods in this guide do something narrower and real: they replace much more of the original sampling path, preserve the facts before changing the form and put a human back in charge of the final text.
