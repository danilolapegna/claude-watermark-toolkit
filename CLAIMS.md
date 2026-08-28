# Claim ledger

Last checked: 2026-08-28.

This file separates four kinds of statement:

- `OFFICIAL`: stated by Anthropic, Google DeepMind, a law or another primary source.
- `REPRODUCED`: independently run by this project with a public protocol and result.
- `INFERENCE`: technically plausible, but not confirmed for Claude.
- `UNKNOWN`: evidence needed before a responsible claim is possible.

## Claude coverage

| Claim | Status | Evidence | What we say |
|---|---|---|---|
| Anthropic announced a SynthID Text variant for future Claude models on 14 August 2026 | OFFICIAL | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | Yes |
| Older Claude models would receive the watermark over the following months | OFFICIAL | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | Yes |
| Supported models launched on or after 2 August carry the watermark at launch | OFFICIAL | [Anthropic help center](https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content) | Yes, with the word supported |
| Every Claude output has been watermarked since 14 August 2026 | UNKNOWN | No public model-by-model table or public detector | Never state as fact |
| No Claude output before a future launch is watermarked | UNKNOWN | Rollout to existing models is in progress | Never state as fact |

## Mechanics

| Claim | Status | Evidence | Boundary |
|---|---|---|---|
| The signal uses statistical token choices rather than hidden Unicode | OFFICIAL | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | Applies to Anthropic's description |
| Anthropic uses a variant of SynthID Text | OFFICIAL | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | Variant details are not public |
| Public SynthID seeds token scoring from a secret key and recent context | OFFICIAL for public SynthID | [Nature paper](https://www.nature.com/articles/s41586-024-08025-4) | Does not establish Claude's exact configuration |
| Claude uses the paper's experimental context length, layer count or detector aggregator | UNKNOWN | Anthropic has not published those settings | Never assume |
| High-choice passages are likely to carry more useful signal than fixed phrases | INFERENCE | Public SynthID mechanics and [SIRA](https://arxiv.org/abs/2505.05190) | A design hypothesis, not a detector result |

## Removal and robustness

| Claim | Status | Evidence | Boundary |
|---|---|---|---|
| Small edits are unlikely to remove the Claude watermark | OFFICIAL wording from Anthropic | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | No public threshold supplied |
| A complete rewrite replacing every word removes it | OFFICIAL wording from Anthropic | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | We still refuse to promise a detector result we cannot test |
| Claude-made translations carry a watermark | OFFICIAL wording from Anthropic | [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark) | This project does not use Claude for translation |
| Light synonym replacement is a dependable solution | CONTRADICTED by the mechanism and vendor guidance | Primary sources above | Listed as insufficient |
| Unicode cleanup removes a statistical watermark | CONTRADICTED by the mechanism | Primary sources above | Useful only for unrelated hidden-character cleanup |
| SIRA reported near-total removal across seven studied watermark schemes | OFFICIAL result reported by its authors | [SIRA paper](https://arxiv.org/abs/2505.05190) | Does not prove success against Claude |
| Evolutionary multi-objective attacks can preserve quality while reducing detection across studied schemes | OFFICIAL result reported by its authors | [TSAPA](https://aclanthology.org/2026.findings-acl.459/) | Does not prove success against Claude |
| Selective resampling of lower-confidence positions can outperform broad paraphrasing across studied schemes | OFFICIAL result reported by its authors | [Watermark Smoothing Attacks](https://aclanthology.org/2025.findings-emnlp.264/) | Does not establish which Claude positions carry signal |
| Strict black-box scrubbing can be treated as constrained optimization with fidelity checks | OFFICIAL method reported by its authors | [B4](https://aclanthology.org/2025.naacl-long.460/) | Inspires the candidate tournament, not a Claude result |
| Repeated independent rewriting can outperform one pass in studied diffusion language-model watermarks | OFFICIAL result reported by its authors | [Chainwash](https://arxiv.org/abs/2605.05503) | Narrower model family; experimental route only |
| Any paraphrase that beats a detector remains good writing | CONTRADICTED | [Quality-aware random-walk evaluation](https://aclanthology.org/2025.acl-long.1436/) | Human quality review remains necessary |

## Accessibility and enforcement

| Claim | Status | Evidence | Boundary |
|---|---|---|---|
| AI can support some adults with dyslexia during writing | RESEARCH EVIDENCE | [LaMPost study](https://arxiv.org/abs/2207.02308) | Small study, promising features and reported limitations |
| Generic AI-text detectors have shown bias against non-native English writers | RESEARCH EVIDENCE | [Patterns study](https://doi.org/10.1016/j.patter.2023.100779) | Does not directly prove bias in Anthropic's keyed detector |
| Enforcement based on detectable AI involvement can disadvantage people using assistive writing tools | ETHICAL AND POLICY ARGUMENT | Reasoning in the manifesto plus accessibility evidence | Does not depend on detector false positives |

## Reproduced by this repository

The code tests reproduce these local properties:

- protected values fail closed when a candidate drops them;
- four-word phrase survival falls after independent restructuring;
- public provider configuration rejects Anthropic hosts and Claude model names;
- Pareto selection keeps trade-offs visible instead of hiding them in one score;
- the two-pass drafting step receives a reconstruction brief rather than source wording.

No Claude detector result is currently marked `REPRODUCED`.
