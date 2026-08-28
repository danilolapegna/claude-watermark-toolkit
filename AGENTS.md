# Claude Watermark Toolkit project context

Status: public open-source release in active development.

## What this repository is

A local-first toolkit and bilingual guide for reconstructing AI-assisted text in the author's own voice. The runtime never uses Anthropic endpoints, Claude models or Anthropic SDKs. Anthropic material may appear only as a cited research source.

## Stack

- Node.js 20 or newer
- ECMAScript modules
- No required runtime dependencies
- `node:test` for tests

## Commands

```bash
npm test
npm run check:prose
npm run check
```

## Sources of truth

- `ARCHITECTURE.md` owns module boundaries and contracts.
- `CLAIMS.md` owns research claim status.
- `STATUS.md` owns implementation status.
- `EXECUTION-PLAN.md` owns the public end-to-end sequence and release receipts.
- `scripts/check-prose.mjs` owns the public writing gate.

## Hard rules

1. Never overwrite a user's source text.
2. Do not add automatic model calls. Prompt execution stays under the reader's control.
3. Do not describe a public SynthID implementation as Anthropic's private detector.
4. Protected facts fail closed before any style or overlap score is considered.
5. English and Italian public writing must be native, direct and free of stock AI prose.
6. Do not use em dashes in public prose.
7. Do not add a runtime package when the standard library keeps the contract clear.
8. Every public route must start from the reader's situation. Before jargon or research, say who the route is for, what to open or copy, what happens next, what result to expect and when to stop.
9. Research names are never practical instructions by implication. If a prototype was removed, explain its lesson in the research area and state plainly that the reader does not need to use it.

## Scopes

No application, database, authentication, payment or hosted-service scope applies. This is a self-contained public CLI and documentation repository.
