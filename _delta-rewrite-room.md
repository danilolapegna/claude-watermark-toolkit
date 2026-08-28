# Rewrite Room architecture delta receipt

Date: 2026-08-28
Branch: `codex/rewrite-room`
Baseline: `7acf0548fa42add13995d8ef448f15ba4fb5fff6`

## What changed

The toolkit now has a Browser Workbench organ under `docs/`. `core.js` owns deterministic protected-value extraction, source-free prompt construction and candidate comparison. `app.js` owns browser state, rendering and user actions. The page uses native HTML and CSS and can run from GitHub Pages or from a downloaded folder without a build step.

The documentation surface now exposes ten routes instead of four, including the two-envelope clean room and the independent rewrite chain. README, from-zero guides, limits, status, research boundaries and the copyable agent skill use the same method ladder.

## Contract proof

- C7 input to preparation: empty input fails visibly; valid input produces protected values locally.
- C8 candidate to evaluation: the report names missing values and keeps similarity measures separate.
- C9 user-controlled export: prompt copy and brief download occur only after a user action.
- Privacy boundary: the static gate forbids fetch, XHR, WebSocket, sendBeacon and browser storage.
- Destructive boundary: clearing source, brief and draft requires a second deliberate click.
- Provider boundary: no Anthropic transformation provider was added; the existing fail-closed checks remain.

## Verification receipts

- 19 Node tests passed.
- Static workbench contract passed.
- Public prose and Markdown link gates passed.
- Complete Italian browser journey passed with zero console errors, zero HTTP failures and zero external requests.
- Deep-smoke L2 and L3 passed on desktop and mobile.
- Journey Observatory validator passed with zero unresolved critical findings.
- Scoped WCAG 2.2 AA audit passed; key text contrast ratios range from 6.07:1 to 15.39:1.

## Intentionally unchanged

- The CLI source and provider contracts.
- The absence of a private-detector guarantee.
- The source-preservation rule.
- Runtime dependencies: Rewrite Room adds none.

## Rollback

Remove `docs/` and the Pages workflow, then restore the previous README and method references. The CLI remains operational because the browser workbench is isolated from it. No data, migration, credential or remote service requires rollback.
