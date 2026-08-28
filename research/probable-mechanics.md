# How the watermark probably works

This page describes the public evidence, then stops where the evidence stops.

## What Anthropic has confirmed

Anthropic says Claude uses a variant of SynthID Text. The signal is statistical. It does not rely on hidden characters. Anthropic also says small edits are unlikely to remove it, a complete rewrite replacing every word does, and a translation made by Claude carries a watermark of its own. [Source: Anthropic](https://www.anthropic.com/news/claude-text-watermark).

Anthropic has not published its secret key, detector, threshold, context window, tournament depth or model-level coverage table.

## How public SynthID Text works

The public paper describes a keyed sampling process. Recent tokens and a secret key seed pseudo-random scores for candidate tokens. Tournament sampling gives preference to candidates with favorable keyed scores while keeping the output distribution useful. The detector recomputes the keyed scores for the observed tokens and aggregates evidence across the text.

The paper's experiments use particular context lengths, tournament layers and aggregation methods. Those are research configurations, not facts about Claude. [Source: Nature](https://www.nature.com/articles/s41586-024-08025-4).

Three consequences matter:

1. The signal is spread across token choices, not stored in one removable place.
2. More independent token choices give the detector more evidence.
3. Fixed facts, code, proper names and low-choice passages offer less room to bias sampling.

## Why small edits are weak

Changing punctuation or a few synonyms leaves most token contexts and choices intact. Some local changes may disrupt later contexts, but the detector can aggregate evidence across many surviving positions. This matches Anthropic's own warning that light edits are unlikely to be enough.

## Why semantic reconstitution is stronger

A research brief keeps propositions and constraints while discarding sentence form. A separate drafting pass starts a new sampling path from that brief. New paragraph order, syntax, connective logic and word choice replace a much larger share of the original token sequence.

This reasoning supports the method. It does not predict a private detector score.

## Why information targeting may help

SIRA targets high self-information tokens, which are unlikely choices under a language model's distribution. Its authors report strong removal across seven studied schemes. A plausible explanation is that these positions carry more useful watermark evidence or create larger context changes when replaced. [Source: SIRA](https://arxiv.org/abs/2505.05190).

The project offers two targeting modes:

- supplied self-information from a local causal model;
- a transparent lexical proxy when no model score is available.

The proxy is deliberately labeled. Rare words can be facts, so protected values are removed from the rewrite queue before a suggestion is accepted.

Watermark Smoothing Attacks adds a related clue. The authors report that lower-confidence positions can carry stronger watermark signal and selectively resample them instead of paraphrasing everything. This does not reveal Claude's private detector, but it supports a careful “micro-surgery” route: protect facts first, then spend edits where a suitable local reference model is least confident. [Source: EMNLP Findings 2025](https://aclanthology.org/2025.findings-emnlp.264/).

## Why adaptive search may help

TSAPA treats rewriting as a multi-objective search instead of a single paraphrase. Its reported results combine attack success and semantic quality across studied schemes. [Source: TSAPA](https://aclanthology.org/2026.findings-acl.459/).

Our clean-room implementation uses objectives we can measure without Anthropic's detector: invariant retention, phrase change, length fit and readability. A public surrogate can be added in the research lab, but it never becomes the hidden definition of quality.

B4 frames the same broad problem under strict black-box access as constrained optimization. TSAPA uses a population, mutations and a Pareto front. The practical lesson is not “run a genetic algorithm because it sounds clever”. It is to keep several candidates with different trade-offs, reject fact loss first and refuse to compress quality into one number. [Source: NAACL 2025](https://aclanthology.org/2025.naacl-long.460/).

## Why repeated independent rewrites are a last resort

Chainwash reports that repeated independent rewriting can erode studied watermark signals more than a single rewrite. The evidence comes from diffusion language-model watermarks, not Claude, so the method stays experimental here. It also compounds meaning drift on every pass. If used at all, each pass should receive the checked brief rather than the previous wording, and every candidate should return through the protected-fact and human-quality gates. [Source: Chainwash preprint](https://arxiv.org/abs/2605.05503).

## The quality trap

An attack can reduce a detector score by damaging the text. A quality-aware study of random-walk attacks found a much lower success rate after human review than automated metrics alone suggested. [Source: ACL 2025](https://aclanthology.org/2025.acl-long.1436/).

This is why the toolkit rejects missing facts before ranking candidates and still asks a person to choose the final draft.
