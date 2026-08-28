# Execution plan

This is the public source of truth for the end-to-end sequence. A checked box means there is a file, test, commit or live URL that proves it.

Last updated: 2026-08-28.

## 0. Product and evidence

- [x] Freeze the approved product scope.
- [x] Close the product interrogation.
- [x] Define architecture, boundaries and single sources of truth.
- [x] Correct the 2026-08-28 R&D report where it overstates current watermark coverage.
- [x] Publish the claim ladder: official fact, reproduced result, plausible inference, unknown.

## 1. Repository foundation

- [x] Pass the Genesis and pre-build readiness gates.
- [x] Initialize Git on a `codex/` feature branch.
- [x] Add the MIT license, contribution guide, code of conduct and security policy.
- [x] Add CI for tests, links and public prose.
- [x] Publish `danilolapegna/claude-watermark-toolkit` as a public repository.

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

- [x] Add a native Italian guide to danilolapegna.com.
- [x] Add a native English guide to danilolapegna.com.
- [x] Add canonical, hreflang, TechArticle, citations and only justified FAQ markup.
- [x] Add repository click analytics where the action exists.
- [x] Add GitHub-to-site and site-to-GitHub campaign links.
- [x] Update the public GitHub profile after the repository is live.

## 6. Release proof

- [x] Run unit, integration, CLI and prose tests.
- [x] Run scoped site lint, the full test suite, TypeScript, build and prerender checks.
- [x] Audit keyboard, headings, links, action size and mobile reading.
- [x] Verify the public repository default branch and metadata through GitHub.
- [x] Verify both guide URLs from the deployed HTML and a live browser audit.
- [x] Record commit hashes and live URLs below.

## 7. Ongoing verification

- [x] Create the recurring automation `Verifica repo anti-watermark`.
- [x] Schedule it every 15 days in this task.
- [x] Require fresh web research, primary sources and a comparison against the repository and both website guides.
- [x] Keep public merge and deploy outside the automation. It may prepare a local `codex/` patch when evidence requires a change.

## 8. Rewrite Room and definitive guide expansion

- [x] Replace the short method list with a complete route ladder from disclosure to human editing.
- [x] Add the two-envelope clean-room method in native English and Italian.
- [x] Add the independent rewrite chain with its narrower evidence boundary.
- [x] Build a bilingual, no-install Rewrite Room with no backend, provider or text upload.
- [x] Protect exact values, seal and restore the source, export a source-free prompt and compare a candidate locally.
- [x] Require a deliberate second click before clearing the current session.
- [x] Rewrite the repository entry points around likely reader objections and actual next actions.
- [x] Rewrite only the Italian website guide in Danilo's native style and prove that the English body is unchanged.
- [x] Pass unit, static, prose, link, journey, accessibility, desktop and mobile browser checks.
- [ ] Merge and verify Rewrite Room on GitHub Pages.
- [ ] Merge and verify the definitive Italian guide on danilolapegna.com.

## Release receipts

| Surface | State | Receipt |
|---|---|---|
| Toolkit repository | public | [`danilolapegna/claude-watermark-toolkit`](https://github.com/danilolapegna/claude-watermark-toolkit), `main` at `5281bbb` before this receipt update |
| English website guide | live | [`claude-text-watermark-guide.html`](https://danilolapegna.com/guides/claude-text-watermark-guide.html), site merge `f326fcb`, HTTP 200 |
| Italian website guide | live | [`guida-watermark-testi-claude.html`](https://danilolapegna.com/guides/guida-watermark-testi-claude.html), site merge `f326fcb`, HTTP 200 |
| Website runtime | verified | Lovable publish completed; public bundle `/assets/index-D6EWnncN.js`; both routes passed desktop and mobile browser smoke |
| Website tests | passed | 346 tests passed, 4 environment-gated tests skipped; TypeScript, production build, prerender and changed-file lint passed |
| Website lint baseline | contained | all changed TypeScript files pass; repository-wide lint still has 185 unrelated pre-existing errors |
| GitHub profile | updated | [`danilolapegna/danilolapegna` PR 2](https://github.com/danilolapegna/danilolapegna/pull/2), merge `2927e34` |
| Repository discovery | updated | English guide set as homepage; six public topics verified through GitHub |
| R&D report correction | corrected locally | the workspace report now distinguishes models launched from 2 August from the incomplete earlier-model rollout |
| Recurring verification | active | automation `verifica-repo-anti-watermark`, every 15 days |
