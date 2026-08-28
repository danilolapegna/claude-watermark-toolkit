# Five routes worth your time

[Italiano](METHODS.it.md) · [Start from zero](start-here/en/README.md) · [Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/)

A giant toolkit can look impressive while quietly handing you ten versions of the same weak idea. This one used to be guilty of that. The list is shorter now.

Every route below has to answer four questions:

1. What useful result will I get?
2. How can I repeat or check it?
3. Where does it stop being trustworthy?
4. Is the effort sensible for my situation?

If a feature cannot answer all four, it does not get a route number.

## Choose in thirty seconds

| Your situation | Use this | Time | What you actually get |
|---|---|---:|---|
| Assistance is allowed and disclosure solves the issue | Leave the text alone or disclose | none | no needless rewrite |
| Short or private text | [Human redraft](methods/human-redraft/README.md) | 10 to 60 min | a new draft written from your own fact sheet |
| You want the easiest serious route | [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) | 2 to 5 min plus model time | a guided prompt builder and a local surface report |
| Wording separation matters more than speed | [Source-separated clean room](methods/two-envelope-clean-room/README.md) | 15 to 40 min | a checked brief that the writing context receives without the source |
| You want another non-Anthropic system to do the writing | [Two-conversation workflow](methods/independent-draft/README.md) | 10 to 30 min | a research brief plus one or more independent drafts |
| You repeat this work or need local files and JSON | [Local CLI](methods/semantic-reconstitution/README.md) | setup plus a few minutes | prompt export, exact-value restoration and mechanical reports |
| The text is high-stakes and you have a budget | Human editor from the checked brief | paid time | editorial judgment and accountable review |

For most people, Rewrite Room is the right first stop. For confidential or high-stakes work, use the manual or source-separated route. The terminal is not a quality upgrade. It is a repeatability upgrade.

## 0. Leave it alone or disclose

“I came here to change the text and your first method is to do nothing?” Yes, because this guide is here to solve your problem, not to manufacture work for its own tools.

If the relevant policy clearly allows assisted writing and asks only for disclosure, disclose. A rewrite adds cost and creates new opportunities for factual drift.

**Contract:** the policy concern is resolved without altering sound prose.

**Check:** read the actual policy, identify what must be disclosed and keep a copy.

**Limit:** this does not help when an institution treats detectable assistance itself as misconduct or uses a private detector as automatic proof. That is a governance problem, not a punctuation problem.

## 1. Rewrite it yourself from a fact sheet

“So the premium advice is: write it yourself. Duh.” Correct. It stays because it is free, private and unusually strong for a short text. The method is the separation, not the keyboard.

1. Extract the purpose, atomic claims, evidence, qualifications and exact values.
2. Close the source.
3. Choose the order your reader needs.
4. Draft from your understanding.
5. Reopen the source only to verify meaning and facts.

**Contract:** the new draft is built from a checked fact sheet, not by swapping words in visible source sentences.

**Repeatable check:** the guide includes a worksheet, a claim-by-claim audit and a stop rule.

**Limit:** if you keep peeking at the source, its structure tends to survive. Long or highly technical texts make the fact sheet expensive.

[Follow the full human method](methods/human-redraft/README.md).

## 2. Use Rewrite Room

“So it is a prompt builder?” Exactly. A simple, direct one with protected-value masking and local checks. It saves you from inventing the procedure and makes the weak points visible. It does not write.

The default journey is four actions:

1. Paste your text.
2. Copy the prepared rewrite prompt.
3. Run it in a non-Anthropic model.
4. Paste the draft back for local checks.

The prompt tells the writing model to build an internal fidelity ledger, preserve claims and qualifications, protect exact values, reconstruct ordinary sentence sequences and audit the draft before returning it. The page itself calls no model and uses no AI credits.

**Contract:** build one copyable prompt, restore surviving protected markers and report exact values, longest shared phrase, phrase survival, repeated openings, structure and length. The external model writes the draft.

**Repeatable check:** browser-core tests cover protected-value extraction, exact matching, prompt boundaries and adversarial comparison cases. The static build check rejects remote CSS and missing local assets.

