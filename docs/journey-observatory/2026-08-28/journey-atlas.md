# Journey Atlas: Rewrite Room

## Evidence inventory

| Evidence | Type | Source | Limitation |
|---|---|---|---|
| EV-001 | EXPLICIT_USER_STATEMENT | Danilo's request, 2026-08-28 | Establishes desired experience, not runtime behavior |
| EV-002 | PRODUCT_CONTRACT | `_plan-rewrite-room.md` | Intended behavior only |
| EV-003 | PRODUCT_CONTRACT | `ARCHITECTURE.md` before browser delta | Current system has no browser interface |
| EV-004 | OBSERVED_RUNTIME | Local browser at `http://127.0.0.1:4173`, live smoke and deep-smoke evidence | Local pre-release runtime, not yet the public Pages URL |

## Journey universe

Dimensions: first-time reader or returning reader, goal mode or exploration mode, desktop or mobile, empty or valid source, manual or external non-Anthropic drafting, valid or fact-losing candidate, success or recovery.

Merge rule: desktop and mobile share a journey only where actions, order and outcome stay identical. Manual and external drafting share preparation but split at prompt export. Candidate warnings are a recovery branch of comparison, not a separate product goal.

## Coverage ledger

| Combination or family | Status | Journey IDs | Evidence | Unknown or exclusion rationale |
|---|---|---|---|---|
| First-time reader completes a local clean-room rewrite | OBSERVED | J-001 | EV-001, EV-002, EV-004 | Public deployment pending |
| First-time reader learns which route fits | OBSERVED | J-002 | EV-001, EV-002, EV-004 | Method ladder and opening observed |
| Empty source and accidental sealing | OBSERVED | J-003 | EV-002, EV-004 | Empty error, unseal and confirmed reset observed |
| Candidate loses facts or keeps too much wording | OBSERVED | J-004 | EV-002, EV-004 | Missing date and overlap signals observed |
| Returning after browser close | OUT_OF_SCOPE | none | EV-002 | No persistence by design, because source privacy outranks resume state |
| Provider generation inside the page | OUT_OF_SCOPE | none | EV-002 | No provider call by design |

## Journey index

| Journey ID | Persona or role | Intent | Entry or state | Outcome | Criticality | Runtime status |
|---|---|---|---|---|---|---|
| J-001 | Skeptical non-technical writer | Rebuild owned text without installation | Direct link, source ready | Checked new draft | critical | observed locally |
| J-002 | Curious first-time reader | Understand available effort and privacy choices | README or direct link | Chooses a route | high | observed locally |
| J-003 | Hurried writer | Recover from missing or accidental input | Empty or sealed state | Continues without losing control | high | observed locally |
| J-004 | Careful writer | Repair a draft with lost facts or excess overlap | Candidate entered | Actionable warnings and revision | critical | observed locally |

## Journey maps

### J-001

Entry and boundary explanation → paste source → inspect protected values → seal source → edit meaning card → draft manually or export prompt → paste candidate → compare → revise or export → safe exit.

### J-002

Entry → understand local privacy and no-guarantee boundary → scan method ladder → compare effort, privacy and strength → choose Rewrite Room or another linked route.

### J-003

Empty entry → attempt to continue → visible instruction → paste source → continue. Sealed entry → choose unseal/reset → confirmation in ordinary language → return to editable source.

### J-004

Paste candidate → protected-value and overlap checks → warning names the problem → return to candidate or brief → revise → compare again → visible improvement without certification language.

## Novice exploration log

### NX-001: First-time writer tries to obtain a new version

Journeys: J-001, J-003
Mode: goal, recovery, repeat
Persona state: non-technical, privacy-conscious, 15-minute attention budget, skeptical of detector claims
Frozen task: “I want a genuinely new version of this text without installing something or sending it to another mystery service, and I cannot afford to lose the facts.”
Contamination: route is prospective; confidence reduced until runtime observation
Initial mental model: a page may ask for text and return a rewritten version
Top scent predictions: 1) a paste box, 2) a clear local-processing statement, 3) one obvious continue action

| Attempt | Cue and hypothesis | Action | Expected | Actual | Model update or next move | Evidence |
|---|---|---|---|---|---|---|
| NX-001-A01 | The local-processing promise should explain trust before input | Read the opening | Understand storage and guarantee boundaries | Intended only | Proceed if boundary is credible | EV-002 |
| NX-001-A02 | The main text area should start the task | Paste a source | Protected facts appear without upload | Intended only | Check the list, then seal | EV-002 |
| NX-001-A03 | A warning should recover an empty attempt | Continue with no source | Plain instruction and preserved state | Intended only | Paste source and retry | EV-002 |

