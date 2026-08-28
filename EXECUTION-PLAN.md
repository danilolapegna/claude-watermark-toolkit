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
- [x] Build and test local provider adapters, then remove them after the real candidate batch failed the practical-value gate.
- [x] Build candidate validation and plain-language scorecards.
- [x] Build and red-team information-targeted rewriting, then remove it after the proxy failed the practical-value gate.
- [x] Build and red-team adaptive candidate search, reduce it to an honest independent batch, then remove the batch when real-model results failed the practical-value gate.
- [x] Test the retained prompt, restoration, check and comparison workflow plus offline edge cases.

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

- [x] Replace the short method list with a five-route ladder whose remaining entries each publish a contract, test and limit.
- [x] Add the two-envelope clean-room method in native English and Italian.
- [x] Test and remove draft-to-draft chains because they compound drift; retain only independent drafts from one checked brief.
- [x] Build a bilingual, no-install Rewrite Room with no backend, provider or text upload.
- [x] Protect exact values with local PV placeholders, export a tested structured prompt and retain the source-free clean-room route as the higher-effort option.
- [x] Require a deliberate second click before clearing the current session.
- [x] Rewrite the repository entry points around likely reader objections and actual next actions.
- [x] Rewrite the Italian website guide in Danilo's native style and align the English guide to the same admitted methods without machine translation.
- [x] Remove targeting, the pseudo-adaptive tournament and automatic recommendations after red-team failure.
- [x] Remove the automated local batch after real gpt-oss trials produced JSON, close copying and false stops.
- [x] Benchmark the primary prompt against a banal paraphrase on a local non-Anthropic model and retain the raw evidence.
- [x] Replace the stale website methods 6 and 7 with one explicit research post-mortem that tells the reader there is no action to take.
- [x] Add a shared explanation contract: reader situation, exact next action, expected result, cost or privacy trade-off, limit and stop condition before research jargon.
- [x] Add regression tests that reject removed CLI commands, targeting-as-instruction, tournament-as-instruction and inflated Rewrite Room claims across both languages.
- [x] Re-run unit, static, prose, link, journey, accessibility, desktop and mobile browser checks on the final v2 surface.
- [x] Merge and verify Rewrite Room on GitHub Pages.
- [x] Merge and verify the definitive Italian guide on danilolapegna.com.

## 9. Unified explanation and article draft

- [x] Reconcile README, manifesto, Rewrite Room, method guides, website guides and persistent product documents against one reader-first explanation contract.
- [x] State everywhere that Rewrite Room is a local prompt builder with checks, not an AI writer or detector.
- [x] Remove Methods 6 and 7 from both website guides and explain the rejected research prototypes only as a no-action post-mortem.
- [x] Align the image-versus-text argument: visual media may masquerade as sensory evidence; a text claim is judged by the claim, evidence and responsibility, not by the software that helped phrase it.
- [x] Write the private Substack draft `Le idee non hanno watermark` in Danilo's voice.
- [x] Replace generic editorial art with two original illustrations in the established Kintsugi / 5 Hacks visual system and one real Rewrite Room screenshot.
- [x] Pass the workspace deliverable gate and the no-em-dash check on the article.
- [ ] Publish or send the article. This remains deliberately outside the automated sequence.

## Release receipts

