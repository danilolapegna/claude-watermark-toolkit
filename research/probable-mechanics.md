# How the watermark probably works

If you only want to rebuild a text, you do not need this page. Open [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) or use the [method guide](../METHODS.md).

This is the research layer. It explains the public mechanics, the attack ideas we studied and, just as importantly, why several clever-looking prototypes were removed from the practical toolkit.

## What Anthropic has confirmed

Anthropic says Claude uses a variant of SynthID Text. The signal is statistical and does not rely on hidden characters. Anthropic also says small edits are unlikely to remove it, a complete rewrite replacing every word does, and a translation made by Claude carries a watermark of its own. [Source: Anthropic](https://www.anthropic.com/news/claude-text-watermark).

Anthropic has not published its secret key, detector, threshold, context window, sampling configuration or complete model-by-model coverage table. Anything more specific about Claude is an inference, not a known implementation detail.

## The public SynthID mechanism, in plain language

A language model writes one token at a time. A token may be a word, part of a word or punctuation. At each position, several next tokens can be plausible.

The public SynthID Text paper describes a keyed sampling process. Recent tokens and a secret key produce pseudo-random scores for the next candidates. Sampling gives a small advantage to candidates with favorable keyed scores while preserving useful language. A detector with the same key recomputes scores for the finished text and accumulates evidence across many positions. [Source: Nature](https://www.nature.com/articles/s41586-024-08025-4).

Three consequences matter to a normal reader:

1. There is no single hidden payload to delete.
2. Changing punctuation or a few synonyms leaves most of the original sequence and context intact.
3. Rebuilding from facts and meaning creates a much more independent sequence than editing the old sentences in place.

Fixed facts, code, proper names and quotations also give the sampler less freedom. That is why the toolkit protects exact values before it measures wording change.

## What SIRA and smoothing attacks were trying to do

You do not need to run either method. They informed the research, not the public workflow.

SIRA studies high self-information tokens. In ordinary language, these are choices that a separate language model considered relatively surprising in that context. Its authors report strong removal across seven studied watermark schemes. [Source: SIRA](https://arxiv.org/abs/2505.05190).

Watermark Smoothing Attacks studies a related idea: use a reference model to find lower-confidence positions, then resample selected areas instead of paraphrasing everything. [Source: EMNLP Findings 2025](https://aclanthology.org/2025.findings-emnlp.264/).

The tempting product idea was a targeting tool that told the reader which words to change. We built and tested one. It failed the practical-value gate for two reasons:

- a local model's probability distribution is not Claude's keyed detector;
- rare or surprising words are often names, evidence or technical terms that matter most.

Protected-value filtering reduced the damage but did not solve the missing-detector problem. The `targets` command and token-surprisal script were removed. Keeping them as “advanced methods” would have transferred an unverified research proxy to a reader who had no sensible action to take.

## What B4 and TSAPA were trying to do

B4 frames black-box watermark scrubbing as constrained optimization. TSAPA uses a population of candidates and keeps visible trade-offs across objectives such as detector reduction and semantic quality. [Sources: B4](https://aclanthology.org/2025.naacl-long.460/), [TSAPA](https://aclanthology.org/2026.findings-acl.459/).

The useful lesson is not “run a genetic algorithm because it sounds advanced”. It is to reject factual failures first and keep quality objectives separate instead of hiding them inside one score.

The toolkit's first tournament generated several drafts, but its feedback did not genuinely steer the next generation. The source-separated writer could not see the source-overlap evidence used by the selector. A later honest batch also failed on a real local model: it sometimes returned JSON instead of prose, copied the brief too closely or rejected a valid checked brief.

Both automatic generation paths were removed. The remaining `compare` command shows the same mechanical evidence for drafts you obtained elsewhere and leaves the choice to a person.

## Why rewrite chains are not a public route

Chainwash reports stronger signal erosion from repeated independent rewriting on diffusion language-model watermarks. That model family is narrower than Claude. Every additional pass also creates another opportunity to lose a fact or flatten a qualification. [Source: Chainwash](https://arxiv.org/abs/2605.05503).

If several drafts are useful, they should start independently from the same checked brief, never from one another. That gives alternatives without playing semantic telephone. The toolkit does not present chainwashing as a separate reader method.

## The quality trap

An attack can reduce a detector score by damaging the text. A quality-aware study of random-walk attacks found a much lower success rate after human review than automated metrics alone suggested. [Source: ACL 2025](https://aclanthology.org/2025.acl-long.1436/).

This is the release rule that survived the research:

1. Protect exact facts first.
2. Separate source reading from drafting when stronger wording separation matters.
3. Show overlap, structure, length and readability as different observations.
4. Never turn those observations into an automatic winner or a fake private-detector verdict.
5. Require a person to review claims, qualifications and voice.

Research earns its place here by improving the decisions made for the reader. It does not earn a numbered method merely by sounding sophisticated.