Working-memory ledger: the source purpose and voice should move into visible fields before the source is hidden; protected values remain visible through comparison.
Friction tags: F-TRUST, F-COGNITIVE, F-ACCESS.
Comfort hypothesis: cautious but in control if local processing and reset remain visible. This is an inference.
Pleasure or harmony hypothesis: an editorial worktable may feel more human than a detector dashboard. This is an inference.
Recovery or exit: specified, not observed.
Learnability delta: repeat comparison should require fewer instructions; unknown before runtime.
Outcome: unknown.
Findings: none before runtime.
Human evidence needed: observe whether first-time readers understand why sealing the source helps.

### NX-002: Curious reader decides whether this is worth using

Journeys: J-002, J-004
Mode: exploration, goal
Persona state: understands AI writing, not watermark mechanics, wants a quick answer before investing effort
Frozen task: “Show me every sensible way to handle this and tell me which one is worth my time.”
Contamination: route is prospective; confidence reduced until runtime observation
Initial mental model: there may be one magic removal button or a long technical essay
Top scent predictions: 1) a comparison table, 2) a recommended default, 3) honest limitations

| Attempt | Cue and hypothesis | Action | Expected | Actual | Model update or next move | Evidence |
|---|---|---|---|---|---|---|
| NX-002-A01 | A method ladder should expose cost and strength | Scan the ladder | See obvious and advanced routes together | Intended only | Choose based on privacy and effort | EV-002 |
| NX-002-A02 | Comparison warnings should explain trade-offs | Inspect a candidate result | Learn what to repair without a magic score | Intended only | Revise or use another method | EV-002 |

Working-memory ledger: each method keeps effort, privacy, strength and main weakness in the same row.
Friction tags: F-DECISIONAL, F-TRUST.
Comfort hypothesis: plain anticipation of “this sounds obvious” should reduce suspicion that the guide is padding its list. This is an inference.
Pleasure or harmony hypothesis: a complete ladder with one recommended start may balance exploration and action. This is an inference.
Recovery or exit: every route links back to the ladder.
Learnability delta: unknown before runtime.
Outcome: unknown.
Findings: none before runtime.
Human evidence needed: ask which method labels feel concrete without their explanation.

## Step-by-step observations

### J-001-S01: Understand the promise

Persona or context: first-time skeptical writer.
Purpose or question: “Will this upload my text or pretend to certify it?”
Evidence: OBSERVED_RUNTIME EV-004.

| Dimension | Rating | Confidence | Rationale |
|---|---:|---|---|
| Purpose | 4 | high | The opening states no account, upload or installation and rejects certification. |
| Agency or next action | 4 | high | Source entry and one preparation action dominate the first step. |
| Feedback or trust | 4 | high | The trust strip and local network observation make the boundary visible. |

Friction tags: F-TRUST.
Next-state contract: boundary understood → source entry; doubt → read limits or leave safely.
Finding: none before runtime.

### J-001-S02: Seal the source and build the brief

Persona or context: first-time writer with valid source.
Purpose or question: “How do I keep facts while stopping the old wording from steering me?”
Evidence: OBSERVED_RUNTIME EV-004.

| Dimension | Rating | Confidence | Rationale |
|---|---:|---|---|
| Contextual continuity | 4 | high | Protected values remain visible while meaning and voice are completed. |
| Cognitive load | 3 | medium | The two envelopes are explicit, though the author must still supply real voice notes. |
| Recovery | 4 | high | Unseal restores the source and reset requires a deliberate second click. |

Friction tags: F-COGNITIVE, F-NAVIGATIONAL.
Next-state contract: checked brief → manual draft or prompt export.
Finding: none before runtime.

### J-004-S01: Understand the comparison

Persona or context: careful writer with a candidate draft.
Purpose or question: “Did I preserve the facts and change enough of the wording?”
Evidence: OBSERVED_RUNTIME EV-004.

| Dimension | Rating | Confidence | Rationale |
|---|---:|---|---|
| Clarity | 4 | high | Six named checks stay separate and explain what each result means. |
| Feedback or trust | 4 | high | A missing protected date is named without a private-detector verdict. |
| Recovery | 4 | high | The writer can revise, unseal or safely clear the session. |

Friction tags: F-TRUST, F-COGNITIVE.
Next-state contract: warnings → revise; checks clear → human fact and voice review.
Finding: none before runtime.

## Cross-journey patterns

The same interface must keep privacy, no-guarantee wording and user responsibility stable from entry through comparison. Protected values externalize memory across the whole critical path. The largest prospective risk is presenting a local similarity report as if it were Anthropic detection.

## Unknowns

- Whether first-time readers prefer “seal the source” over another metaphor still requires user research.
- Whether the method-ladder labels produce the fastest correct choice still requires user research.
- Public-host behavior remains pending until GitHub Pages deployment.
