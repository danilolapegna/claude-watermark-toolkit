---
name: non-anthropic-text-rewrite
description: Reconstruct AI-assisted text from facts and intent without using Anthropic systems. Protect exact values, separate research from drafting, generate independent candidates and report quality trade-offs.
---

# Non-Anthropic text reconstruction

Use this skill when a person owns the ideas and wants a fresh version that does not inherit the source wording.

## Boundaries

- Do not call an Anthropic endpoint or Claude model.
- Do not overwrite the source.
- Do not promise success against a private detector.
- Do not automate submission to an institution or platform.
- Keep facts, quotes, URLs, names, numbers and dates exact.

## Workflow

1. Read the source once as a research editor.
2. Extract purpose, audience, atomic claims, evidence, qualifications, constraints and voice notes.
3. Create a protected-value list.
4. Validate the brief against the source.
5. Start a clean drafting context that receives the brief but not the source.
6. Produce at least two structures.
7. Reject any candidate that loses a protected value or adds a claim.
8. Compare surviving source phrases, length and readability.
9. Present the non-dominated candidates with reasons.
10. Ask the author to choose and edit the final language.

## Output

Return:

- the checked reconstruction brief;
- protected values;
- two or more candidate drafts;
- a fact-retention result for each;
- visible pros and cons;
- one recommended draft with the reason;
- an explicit statement that human review is still required.

## Failure handling

If the source contains a name or value that cannot be classified, protect it. If the brief loses a qualification, stop before drafting. If every candidate fails, return the reasons and repair the brief instead of generating more text.

