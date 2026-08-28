# Journey Observatory: Development Handoff

## Execution rule

Implement only evidence-backed product contracts from the approved plan. Do not convert simulated emotion into product fact and do not claim private-detector knowledge.

## Fix order

Both pre-build work packages are implemented and observed in the local runtime. The remaining release action is public-host verification after GitHub Pages deployment.

## Work packages

### JO-001: Make source separation visible and reversible

Status: NO_CHANGE after implementation
Severity: high
Confidence: high
Affected journeys or steps: J-001-S01, J-001-S02, J-003
Persona impact: a reader must understand why the source disappears and must be able to recover without losing it.
Evidence: EV-001, EV-002.
Problem and why: the method depends on drafting from meaning, but a hidden or irreversible transition would feel like data loss.
Target behavior: sealing replaces source wording with an editable meaning card, retains protected values in view and exposes unseal or reset.
Verified surfaces or files: none before build.
Implementation instructions: use one explicit action, keep source only in current memory, never send it, and restore it on unseal.
Dependencies or non-goals: no persistence across browser close.
Acceptance criteria:

- [x] Empty input cannot seal and receives a text instruction.
- [x] Valid input produces protected values and a meaning card.
- [x] Sealing hides the source textarea without deleting the in-memory source.
- [x] Unseal restores the source in the same session.
- [x] Clearing the session requires a second deliberate click.

Verification plan: walk J-001 and J-003 by keyboard on desktop and mobile viewport.

### JO-002: Make comparison useful without becoming a detector

Status: NO_CHANGE after implementation
Severity: high
Confidence: high
Affected journeys or steps: J-004-S01
Persona impact: a reader needs to repair missing facts and obvious wording survival without mistaking the report for certification.
Evidence: EV-001, EV-002.
Problem and why: one unexplained score would recreate the false certainty rejected by the project.
Target behavior: show named checks, plain-language implications and the next useful revision.
Verified surfaces or files: none before build.
Implementation instructions: show protected-value retention, longest phrase, n-gram survival, opening reuse and structure similarity separately. State that these are local comparison signals.
Dependencies or non-goals: no private detector or public SynthID oracle.
Acceptance criteria:

- [x] Missing protected values are listed by exact value.
- [x] Each similarity signal has a human explanation.
- [x] No result says “watermark removed”, “safe” or “passed Anthropic”.
- [x] The reader can edit and compare again without restarting.

Verification plan: run clean, highly overlapping and fact-losing fixtures.

## Experiment and research queue

- USER_RESEARCH_REQUIRED: whether “seal the source” is the clearest metaphor for first-time readers.
- USER_RESEARCH_REQUIRED: which method-ladder label produces the fastest correct choice.

These questions do not block implementation because the visible action and recovery contracts are testable.

## Regression matrix

| Work package | Affected journeys | Adjacent journeys | Required test |
|---|---|---|---|
| JO-001 | J-001, J-003 | J-002 | PASS: empty, valid, seal, unseal, confirmed reset, keyboard and mobile |
| JO-002 | J-004 | J-001 | PASS: unit fixtures plus fact-loss runtime path |
