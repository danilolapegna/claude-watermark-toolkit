# The optional CLI, explained from zero

[Italiano](README.it.md) · [Start without a terminal](../../start-here/en/README.md) · [Run the writer locally](../local-model/README.md)

> **CLI means:** a tool you run by typing commands in a terminal<br>
> **Use it when:** you repeat this work, use long local files or need a saved report<br>
> **Skip it when:** you have one text and want the simplest route<br>
> **Calls a writing model:** no

## What problem does it solve?

Rewrite Room is easier for one text. The CLI exists for the moment when browser copying becomes repetitive and you want the same preparation and checks every time.

It does not write better. It does not find a watermark. It has two useful jobs:

1. turn a local text file into the same careful prompt used by Rewrite Room;
2. compare the returned draft with the source and restore any protected markers.

Everything else is optional.

## The four files in the normal journey

| File | Who creates it | What is inside | Where it goes next |
|---|---|---|---|
| `source.txt` | you | the original text | the `prompt` and `check` commands read it |
| `prompt.txt` | the CLI | the complete instruction plus the protected source | you paste all of it into a non-Anthropic writer |
| `draft.txt` | you | the writer's answer | the `check` command reads it |
| terminal result | the CLI | restored draft plus a plain-language mechanical report | you read and approve the meaning |

The “writer” can be a hosted non-Anthropic chat, [LM Studio or Ollama on your computer](../local-model/README.md), or a person. The CLI never sends the file to that writer for you.

## Install it from zero

### 1. Download the repository

Open the [GitHub repository](https://github.com/danilolapegna/claude-watermark-toolkit), select **Code**, then **Download ZIP**. Extract the ZIP.

### 2. Open a terminal in that folder

- **Windows:** open the folder, click the File Explorer address bar, type `powershell`, then press Enter.
- **macOS:** open Terminal, type `cd ` with one space, drag the extracted folder into the window, then press Enter.
- **Linux:** right-click inside the folder and choose **Open in Terminal**. The wording depends on the desktop.

### 3. Check Node.js

Run:

```bash
node --version
```

If the result begins with `v20` or a larger number, continue. Otherwise install the current LTS release from [nodejs.org](https://nodejs.org/) and reopen the terminal.

### 4. Check the toolkit

```bash
npm test
```

Continue only when the command reports zero failing tests.

## The normal journey, one command at a time

### Step 1: create `source.txt`

Inside the toolkit folder, create a plain text file called `source.txt`. Paste the original text and save it.

### Step 2: let the CLI explain the journey with your filename

```bash
node bin/watermark-toolkit.js start source.txt
```

This reads the file and prints the next commands. It does not modify anything.

### Step 3: build the prompt file

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompt.txt
```

Open `prompt.txt`. It contains one complete prompt, not code and not a hidden report. Copy the entire file into the non-Anthropic writer you chose.

The CLI temporarily replaces common exact values with markers such as `[PV-01]`. A marker means “keep this slot unchanged; the toolkit will put the exact original value back.”

### Step 4: save the writer's answer

Copy the answer from the writer into a new plain text file called `draft.txt`. Keep any `[PV-XX]` markers untouched.

### Step 5: restore and check

```bash
node bin/watermark-toolkit.js check source.txt draft.txt
```

The terminal prints:

- the checked draft, with recognized markers replaced by their exact source values;
- exact values that are still missing;
- the longest ordinary phrase shared with the source;
- how many four-word sequences survived;
- length and repeated sentence-opening signals;
- a reminder that meaning still needs a human review.

Neither `source.txt` nor `draft.txt` is changed.

## Two optional commands

### `prepare`: inspect protected values before building the prompt

Use this only when the text contains names, legal formulas or technical phrases that must remain exact.

```bash
node bin/watermark-toolkit.js prepare source.txt --json
```

Look inside `invariants`. That internal word means “values the tool will protect.” If an important value is missing, add it explicitly when you build the prompt:

```bash
node bin/watermark-toolkit.js prompt source.txt --protect "Exact Product Name" --out prompt.txt
```

### `compare`: show the same evidence for two drafts

Use this only when you already have two answers, for example `draft-a.txt` and `draft-b.txt`.

```bash
node bin/watermark-toolkit.js compare source.txt draft-a.txt draft-b.txt
```

It does not declare a winner. Surface difference cannot decide whether a draft kept the meaning or sounds like you.

## When to stop using the CLI

Stop and return to the source when a draft loses a claim, negation, qualification or exact value. A lower overlap number never repairs a factual error. If the commands feel like more work than the text deserves, use Rewrite Room or rewrite manually.

## What the CLI can never prove

The report observes the source and draft you supplied. It cannot access Anthropic's private key, detector or threshold. `mechanicallyValid: true` means only that protected values survived and the length stayed within a broad range. It does not mean “watermark removed” or “meaning approved.”
