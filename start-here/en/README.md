# Start from zero

You have a Claude-assisted draft. The ideas and facts are yours, but you want new wording that does not depend on Claude's sentences.

You do not need to understand watermarks, code or command lines. Start with the four boxes below.

> **Your text** → **Rewrite Room builds a prompt** → **a different model writes** → **Rewrite Room checks the returned draft**

That distinction matters. Rewrite Room is a prompt builder and checker. It is not an AI writer. The model you choose in the middle does the writing.

[Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) · [Italian version](../it/README.md) · [Back to the main page](../../README.md)

## The easiest route

### 1. Paste your text

Open [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) and paste the draft.

Nothing is uploaded at this point. The page runs inside your browser, costs nothing and uses no AI credits. It finds dates, names, numbers, links and quotations that should not change. You can add anything it misses.

### 2. Copy the prompt it builds

Select **Prepare my rewrite prompt**, then **Copy the entire prompt**.

The prompt asks for a real reconstruction, not a few synonym swaps. It tells the writing model to preserve claims, qualifications and voice while changing the ordinary wording and sentence structure.

### 3. Choose where the writing happens

You now need a **writer**: the software that receives the prompt and produces the new draft. Pick one of these.

#### Fastest: a hosted non-Anthropic model

Open a model made by a company other than Anthropic, paste the prompt and send it. No installation is needed. The provider receives what you paste and may use its free plan, subscription or credits. It may also apply its own provenance system.

#### Most private: a model on your computer

“Local model” simply means that the writing software runs on your own computer instead of a provider's server.

- **LM Studio** is the easiest graphical route. Download the app, download a model inside it, open a chat and paste the prompt.
- **Ollama** is the lighter terminal route. Install it, run one command to open a model, then paste the prompt.

After the one-time model download, both can write without hosted AI credits. Your computer still needs enough memory, and a small local model may write worse than a strong hosted one. Follow the [local-model guide from download to returned draft](../../methods/local-model/README.md).

### 4. Bring the new draft back

Copy the writer's answer. Return to Rewrite Room, paste it under **Paste the model's new draft here**, then select **Restore exact values and check**.

The page gives you two useful outputs:

1. the returned draft with protected dates, names, links and numbers restored;
2. a report showing missing exact values and wording that still looks too close to the source.

Read the restored draft for meaning and voice. The report cannot do that for you, and it cannot certify a result against Anthropic's private detector.

## “Wouldn't it be easier to rewrite it myself?”

For a short text, yes. Duh.

This guide includes every useful route, including the obvious one:

1. Write the claims, facts and exact values as short notes.
2. Close the source.
3. Put the claims in the order your reader needs.
4. Write from the notes.
5. Reopen the source only to check facts and missing nuance.

It costs time, sends nothing anywhere and avoids adding another model. [See the full manual method](../../methods/human-redraft/README.md).

## Want the strongest wording separation?

Use the **source-free** option inside Rewrite Room. You first make a short brief containing meaning, facts, audience and voice. The writing model receives that brief, not the source wording.

This takes longer because you must check the brief before writing. It is useful when separation matters more than speed. The standalone version is the [two-envelope clean-room method](../../methods/two-envelope-clean-room/README.md).

## Want a reusable agent instruction?

The [ready-made skill](../../skills/non-anthropic-text-rewrite/SKILL.md) is for people who already use coding agents or agent workspaces. Copy the skill into that system and give it a text. The skill tells the agent how to protect facts, keep the source away from the writing pass and stop when meaning cannot be verified.

If “skill” means nothing to you, skip it. Rewrite Room gives you the same practical route without agent setup.

## The local CLI, in plain English

CLI means **command-line interface**. In this repository it is a small optional program that you control by typing commands in Terminal or PowerShell.

It does not find secret watermark positions. It does not write. It is useful only when you want to repeat the same preparation and check on files, or keep a report for later.

The complete loop is:

> `source.txt` → CLI creates `prompt.txt` → your writer creates `draft.txt` → CLI checks `draft.txt`

### What are those files?

- `source.txt` is a plain text file you create. Paste the original draft into it.
- `prompt.txt` is created by the CLI. Open it and copy everything into your chosen writer.
- `draft.txt` is another plain text file you create. Paste the writer's answer into it.

### What do the commands do?

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompt.txt
```

Reads `source.txt` and creates the prompt you will give to the writer.

```bash
node bin/watermark-toolkit.js check source.txt draft.txt
```

Reads both files, restores protected values in the returned draft and prints a local comparison. It does not modify either file.

`prepare` is optional. It only shows the names, dates, numbers and quotations the toolkit plans to protect. `compare` is optional too. It shows the same checks side by side when you already have two or more drafts. It never chooses one for you.

If that sounds useful, follow the [CLI guide from download to final text](../../methods/semantic-reconstitution/README.md). If it sounds like extra work, it is. Use Rewrite Room instead.

## What no route can promise

Anthropic's detector, private key and decision threshold are not public. This means the toolkit can help you rebuild wording, preserve facts and inspect visible overlap. It cannot display a truthful “watermark removed” badge.

Before using the result, check every claim, uncertainty and quotation. Keep your draft history when authorship may be challenged.

[Compare the admitted routes](../../METHODS.md) · [See one complete example](../../examples/walkthrough.md) · [Read the evidence ledger](../../CLAIMS.md)
