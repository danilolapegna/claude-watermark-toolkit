# Project status

Last checked: 2026-08-28.

## Stable in version 1.0

- Offline source analysis.
- Automatic protection of URLs, email addresses, dates, numbers, quotes and acronyms.
- User-supplied protected values.
- Two-pass prompt export in English and Italian.
- Ollama and generic OpenAI-compatible provider adapters.
- Fail-closed blocking of Anthropic hosts and Claude model identifiers.
- Protected-value validation.
- Four-word phrase survival, length and readability reports.
- Transparent lexical targeting.
- External self-information score input for advanced targeting.
- Bounded semantic reconstruction and adaptive candidate search.
- Pareto selection and plain-language score explanations.
- Mechanical public-prose check.
- Static bilingual Rewrite Room that opens from GitHub Pages or directly from the downloaded `docs/index.html` file.
- Browser-only protected-value extraction, source-free prompt export and candidate comparison.
- Longest shared phrase, three-, four- and five-word survival, sentence-opening reuse and rough structural similarity reports.

## Experimental

- Readability is a rough editorial signal. It is not a quality verdict.
- The lexical targeting proxy finds choice-rich passages without a language model. It is transparent but weaker than token self-information from a suitable local model.
- Adaptive search uses source overlap only during evaluation. Its best settings will vary by language, length and model.
- Proper names that are not acronyms require `--protect` when automatic extraction misses them.

## Research-only

- Official public SynthID Text as a surrogate detector.
- Detector ensembles across random keys and configurations.
- Local causal-model token surprisal.
- Any comparison with watermark schemes not available through an official implementation.

Research-only means the setup can teach us something about a mechanism. It does not turn the result into a claim about Claude.

## Not available

- Anthropic's detector API.
- A verified model-by-model Claude coverage table.
- A guarantee against a private detector.
- A hosted text-processing service. The static Rewrite Room has no backend and does not receive user text.
- An Anthropic provider adapter.

Follow [EXECUTION-PLAN.md](EXECUTION-PLAN.md) for release receipts and the recurring verification schedule.
