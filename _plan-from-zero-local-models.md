# From-zero rebuild plan

Task class: large, multi-surface product and documentation rebuild.

Goal: make every admitted route understandable and usable by a reader who knows nothing about prompt builders, local models, terminals, JSON files or watermark research. The repository, Rewrite Room and both website guides must describe the same product, make the same claims and lead to the same next action.

## Reader contract

Every practical route must answer these questions before asking the reader to act:

1. What problem does this route solve?
2. Who should use it and who should skip it?
3. What does the reader need before starting?
4. What exactly goes in?
5. What exactly happens?
6. What comes out?
7. Where does that output go next?
8. What does the route cost in time, money, privacy and setup?
9. What can the result prove, and what can it never prove?
10. What should the reader do when a check fails?

Any link that says a topic is explained elsewhere must resolve to the promised explanation. Any named tool, command, file, metric, model or research paper must be defined before the reader needs it.

## Product architecture

- Rewrite Room remains the primary route: source -> local prompt builder -> writer chosen by the reader -> returned draft -> local checks.
- A hosted non-Anthropic model and a local model are two choices for the writer step, not separate removal methods.
- LM Studio is the primary local-model path because it offers a graphical interface.
- Ollama is the lighter terminal-based local-model path.
- The toolkit does not install, call or silently start either local model. It provides exact handoff instructions and an honest hardware and quality boundary.
- The toolkit CLI remains optional. Its value is repeatable file preparation and reports, not better writing.
- Research techniques remain in the research area only. A reader-facing method exists only when it has a useful contract, repeatable evidence and a clear limit.
- No feature may claim to detect or certify Anthropic's private watermark.

## Reuse decisions

- Existing Rewrite Room HTML, CSS, browser core and JavaScript are reused and simplified through progressive disclosure. No framework or backend is added.
- Existing protected-value extraction, prompt construction, restoration and comparison contracts are reused. They are not replaced by an automatic local writer.
- Existing website guide content modules are rewritten in place so canonical URLs, structured data, language alternates and analytics remain stable.
- Existing `GuideConsultationCTA`, `SeoHead`, Markdown renderer and guide quality utilities are reused unchanged unless a failing contract test requires a narrow extension.
- Existing prompt and agent-skill files are retained only after the same from-zero audit.
- No new component, hook, utility or edge function is planned.

## Work sequence

- [x] Inventory broken promises, undefined terms, missing input/output handoffs, stale links and research presented as reader action.
- [x] Verify current official Anthropic, LM Studio, Ollama and Google Search documentation.
- [x] Record the current Italian and English search-result battlefield and the information competitors leave unanswered.
- [x] Define one route map with a normal path and clearly optional controls.
- [x] Add a native English and Italian local-writer guide with graphical LM Studio and terminal Ollama instructions from download to returned draft.
- [x] Rewrite the CLI route around one concrete example, naming every file, command, output, purpose and next step.
- [x] Rewrite README, start-here pages, method comparison, walkthroughs, prompt and skill entry points against the reader contract.
- [x] Rework Rewrite Room so the writer handoff explains hosted and local choices exactly where the prompt is copied.
- [x] Rewrite the Italian website guide in Danilo's native voice and align the English guide independently.
- [x] Improve mobile navigation across the guides landing, individual guide and toolkit handoffs so a reader always knows where they are, what comes next and how to return to the route map.
- [x] Add regression tests for closed-loop instructions, resolved promises, tool-versus-writer wording, local-model coverage and forbidden inflated claims.
- [x] Extend the central guide-writing contract only with reusable rules that are not already present, so the monthly guide radar consumes them automatically.
- [x] Run functional, prose, link, SEO, accessibility, desktop, mobile, journey and adversarial checks.
- [x] Create the downstream delta receipt and pre-release evidence.
- [ ] Commit both repositories, open pull requests, merge, deploy through Lovable and verify public URLs against merged source.

## Mid-flight checkpoint, 2026-08-28

The first implementation block is complete and its 38 tests pass. The audit found a recurring design defect, not one isolated documentation omission: several surfaces named a command, file or research mechanism without first closing the reader's loop from input to useful output. The new method map, local-writer guides and CLI guide now use one shared flow. The next block applies that contract to the public front doors and Rewrite Room before the website guide is rewritten.

## Pre-release checkpoint, 2026-08-28

All public surfaces now use the same four-part loop: prompt builder, writer choice, returned draft and local check. The primary prompt passed its repeatable eight-case local gate, and a separate human reading recorded two limits instead of hiding them: conversational voice can become too formal and rigid technical text may not gain surface independence. A stricter prompt iteration failed every mechanical gate and was reverted.

The mobile audit also caught two failures that source inspection missed. The guides jump bar had sticky styling but lived inside the wrong overflow context, and same-page anchors drifted after content above them settled. Both now have geometry-based browser tests, not presence-only assertions.

## Release gates

- A cold reader can complete the browser route without opening a second documentation page.
- A cold reader can run a local model with LM Studio without encountering an unexplained terminal command.
- A terminal user can run the Ollama and toolkit CLI paths without guessing filenames, file contents or the next destination.
- Every retained route explains why it is worth its friction. Research-only material never masquerades as an action.
- Italian and English have independent prose reviews, no em dash and no inherited-knowledge language.
- All automated tests and public-site build gates pass.
- Desktop and mobile smoke tests show no clipping, horizontal overflow or unreachable primary action.
- Mobile guide journeys provide a persistent or immediately reachable way back to the guide map, readable tap targets and an unambiguous next action without relying on desktop navigation.
- Live GitHub Pages and both website guide URLs match the merged contracts.

## Reversibility

- All work happens on `codex/` branches.
- The existing public releases remain the rollback point until both new releases pass live verification.
- The automatic local writer is not reinstated, so no new runtime provider, credential or data-transfer boundary is introduced.
