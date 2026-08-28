# Project status

Last checked: 2026-08-28.

## Stable in version 1.0

- Local protected-value inventory for URLs, email addresses, common English and Italian dates, numbers, currencies, quotations, acronyms and user-supplied values.
- Character-for-character protected-value checks with nested-fragment suppression.
- Primary structured prompt export in English and Italian.
- Advanced source-separated research and drafting prompts.
- Source and candidate overwrite protection.
- Mechanical reports for protected values, four-word phrase survival, longest shared phrase, sentence openings, length and reading-ease drift.
- A mechanical shortlist with no automatic editorial winner.
- Static bilingual Rewrite Room prompt builder and local comparison page that works on GitHub Pages or from a downloaded `docs/index.html`.
- Browser-only prompt preparation and comparison with no model call, account, upload or AI credits.
- Public prose, static asset and local-link gates.

## Tested boundaries

The automated suite covers:

- English and Italian value formats, Unicode, nested values and large inputs;
- source and candidate overwrite attempts;
- prompt injection boundaries in source and brief fields;
- malformed, incomplete and drifting research briefs;
- browser and Node prompt contracts;
- semantic inversions that pass mechanical checks but must remain `requires-manual-review`;
- structural contracts for the public prompts and agent skill.

The suite proves pipeline behavior and failure handling. It does not prove that an arbitrary model writes good prose.

## Deliberately removed after red-team review

- Transparent lexical targeting and the `targets` command. The proxy could prioritize rare facts without identifying Claude's private watermark positions.
- External token-surprisal targeting. A separate model's probability distribution is not Anthropic's keyed distribution.
- The adaptive tournament. It generated variations, but its feedback did not genuinely guide the next generation.
- Automatic candidate recommendations. Surface metrics cannot choose the author's voice or approve semantic fidelity.
- Independent rewrite chains as a separate route. If several drafts are useful, they should start independently from the same human-checked brief, never from one another.
- Automated local candidate batches. Real gpt-oss 20B trials returned structured data instead of prose, copied brief language too closely or stopped on a valid reviewed brief. The setup did not earn its cost over the primary prompt.

## Research-only

- Official public SynthID Text as a surrogate watermark implementation.
- Detector ensembles across random keys and configurations.
- Comparisons with watermark schemes that have an official runnable implementation.

Research-only means the setup can test a mechanism or a hypothesis. It does not turn the result into a claim about Claude.

## Not available

- Anthropic's detector API.
- A verified model-by-model Claude coverage table.
- A guarantee against a private detector.
- Automatic semantic approval.
- A hosted text-processing service. Rewrite Room has no backend and never receives user text.
- Automatic provider calls from the CLI.

Follow [EXECUTION-PLAN.md](EXECUTION-PLAN.md) for release receipts and the recurring verification schedule.