**Limit:** the report reads surface properties, not meaning. It cannot certify Anthropic's private detector. The external model may charge or use its own provenance mechanism.

[Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/).

## 3. Use the source-separated clean room

“Two envelopes sounds theatrical.” It is just an easy way to stop facts and voice from collapsing into one vague summary.

- Envelope 1 contains purpose, reader, atomic claims, evidence, qualifications and protected values.
- Envelope 2 contains concrete voice behavior, format and limits.

The drafting person or model receives the envelopes, never the original sentences.

**Contract:** source wording is present during research, absent during drafting, while every protected value and claim has a place in the brief.

**Repeatable check:** compare the brief against the source before drafting, then map every brief item to the draft. The copyable prompts use explicit inert-data boundaries and a fixed JSON schema.

**Limit:** a bad brief produces an independently worded bad draft. Two messages in the same conversation are not isolated contexts. Provider-wide memory can also defeat the separation.

[Build the two envelopes](methods/two-envelope-clean-room/README.md) or [run them in another system](methods/independent-draft/README.md).

## 4. Prepare and check locally with the CLI

“Does the terminal make this smarter?” No. It makes the tested parts repeatable over long files and several candidates.

The CLI can:

- inventory exact values without modifying the source;
- export either the primary prompt or the advanced source-separated pair;
- restore protected placeholders after a model returns a draft;
- show mechanical failures and compare several drafts without choosing a winner for you.

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompt.json
node bin/watermark-toolkit.js check source.txt candidate.txt
```

**Contract:** the CLI prepares or measures. It never calls a writing model. `check` restores placeholders and returns a mechanical report that remains marked `requires-manual-review`.

**Repeatable check:** automated tests cover source-overwrite protection, prompt isolation, exact values, Unicode, long inputs and adversarial semantic inversions.

**Limit:** the CLI does not write. You still need a non-Anthropic model or a person, and you must verify every claim before choosing.

[Use the local route from zero](methods/semantic-reconstitution/README.md).

## What each command is for

These commands are not souvenirs. Each has one narrow job.

| Command | Useful contract | What its test proves | What it never claims |
|---|---|---|---|
| `prepare` | inventory exact values and case metadata | common EN/IT formats, nesting, exactness, long input and no source overwrite | that every important idea was extracted |
| `prompt` | export the primary prompt; add `--clean-room` for the two-context pair | source boundaries, inert-data instructions and no source wording in drafting pass | that the receiving model will obey perfectly |
| `check` | restore PV markers and inspect exactly one candidate | exact restoration, missing values, phrase survival, openings and length | semantic fidelity or detector success |
| `compare` | restore PV markers and show the same evidence for at least two candidates | no silent winner, visible failures, bounded metrics | which draft sounds like you |

The removed `targets` command failed this standard. Its lexical proxy could not identify Claude's private signal positions and could prioritize rare facts. The removed adaptive tournament was not genuinely adaptive. Keeping either would have made the repository look larger and the reader less informed.

## The prompt and the skill

The copyable prompts and agent skill stay because they have public contracts too.

- The [research prompt](prompts/en/research-pass.md) must return a fixed JSON brief or `BRIEF_ERROR`.
- The [drafting prompt](prompts/en/drafting-pass.md) receives only that checked brief and returns a draft or `BRIEF_ERROR`.
- The [agent skill](skills/non-anthropic-text-rewrite/README.md) must stop when it cannot create an isolated context or verify semantic mapping.

Automated contract tests check their required boundaries and outputs. Those tests cannot force every third-party agent to behave. That limit is stated before installation, not buried afterward.

## Shortcuts that did not earn a route

- Light synonym swaps preserve most context and structure.
- Punctuation changes touch too few token choices.
- Unicode cleaners solve an unrelated hygiene problem. Anthropic describes a statistical token pattern, not hidden characters.
- Backtranslation can destroy qualifications and still leave no honest guarantee.
- Random deletion can lower overlap by making the text worse.
- Public SynthID code does not possess Anthropic's private key or detector configuration.

The honest finish is simple: these methods can produce a fact-checked draft with genuinely new wording and visible mechanical evidence. None can issue Anthropic's private verdict. That is a smaller claim than “watermark removed,” and a much more useful product than pretending otherwise.
