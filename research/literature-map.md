# Literature and source map

Last checked: 2026-08-28.

## Primary product sources

- [Anthropic announcement](https://www.anthropic.com/news/claude-text-watermark): product description, planned coverage, robustness statements and detector plans.
- [Anthropic help center](https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content): current support wording and rollout status.

## Mechanism

- [Scalable watermarking for identifying large language model outputs](https://www.nature.com/articles/s41586-024-08025-4): SynthID Text sampling, detection and evaluation.
- [Official Google DeepMind implementation](https://github.com/google-deepmind/synthid-text): Apache-2.0 reference code for research surrogates.
- [Watermark under Fire](https://aclanthology.org/2025.findings-emnlp.1148/): broader attack and evaluation evidence through WaterPark.

## Attacks

- [SIRA](https://arxiv.org/abs/2505.05190): self-information-guided rewriting.
- [Watermark Smoothing Attacks](https://aclanthology.org/2025.findings-emnlp.264/): selective resampling of lower-confidence positions across ten studied schemes.
- [B4](https://aclanthology.org/2025.naacl-long.460/): strict black-box watermark scrubbing framed as constrained optimization with fidelity proxies.
- [TSAPA](https://aclanthology.org/2026.findings-acl.459/): evolutionary multi-objective paraphrase attack.
- [Quality-aware random-walk evaluation](https://aclanthology.org/2025.acl-long.1436/): evidence that automated attack success can collapse under human quality review.
- [Forensic reliability analysis](https://arxiv.org/abs/2607.16010): public watermark configurations and the danger of interpreting attack removal without false-negative context.
- [Chainwash](https://arxiv.org/abs/2605.05503): repeated independent rewriting in studied diffusion language-model watermarks. Its model family is narrower than Claude, so this project treats the chain pattern as experimental.

## Accessibility and detector governance

- [LaMPost](https://arxiv.org/abs/2207.02308): writing support research with adults with dyslexia.
- [GPT detector bias study](https://doi.org/10.1016/j.patter.2023.100779): bias evidence for generic detectors against non-native English writers. It is not direct evidence about Anthropic's keyed detector.

## Regulation

- [EU AI Act, Article 50](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32024R1689): provider marking duties, deployer disclosure duties and the editing-assistance exception in the enacted text.
- [European Commission transparency study](https://op.europa.eu/en/publication-detail/-/publication/6c981119-4829-11f1-8095-01aa75ed71a1/language-en): policy and technical evidence supporting the implementation work.

## Open-source triage

The official Google DeepMind repository is the only runtime-quality reference adopted for the optional surrogate lab. Small attack repositories with permissive licenses are useful for test ideas, not as dependencies. Repositories without a license are treated as all-rights-reserved and their code is not copied.

For the no-install interface, [WebLLM](https://github.com/mlc-ai/web-llm), [Transformers.js](https://github.com/huggingface/transformers.js) and [wllama](https://github.com/ngxson/wllama) were reviewed. They prove that local browser inference is possible, but a required model download and device-dependent performance would make the first visit heavier and less universal. Rewrite Room therefore uses a zero-dependency browser core and leaves model choice outside the page.
