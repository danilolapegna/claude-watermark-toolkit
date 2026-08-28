# Route 2: the two-envelope clean room

[Italiano](README.it.md) · [Compare every route](../../METHODS.md) · [Use the guided version](https://danilolapegna.github.io/claude-watermark-toolkit/)

> **Best for:** strong wording separation without installing the CLI<br>
> **Time:** roughly 15 to 40 minutes<br>
> **Difficulty:** patient, not technical<br>
> **Text sent elsewhere:** only if you choose an external writer or model

## “Two envelopes? This already sounds like office theatre.”

Fair. They can be two notes on a blank page. The name exists to enforce one useful separation:

- Envelope 1 protects **what must stay true**.
- Envelope 2 describes **how you actually sound**.

The old sentences go into neither. Once both envelopes are checked, the source is closed and the new draft is written from the envelopes only.

## Choose this over the quick prompt when

- the source is sensitive and the writing context should not see it;
- a first paraphrase remained much too close;
- your voice matters enough to describe explicitly;
- you can spend ten extra minutes checking the brief.

If you just want the shortest serious route, use the default quick prompt in [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/). This is the slower option with a cleaner source boundary.

## Step 1: build Envelope 1

Copy this template and fill it with short notes:

```text
ENVELOPE 1: FACTS AND MEANING

Purpose:
What should the reader understand or do?

Audience:
Who is reading, and what do they already know?

Claims:
- One atomic claim per line

Evidence and qualifications:
- Examples, causes, comparisons, uncertainty, exceptions

Protected values:
- Names, numbers, dates, URLs, citations, direct quotations

Format:
- Approximate length, sections, required output
```

Do not copy whole sentences unless the wording must remain exact. If one claim contains “and”, check whether it should be two claims.

## Step 2: build Envelope 2

“Write in my style” is not an instruction. Give the writer actions they can follow:

```text
ENVELOPE 2: VOICE

Sentence rhythm:
- Short, long, mixed, crowded, abrupt?

Register:
- Formal, conversational, technical, blunt?

Habits to keep:
- Connectors, asides, questions, degree of uncertainty

Habits to avoid:
- Words, openings, clichés and formatting I would never use

Real samples:
- Two short passages written by me, if privacy allows
```

“Natural, professional and engaging” will produce generic prose because it could describe almost anything. “Short openings, longer second sentences, say uncertainty directly, never say ‘unlock’” gives the writer something real.

## Step 3: verify both envelopes

Reopen the source and check one item at a time:

1. Every claim has a matching note.
2. Every qualification and exception survived.
3. Protected values are exact.
4. Nothing in the envelopes was invented.
5. Voice samples are yours, not copied from the source being rebuilt.

Do not draft yet. Fix the envelopes first.

## Step 4: seal the source

Close the source. A human writer or non-Anthropic system receives both envelopes, never the source wording.

For an external model, start a completely new conversation and paste only the checked envelopes with this instruction:

```text
Write a new draft from these checked envelopes. Preserve every protected value and every qualification. Choose fresh sentence construction and paragraph transitions. Do not add facts. Return the draft only.
```

The model may use credits and will receive every sensitive fact inside the envelopes. For confidential work, use a local non-Anthropic model or a human under an appropriate confidentiality agreement.

## Step 5: check the new draft

Compare meaning before wording:

- claims and qualifications;
- protected values;
- unsupported additions;
- intended audience and action;
- voice notes.

Then check whether long source phrases or the same paragraph skeleton survived. Rewrite whole passages, not isolated synonyms.

## If something goes wrong

| Problem | Likely cause | Recovery |
|---|---|---|
| The draft is accurate but generic | Envelope 2 contains adjectives, not behaviors | Add concrete rhythm, connector and forbidden-word notes |
| A qualification disappeared | Envelope 1 merged it into a larger claim | Give the qualification its own line |
| The new draft still resembles the source | The envelopes contain polished source sentences | Reduce them to atomic notes and start a new context |
| The model invents useful-sounding details | The instruction rewarded completeness | Delete the additions and strengthen “do not add facts” |

## Stop rule

Stop and repair the envelopes if two drafts repeat the same factual or tonal problem. More generations from a broken brief only make the error look more fluent.

The browser version lives inside Rewrite Room under **Want more separation?**. It protects values and compares the final draft locally, while still leaving the external writing choice to you.
