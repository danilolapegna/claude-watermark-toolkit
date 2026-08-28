# Start from zero: do not install anything yet

You have a Claude-assisted text. The ideas and facts are yours, but you want a version that no longer depends on Claude's wording.

If you are not technical, this page is for you. Start with the browser route. The terminal comes much later and only if you want it.

[Back to the main page](../../README.md) · [Italian version](../it/README.md) · [See every method](../../METHODS.md)

## The easiest guided route

Open [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/).

Rewrite Room is not an AI writer. It is a simple, direct prompt builder with a local comparison step. The non-Anthropic model you choose does all the writing.

You may be thinking, “I have no idea who hosts that page, where my text goes or what I am supposed to do once it opens.” Fair. Here is the whole journey before you click anything:

1. Paste your source.
2. Select **Prepare my rewrite prompt**.
3. Copy the prompt into a non-Anthropic writing model.
4. Bring the model's draft back and select **Check the new draft**.

The page itself uses no AI and no AI credits. Its JavaScript builds the prompt, protects exact values and compares visible surface properties inside your browser tab. It does not check meaning. The external writing model may use its normal free plan, subscription or credits. If you want to remove even the hosting question, download this repository and open `docs/index.html` while offline.

### Step 1: paste the source

Use text whose ideas and final responsibility are yours. The page finds common exact values such as dates, numbers, URLs, email addresses, quoted phrases and acronyms.

If it misses a name or a term that must remain exact, add it manually. Automatic extraction is a starting list, not an oracle.

### Step 2: prepare and copy the prompt

Select **Prepare my rewrite prompt**. The page produces one complete prompt with the source and protected values already inserted.

This is more rigorous than “paraphrase this.” It asks the other model to preserve claims, qualifications, tone and approximate length while rebuilding ordinary wording, sentence openings and transitions throughout. Copy the whole prompt. Do not copy only the source section.

### Step 3: use a non-Anthropic model

Open the model you prefer, paste the prompt as one message and send it. Another hosted provider may apply its own watermark or provenance system. If you need zero hosted credits and no provider-side watermark, use a local open model. That route needs installation and is explained below.

### Step 4: compare the new draft

Paste the new draft back into Rewrite Room. You will see separate checks for protected facts, shared phrases, sentence openings, structure and length.

If a fact is missing, fix that first. If a long phrase survives, rewrite the whole passage rather than swapping a few words. If the structure remains close, move the claims into a different order.

The page cannot tell you that Anthropic's private detector will accept the result. It tells you what it can actually measure.

### Want stronger separation?

Expand the advanced clean-room section in Rewrite Room. It asks you to prepare two envelopes, one for facts and meaning, one for voice and limits. The writing model then receives those envelopes without the source wording. It takes longer, which is exactly why it is no longer the default route.

## The manual route, if even a form feels unnecessary

Yes, the method can be a blank page.

1. Read the source once.
2. Write short notes for its purpose, claims, evidence and exact values.
3. Add three concrete notes about your voice.
4. Close the source.
5. Choose the order your reader needs, not the order already on the page.
6. Write again.
7. Reopen the source and compare facts only.
8. Read the result aloud and remove sentences you would never say.

This is the full method, not a weaker fallback. Its cost is your time. [See its common failure modes](../../methods/human-redraft/README.md).

## I want another system to write from the brief

Use two separate contexts in a non-Anthropic system. Not two messages in the same conversation.

### Research context

1. Open the [research prompt](../../prompts/en/research-pass.md).
2. Paste it with the source into a non-Anthropic system.
3. Check the resulting brief against the source.
4. Correct missing facts, invented claims and flattened qualifications.

### Writing context

1. Start a completely new conversation.
2. Open the [drafting prompt](../../prompts/en/drafting-pass.md).
3. Paste the checked brief, never the source.
4. Ask for two different claim orders if the first draft still feels too close.
5. Check every fact yourself.

If you already work with agents, copy the [ready-made skill](../../skills/non-anthropic-text-rewrite/SKILL.md). It includes the same provider boundary and stop rules.

## I want the local CLI

If a terminal sounds like unnecessary punishment, stop here and use one of the routes above. The CLI exists for repeated work and machine-readable reports.

### 1. Download the toolkit

The easiest option is GitHub's ZIP download:

1. Open the [repository page](https://github.com/danilolapegna/claude-watermark-toolkit).
2. Select the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded file.

If you already use Git:

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
```

### 2. Open a terminal in the folder

**Windows:** open the extracted folder in File Explorer, click the address bar, type `powershell`, then press Enter.

**macOS:** open Terminal, type `cd ` with a space after it, drag the extracted folder into the Terminal window, then press Enter.

**Linux:** open the extracted folder in your file manager, right-click inside it and choose **Open in Terminal**. The wording varies by desktop.

### 3. Check Node.js

Run:

```bash
node --version
```

If you see `v20` or a higher number, continue. Otherwise install the current LTS version from [nodejs.org](https://nodejs.org/) and reopen the terminal.

### 4. Check the toolkit

```bash
npm test
```

You should see passing tests and zero failures.

### 5. Add your text

Create `source.txt` in the toolkit folder, paste the source and save it. Then run:

```bash
node bin/watermark-toolkit.js start source.txt
```

Create the primary prompt:

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompt.json
```

If you want the advanced source-separated pair instead:

```bash
node bin/watermark-toolkit.js prompt source.txt --clean-room --out prompts.json
```

### 6. Check the returned draft locally

Give the exported prompt to the non-Anthropic system you choose. Save its response as `candidate.txt`, then run:

```bash
node bin/watermark-toolkit.js check source.txt candidate.txt
```

For two or more alternatives, use `compare` instead. The CLI makes no model call, uploads nothing and never chooses a winner. The automatic local batch was tested and removed because its results did not justify the setup.

## Read the CLI result without guessing

- `mechanicallyValid: true` means the candidate kept automatically protected values and stayed inside the default length range. It says nothing about causal meaning, qualifications or tone.
- `semanticStatus: "requires-manual-review"` remains in every report because a local metric cannot approve meaning.
- `ngramSurvival` measures surviving four-word sequences. Lower means more surface change, not better writing.
- `longestSharedPhrase` shows the longest ordinary word run shared with the source.
- `mechanicalShortlist` keeps candidates that passed the configured checks. `recommended` stays empty. You choose after reading.

No local score proves a result against Anthropic's private detector.

If you expected targeting or an adaptive tournament, those features were removed after red-team review. The targeting proxy could prioritize rare facts without locating Claude's private signal. The tournament did not truly adapt its generation. The [method guide](../../METHODS.md) explains the decision and the narrower contracts that remain.

## If something goes wrong

### `node` is not recognized or not found

Install Node.js LTS, close the terminal, open it again in the toolkit folder and repeat `node --version`.

### `Source text is empty`

Check that `source.txt` contains plain text, save it and run the command again.

### `Blocked provider configuration`

The provider address or model name refers to Anthropic or Claude. Choose a non-Anthropic model.

### A name or exact value disappeared

Protect it explicitly:

```bash
node bin/watermark-toolkit.js prepare source.txt --protect "Exact Name" --out case.json
```

## Before you publish

Check every fact. Read the text aloud. Remove sentences that do not sound like you. Then make the editorial decision yourself.

[See a complete example](../../examples/walkthrough.md) · [Compare every method](../../METHODS.md) · [Read what is known](../../CLAIMS.md)