| Surface | State | Receipt |
|---|---|---|
| Toolkit repository | released | [`danilolapegna/claude-watermark-toolkit`](https://github.com/danilolapegna/claude-watermark-toolkit), PR 4 merged to `main` at `6e8e57f54850`; CI and GitHub Pages deploy passed |
| Rewrite Room | live | [`danilolapegna.github.io/claude-watermark-toolkit`](https://danilolapegna.github.io/claude-watermark-toolkit/); live copy identifies it as a simple, direct local prompt builder and has no horizontal overflow |
| English website guide | live | [`claude-text-watermark-guide.html`](https://danilolapegna.com/guides/claude-text-watermark-guide.html), site PR 24 merged at `d556136fd53d` |
| Italian website guide | live | [`guida-watermark-testi-claude.html`](https://danilolapegna.com/guides/guida-watermark-testi-claude.html), site PR 24 merged at `d556136fd53d`; the live page starts with `Se sei qui` and contains neither removed Method 6 nor Method 7 |
| Website runtime | verified | Lovable `Publish changes` completed with `Your website was updated`; public bundle `/assets/index-CmtPVl7X.js`; live browser audit passed with no horizontal overflow |
| Website tests | passed | 358 tests passed and 4 environment-gated tests skipped before the final neutral-copy correction; the final delta then passed its 8 targeted tests, TypeScript, changed-file lint, production build and prerender |
| Website lint baseline | contained | all changed TypeScript files pass; repository-wide lint still has 185 unrelated pre-existing errors |
| GitHub profile | updated | [`danilolapegna/danilolapegna` PR 2](https://github.com/danilolapegna/danilolapegna/pull/2), merge `2927e34` |
| Repository discovery | updated | English guide set as homepage; six public topics verified through GitHub |
| R&D report correction | corrected locally | the workspace report now distinguishes models launched from 2 August from the incomplete earlier-model rollout |
| Recurring verification | active | automation `verifica-repo-anti-watermark`, every 15 days |
| Toolkit v2 verification | passed | 38 tests plus workbench privacy/accessibility, prose and link checks passed; Italian practical-copy regression is now explicit |
| Website guide v2 verification | passed | 8 targeted guide tests, TypeScript, changed-file lint, production build and prerender passed after the final neutral-copy correction |
| Release readiness | `RELEASE_READY` | Both public front doors were inspected after deployment and match their merged source contracts |
| Substack article | private local draft | `Personal brand/deliverables/substack-le-idee-non-hanno-watermark-2026-08-28.md`; gate passed; not sent or published |

## 10. Pre-Substack handoff: reusable guide-writing standard

This appended step must close before the private Substack draft is presented for approval. It does not reopen or alter Sections 0-9.

- [x] Abstract the reader-guidance lessons from this project into one central, reusable guide-writing contract.
- [x] Keep voice, narrative, factual verification and SEO in their existing owners; add only the missing comprehension and actionability layer.
- [x] Make `monthly-guide-verificator` consume that contract and audit cold-reader comprehension, explained terminology, method actionability, promise honesty and native inclusive language.
- [x] Synchronize the central automation contract, provider package and arming inventory without changing cadence or permissions.
- [x] Validate the framework and verify the live provider automation before presenting the Substack draft.

Receipt: `Azienda/framework-core/contracts/guide-writing.md` is the reusable contract. The active Codex heartbeat `monthly-guide-verificator` consumes it through the canonical procedure, retains its existing 30-day cadence and review-only boundary, and passed automation registry, arming inventory, registry-count, document and arming-fidelity gates.

## 11. Pre-Substack hardening: automatic recall

This second appended step makes the standard self-invoking instead of relying on Danilo or an agent to remember it. It does not alter Sections 0-10.

- [x] Add one compact semantic trigger to the always-loaded workspace backbone for guide creation, rewriting, localization and readiness reviews.
- [x] Add a small lazy invocation rule that reads the central contract instead of duplicating it or creating another skill.
- [x] Route the always-active trust-quality loop to that rule for every public guide, tutorial, practical README and tool entry page.
- [x] Require a five-check Guide quality receipt before public release or a final readiness claim.
- [x] Keep the monthly radar directly wired to the same contract inside its canonical procedure and live provider prompt.

## Guide quality receipt

- contract: `Azienda/framework-core/contracts/guide-writing.md`
- cold-reader comprehension: PASS · the trigger starts from an unfamiliar visitor and requires the why, choices and first action without inherited context
- explained terminology: PASS · the contract includes the name-to-action test for every person, paper, acronym, model and algorithm
- method actionability: PASS · every practical route must satisfy the full Method Contract or be labelled as research with no action required
- promise honesty: PASS · the receipt blocks readiness when page verbs exceed tested capability, cost, privacy or provider boundaries
- native inclusive language: PASS · Italian and English are reviewed independently and avoid unnecessary gender or prior-knowledge assumptions
- overall: PASS

Receipt: `rules/lazy/guide-writing.md` owns auto-invocation, `contracts/guide-writing.md` remains the single standard, `rules/always/trust-quality-loop.md` and the workspace backbone recall it, and `monthly-guide-verificator` remains directly wired to it for recurring review.

## 12. From-zero product rebuild and mobile wayfinding

This appended step does not alter Sections 0-11. It closes the gaps found when Danilo tried to use the public toolkit without carrying the implementation context.

- [x] Reduce the product to one explicit loop: source, prompt builder, chosen writer, returned draft, local check.
- [x] Explain the hosted non-Anthropic and local LM Studio or Ollama writer choices at the exact handoff point.
- [x] Rewrite the optional CLI around named files, their creator, their contents, the command output and its next destination.
- [x] Re-audit every retained method, prompt and skill against usefulness, setup friction, failure recovery and reader knowledge required.
- [x] Extend the paired local prompt benchmark from four to eight bilingual boundary cases.
- [x] Reject a stricter prompt iteration that lost an exact-value set and worsened surface independence.
- [x] Publish the admitted raw benchmark and a case-by-case human semantic review, including the failures.
- [x] Rewrite both website guides and discovery copy against the same route map.
- [x] Add immediate mobile wayfinding on the guides landing and a persistent return-plus-index bar on guide articles.
- [x] Add geometry checks that prove sticky navigation remains visible and hash destinations do not drift after layout settles.
- [x] Correct the accessibility smoke so a deliberately decorative cover with `alt=""` passes only when the asset loads and the attribute exists.
- [x] Complete the final unified editorial, functional, accessibility, SEO and repository-state audit.
- [ ] Merge both repositories, publish through GitHub Pages and Lovable, then verify the live routes against merged source.

Rollback remains the previous public main commit in each repository. The local model server used for evidence is not part of the product and must be stopped after verification.
