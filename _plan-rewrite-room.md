# Rewrite Room expansion plan

Date: 2026-08-28
Branch: `codex/rewrite-room`
Task class: feature-build
Definition of done: full, because the change adds a public multi-step interface, new tested logic, several documentation surfaces and a coordinated website rewrite.

## Outcome

Turn the repository from a four-option technical guide into a complete, human-readable ladder of practical methods. Add one memorable no-install method and one browser tool that works locally without an account, an upload or a provider dependency. Rewrite the Italian website guide in Danilo's real voice.

## Sub-requirements

- [x] Anticipate what a skeptical reader is likely to think before each method and answer it plainly.
- [x] State that the guide deliberately includes obvious, cheap and advanced routes because different readers accept different costs.
- [x] Replace the four-route framing with a complete ladder ordered by effort, privacy, strength and editorial risk.
- [x] Add the two-envelope clean-room method as a wording-independent reconstruction workflow.
- [x] Build Rewrite Room as a static local browser tool with no required installation and no runtime upload.
- [x] Extract protected values, create a meaning brief, hide the source during drafting and compare a candidate against the source.
- [x] Report fact retention, longest shared phrase, shared n-grams, sentence-opening reuse and structure similarity without claiming detector access.
- [x] Let the reader copy a prompt for any non-Anthropic model and export a plain-text brief.
- [x] Explain information-targeted editing, confidence-aware micro-surgery, candidate tournaments and repeated independent rewriting from primary research.
- [x] Keep weak methods visible as weak methods, with the exact reason each one fails.
- [x] Publish English and Italian entry points that lead with action before theory.
- [x] Rewrite only the Italian website guide in Danilo's native style; keep the English website guide sober and unchanged except for factual or link parity.
- [x] Update architecture, status, claim boundaries, research notes and the persistent execution sequence.
- [x] Test core browser logic, keyboard flow, mobile layout, public prose, internal links and website rendering.
- [ ] Prepare separate reviewable pull requests for the toolkit and website.

## Pre-task Scan

**AGENTS.md read**: workspace, `Codebases/AGENTS.md`, repository `AGENTS.md`.

**Applicable best practices**: framework-not-codebase, read-before-write, mid-flight-reconciliation, silent-omission-is-the-killer, todo-as-done-is-banned, commit-size-budget, dod-full-physical-materialization, customer-action-ui-contract, ui-source-provenance-before-inference.

**Project conventions consulted**: the current fingerprint confirms that this repository has no prior component system, color tokens, font family or UI route. The static workbench therefore needs an explicit visual contract while preserving the project's zero-dependency, native JavaScript and local-first conventions.

**Intent Discovery**:

- `interactive ui test` and `verify ui works` matched `live-smoke-loop`.
- `verify ui works deeply before merge` matched `deep-smoke`.
- `reuse before write` matched `pre-task-context-scan`.
- The new route and first public interface trigger `journey-observatory`.
- The public form and reading surface trigger `accessibility-audit`.

**Skills used**:

- `code-task-bootstrap` for branch, scope and closure discipline.
- `architecture-first` in delta mode for the new browser organ and contracts.
- `problem-attack` for the complete method set and unconventional route.
- `opensource-scout` for browser-local model and UI engine alternatives.
- `narrative-spine` for reader sequence and objection handling.
- `writing-style-clone` for the Italian website guide.
- `frontend-design` for the new public interface.
- `journey-observatory` before and after implementation.
- `accessibility-audit` as a read-only post-build audit.

**Skills excluded**:

- `ux-audit`, because Journey Observatory covers the specific multi-step path and the request is not a broad site heuristic audit.
- `performance-audit`, because the tool has no framework, network requests or model download; load and interaction timing are covered by the browser smoke.
- `estetica-aurea`, because `frontend-design` is sufficient for this single utility surface and no wider brand system is changing.

## Reuse Analysis

The automated scan found no existing components, hooks, utilities or variants for a browser interface. Existing source modules remain the reference for text contracts and measures, but importing Node-oriented modules directly into a file-openable page would break the no-build, no-install requirement.

### Reuse decisions

- Use the protected-value categories and overlap definitions from `src/invariants.js` and `src/validators.js`.
- Use plain JavaScript, native form controls and the repository's zero-dependency rule.
- Do not reuse provider adapters in the page because Rewrite Room performs no runtime provider call.
- Create a small browser core because no existing browser-safe module or component covers the workflow.

### New files justified

- `docs/index.html`: the public and locally openable route.
- `docs/core.js`: pure browser-safe text preparation and comparison logic, tested from Node.
- `docs/app.js`: DOM state and user actions only.
- `docs/styles.css`: the route's explicit visual and responsive contract.
- `test/browser-workbench.test.js`: contract coverage for the new logic.
- `docs/journey-observatory/2026-08-28/*`: required journey delta and release evidence.

## Opensource scan

