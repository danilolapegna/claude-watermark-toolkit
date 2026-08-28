# Execution plan

This is the public source of truth for the end-to-end sequence. A checked box means there is a file, test, commit or live URL that proves it.

Last updated: 2026-08-28.

## 0. Product and evidence

- [x] Freeze the approved product scope.
- [x] Close the product interrogation.
- [x] Define architecture, boundaries and single sources of truth.
- [ ] Correct the 2026-08-28 R&D report where it overstates current watermark coverage.
- [ ] Publish the claim ladder: official fact, reproduced result, plausible inference, unknown.

## 1. Repository foundation

- [x] Pass the Genesis and pre-build readiness gates.
- [x] Initialize Git on a `codex/` feature branch.
- [x] Add the MIT license, contribution guide, code of conduct and security policy.
- [x] Add CI for tests, links and public prose.
- [ ] Publish `danilolapegna/claude-watermark-toolkit` as a public repository.

## 2. Working product

- [x] Build the immutable rewrite case and invariant extractor.
- [x] Build semantic reconstitution and offline prompt export.
- [x] Add Ollama and generic OpenAI-compatible providers.
- [x] Reject Anthropic endpoints and Claude model identifiers.
- [x] Build candidate validation and plain-language scorecards.
- [x] Build information-targeted rewriting.
- [x] Build adaptive candidate search and Pareto selection.
- [x] Test one full mock workflow and offline edge cases.

## 3. Human entry points

- [x] Write the English manifesto and README.
- [x] Write the Italian manifesto and README as native Italian.
- [x] Write from-zero English and Italian start guides.
- [x] Add copyable English and Italian prompts.
- [x] Add a copyable non-Anthropic agent skill.
- [x] Add examples with before, protected facts, candidates and scorecards.
- [x] Enforce the no-slop prose gate on every public text file.

## 4. Research quality

- [x] Publish probable mechanics with primary sources.
- [x] Publish the evidence matrix and known unknowns.
- [x] Document a reproducible surrogate-lab protocol.
- [x] Document quality-aware attack evaluation and negative results.
- [x] Mark every method as stable, experimental or research-only.

## 5. Website and discovery

- [ ] Add a native Italian guide to danilolapegna.com.
- [ ] Add a native English guide to danilolapegna.com.
- [ ] Add canonical, hreflang, TechArticle, citations and only justified FAQ markup.
- [ ] Add repo click and copy-action analytics where the action exists.
- [ ] Add GitHub-to-site and site-to-GitHub campaign links.
- [ ] Update the public GitHub profile after the repository is live.

## 6. Release proof

- [x] Run unit, integration, CLI and prose tests.
- [ ] Run site lint, tests, build and prerender checks.
- [ ] Audit keyboard, headings, links, contrast and mobile reading.
- [ ] Verify the public repository default branch and files through GitHub.
- [ ] Verify both guide URLs from the deployed HTML.
- [ ] Record commit hashes and live URLs below.

## 7. Ongoing verification

- [x] Create the recurring automation `Verifica repo anti-watermark`.
- [x] Schedule it every 15 days in this task.
- [x] Require fresh web research, primary sources and a comparison against the repository and both website guides.
- [x] Keep public merge and deploy outside the automation. It may prepare a local `codex/` patch when evidence requires a change.

## Release receipts

| Surface | State | Receipt |
|---|---|---|
| Toolkit repository | not published | pending |
| English website guide | not deployed | pending |
| Italian website guide | not deployed | pending |
| GitHub profile | not updated | pending |
| R&D report correction | not committed | pending |
| Recurring verification | active | automation `verifica-repo-anti-watermark`, every 15 days |
