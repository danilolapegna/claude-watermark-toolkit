# Solution review: 3 November 2026

This is the technical record behind the reader-facing routes. It is not a claim that any public tool can query Claude's private detector.

## Incumbent check

The toolkit already provides the lowest-friction general route: Rewrite Room builds a source-aware prompt, a writer chosen by the reader creates the draft, and the browser checks exact values and visible wording overlap. LM Studio and Ollama keep the writer local. The two-envelope route gives stronger separation when the old wording should not reach the drafting context.

A new dependency had to solve a distinct need better than these routes. “It has more algorithms” was not enough.

## Candidates

| Candidate | What was executed | Useful result | Cost or failure | Verdict |
|---|---|---|---|---|
| [Reflip](https://github.com/nerln/reflip) | 348 Python tests; browser tests excluding the locale-specific copy assertion | actual automatic local rewrite in a browser; measured open-SynthID surrogate; explicit fact-drift data | about 800 MB for the small model; small models changed counted facts; no Claude key | ADMIT as a bounded external experiment |
| [SynthID text watermark attacks](https://github.com/natzir/synthid-text-watermark-attacks) | code compilation and published-result inspection | clear replication showing Unicode cleanup fails and full rewriting or SIRA can disrupt an open surrogate | research setup, roughly 9 GB model, no test suite, no Claude key | RESEARCH_ONLY |
| [AI Watermark Scrambler](https://github.com/novatechflow/ai-watermark-scrambler) | full available test suite | maintained wrapper with broad file support | surface is much larger than the text need; claims still rely on surrogates | RESEARCH_ONLY |
| [Watermarks Remover](https://github.com/guillaumemeyer/watermarks-remover) | targeted test suite, 188 tests passed after allowing local loopback | broad implementation and useful patterns | heavy multi-format product with substantially more setup than the reader needs | RESEARCH_ONLY |
| [TextSeal](https://github.com/facebookresearch/TextSeal) | source and dependency review | primary research toolkit with a permissive licence | PyTorch and Transformers research stack, not a beginner workflow | RESEARCH_ONLY |
| [B4](https://github.com/YihanWang617/B-4) and [TSAPA](https://github.com/chengzhixue/TSAPA) | compilation or repository inspection | useful constrained-optimization and multi-objective research ideas | heavy research dependencies, API or benchmark setup, no access to Claude's detector | RESEARCH_ONLY |

## What changed in the practical advice

1. Unicode cleanup is no longer dismissed only from mechanism. A public open-SynthID replication measured it and still detected every studied sample.
2. Automatic local rewriting now has one honest experimental route. Reflip earns a link because it works in a browser, publishes its benchmark and states its own factual cost.
3. Reflip does not become the default. Its smallest browser model brought 22 of 24 surrogate texts below the study's threshold but changed about 14 counted facts per 1,000 words. Its fact check caught 60% of the tested changes in the categories it measures, and other semantic drift remained possible.
4. The recommended route for important text remains a checked brief plus a capable writer, followed by human factual review.

## Licence and exit map

| Candidate | Licence | Lock-in | Exit |
|---|---|---|---|
| Reflip | MIT | low; external link only | remove the link, no toolkit code or data migration |
| SynthID text watermark attacks | MIT | none; research reference | remove the citation |
| AI Watermark Scrambler | Apache-2.0 | medium if adopted because of its broad wrapper | no adoption made |
| Watermarks Remover | MIT | high product-surface cost if adopted | no adoption made |
| TextSeal | Apache-2.0 | high research-stack cost | retain only the research citation |
| B4 / TSAPA | Apache-2.0 | high benchmark and model-stack cost | retain only the research citation |

The public toolkit imports none of these engines. Reflip is a third-party option, not a bundled dependency.