| Candidate | Verdict | Reason |
|---|---|---|
| WebLLM | extract pattern, do not adopt as a required dependency | It enables private in-browser inference, but model downloads and WebGPU memory make the first click too heavy for a universal tool. |
| Transformers.js | extract pattern, do not adopt as a required dependency | It is active and Apache-2.0, but useful text generation still introduces model weight and browser support costs. |
| wllama | reject as the default engine | CPU and WASM widen hardware support, but the model download and slower generation still violate the immediate-use promise. |
| Chrome built-in AI | reject as the default engine | It depends on a supported desktop browser, device requirements and model availability outside this repository's control. |

Build decision: create a static meaning and comparison workbench. It gives every browser the product's unique value, protected facts, source separation and overlap evidence, while allowing the reader to choose any non-Anthropic writing system separately.

## UI/UX design pass

- **Skill**: `frontend-design`. Editorial worktable, cream paper, near-black ink, vermilion actions and blue technical annotations. No gradients and no generic dashboard cards.
- **Hierarchy**: one focal action at a time: paste, seal the source, build the brief, draft elsewhere or by hand, then compare.
- **Primitives**: semantic HTML, fieldsets, textareas, buttons, lists, progress text and native download/copy behavior.
- **Action copy**: actions describe the reader's result, such as “Seal the source” and “Copy the clean-room prompt”.
- **Source provenance**: research and method links point to repository SSOT files; no status is inferred from missing data.
- **Completeness**: desktop and mobile; empty, ready, sealed, copied, compared, warning and reset states.
- **Asset authenticity**: no decorative stock assets. The visual metaphor is made from CSS folders, stamps and paper edges.
- **Media contract**: no media dependency.
- **Visual intent**: a private editor's desk with a visible “stays in this browser” trust marker.
- **Semantic visuals**: two envelopes represent facts and voice; the sealed source represents clean-room separation; the comparison sheet represents evidence without certification.
- **States**: visible hover and focus, empty instructions, inline validation, live status and recoverable reset.
- **Responsive**: one column below 760 px, no horizontal workflow dependency, 44 px primary targets.
- **Accessibility**: WCAG 2.2 AA contrast target, labels for every control, one H1, ordered headings, keyboard-only completion, status live region and reduced-motion support.
- **Browser evidence**: local file route and served route at desktop and mobile widths, including no-source, sealed-source and comparison results.
- **Spatial economy**: each step uses only the height its content needs; no decorative empty viewport panels.

## Journey contract before build

Primary persona: a skeptical, non-technical reader with a Claude-assisted text, limited patience and a privacy concern.

Task in their words: “I want a genuinely new version of this text without installing something or sending it to another mystery service, and I cannot afford to lose the facts.”

Critical path:

1. Arrive from README or direct URL and understand in one screen what the tool does and does not promise.
2. Paste source text and see protected values before any destructive or external action.
3. Seal the source and keep a concise meaning brief visible instead.
4. Draft manually or copy a source-free prompt to a non-Anthropic system.
5. Paste the candidate and receive plain-language checks with no certification claim.
6. Export, revise, reset or leave with all text still local.

Recovery paths: empty input, accidental sealing, missing protected facts, excessive phrase survival, clipboard failure and interrupted return.

## Architecture delta

Add a Browser Workbench organ to the Interface system. Its browser-safe core accepts text only and returns deterministic local preparation and comparison data. The DOM layer may call the core but not duplicate analysis logic. It never calls a provider, never persists source text by default and never emits a private-detector verdict.

New contracts:

- C7 browser input to preparation: source string to meaning card and protected values; empty input fails visibly; source remains local.
- C8 candidate to browser evaluation: candidate string plus sealed source to checks and warnings; missing protected values remain visible.
- C9 browser interface to user-controlled export: brief or prompt to clipboard or download; no automatic submission.

## Verification

- `npm run check`
- Node tests for every browser-core function and edge case.
- HTML and public prose checks, including the no-em-dash rule.
- Keyboard-only completion and screen-reader structure inspection.
- Browser smoke from local file and local HTTP route at desktop and mobile widths.
- Journey Observatory validator with zero unresolved critical findings before a public READY claim.
- Website targeted tests, TypeScript, production build and guide accessibility smoke.
- Git diff review proving the English website body is unchanged except for required parity.

## Out of scope

- Bundling an in-browser language model, because the large download and device requirements would break the universal first-use promise.
- Calling any Anthropic transformation service, because the approved provider boundary excludes it.
- Claiming certified watermark removal, because the private detector and thresholds are unavailable.
- Submitting text to schools, employers or publishers, because the reader remains responsible for final use.

## Rollback

The static page is isolated under `docs/` and can be removed without changing the CLI. Documentation links can return to the manual route. The website rewrite is a separate branch and commit. No schema, credential, paid API or stored user data is introduced.

## Bootstrap receipt

- Root SHA: `7acf0548fa42add13995d8ef448f15ba4fb5fff6`
- Dirty set before work: clean
- AGENTS hash: `29eae2d1b6646551126351a5611d115159de076738dd363ac95efdf6b792b32b`
- Stage contract: this file plus `ARCHITECTURE.md`
- Skill chain: bootstrap, architecture, problem attack, open-source scan, narrative, style clone, frontend design, journey, accessibility, smoke, pre-commit audit
