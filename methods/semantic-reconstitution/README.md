# Route 5: repeatable local preparation and checks

[Italiano](README.it.md) · [Start from zero](../../start-here/en/README.md#i-want-the-local-cli) · [Compare every route](../../METHODS.md)

> **Best for:** repeated work, local files and machine-readable checks<br>
> **Time:** setup plus a few minutes per text<br>
> **Requires:** Node.js 20 or newer<br>
> **Calls a model:** never

## “Why use a terminal if it does not write?”

Because repetition is where careful manual steps become inconsistent. The CLI protects the same kinds of values, exports the same structured prompt and applies the same mechanical checks every time. If you only have one text, use [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) instead.

The CLI used to include an automatic local candidate batch. Real gpt-oss 20B trials returned JSON instead of prose, copied the brief too closely and sometimes stopped on a valid reviewed brief. The extra setup did not earn better results, so that path was removed.

## Start from a plain-text file

Save the source as `source.txt`, then inspect the exact-value inventory:

```bash
node bin/watermark-toolkit.js prepare source.txt --out case.json
```

Open `case.json`. If an important name or fixed phrase is missing, run the command again with one or more explicit values:

```bash
node bin/watermark-toolkit.js prepare source.txt \
  --protect "Exact Name" \
  --protect "Fixed technical phrase" \
  --out case.json
```

This inventory catches common dates, numbers, currencies, URLs, email addresses, quotations, acronyms and acronym-led names. It cannot understand which ordinary phrase matters to your argument.

## Export the structured prompt

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompt.json
```

Open `prompt.json`, copy the value inside `prompt` and give it to a non-Anthropic writing system. Exact values appear as `[PV-01]` markers. For the higher-effort source-separated pair, add `--clean-room`.

Save the returned text as `candidate.txt`, leaving every PV marker untouched.

## Restore exact values and check one draft

```bash
node bin/watermark-toolkit.js check source.txt candidate.txt
```

The output restores every recognized PV marker in memory and reports protected-value retention, surviving four-word sequences, the longest shared run, repeated sentence openings, length and readability drift. Neither input file is changed.

For two or more drafts:

```bash
node bin/watermark-toolkit.js compare source.txt candidate-a.txt candidate-b.txt --json
```

`compare` shows the same evidence for every candidate. It deliberately returns no automatic winner.

## Read the result without guessing

- `mechanicallyValid: true` means protected values survived and the length stayed inside the broad configured range.
- `semanticStatus: "requires-manual-review"` means exactly what it says.
- Lower `ngramSurvival` means less copied surface, not better prose.
- `missingInvariants` names exact values that disappeared.
- `recommended` remains empty because surface measures cannot choose your voice.

## Contract, test and limit

**Contract:** prepare prompts and inspect returned drafts without model calls, uploads or source modification.

**Repeatable test:** the suite covers English and Italian values, nesting, exact character restoration, long inputs, overwrite attempts, prompt boundaries and semantic inversions that surface metrics cannot catch.

**Limit:** the CLI does not write, approve meaning or reproduce Anthropic's detector. You still choose the external model, verify every claim and make the final editorial decision.
