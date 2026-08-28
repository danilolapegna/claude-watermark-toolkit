# Release receipt

Date: 2026-08-28  
Verdict: **READY**  
Claim profile: **RELEASE_READY**

This receipt covers the first public release of the toolkit, both native website guides, repository discovery, the GitHub profile entry and recurring evidence verification.

## Delivery gate

| Check | Result | Evidence |
|---|---|---|
| Requested scope exists | PASS | public toolkit, Italian guide, English guide, profile entry and recurring automation |
| Repository behavior | PASS | 14 Node tests, CLI checks, link gate and prose gate |
| Website behavior | PASS | 346 tests passed; 4 environment-gated tests skipped |
| Type safety and build | PASS | TypeScript and production build completed; both guide variants were prerendered |
| Focused coverage | PASS | guide content and repository CTA reached 100 percent statement coverage; prerender branches were executed |
| Accessibility | PASS | one H1, ordered headings, descriptive images, keyboard access, 44 pixel targets and no mobile overflow |
| Search and discovery | PASS | canonical, reciprocal hreflang, TechArticle, citations, FAQ, sitemap and LLM discovery files observed |
| Public repository | PASS | GitHub reports public visibility, `main` as default, guide homepage and six topics |
| Public runtime | PASS | both guide URLs return HTTP 200 and passed the live desktop and mobile browser audit |
| Ongoing maintenance | PASS | `Verifica repo anti-watermark` runs every 15 days and requires fresh primary-source research |

## Adversarial release questions

- Is any guarantee made against Anthropic's private detector? No.
- Is any Anthropic model, API, SDK or endpoint used by the workflow? No.
- Is the 14 August coverage claim presented as established fact? No.
- Can a user mistake a proxy score for a detector result? The interface and documentation label every proxy and limitation.
- Can protected names, numbers, dates, URLs or quotations be silently changed? Candidates that lose protected values are rejected and the final human check remains mandatory.
- Does the accessibility argument claim that the watermark itself harms readability? No. It addresses discriminatory enforcement against people who use AI as an assistive writing layer.
- Does the project encourage plagiarism or fabricated authorship? No. The permitted-use boundary is explicit in both guides and the repository.

## Journey Observatory

Not applicable. The website work reuses the existing public guide route, article layout and reading journey. It does not add authentication, onboarding, checkout, billing, a new application screen or a new data-backed flow.

## Known baseline debt

- Every changed TypeScript file passes lint. The website repository-wide lint command still reports 185 unrelated pre-existing errors.
- GitHub Actions for the website currently fail before executing job steps. This also affects older commits and is separate from the locally executed test, build and live-runtime evidence recorded here.
- The production build retains its existing large-chunk and Browserslist warnings.

## Rollback

- Toolkit: revert the public toolkit release commit.
- Website: revert site merge `f326fcb` and publish the resulting Lovable revision.
- Profile: revert profile merge `2927e34`.
- Automation: disable `verifica-repo-anti-watermark` without deleting its history.

No migration, secret, authentication change, backend deployment or irreversible data operation belongs to this release.
