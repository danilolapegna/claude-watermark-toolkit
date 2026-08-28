# Start from zero: do not install anything yet

You have a Claude-assisted text. The ideas and facts are yours, but you want a version that no longer depends on Claude's wording.

If you are not technical, this page is for you. Start with the browser route. The terminal comes much later and only if you want it.

[Back to the main page](../../README.md) · [Italian version](../it/README.md) · [See every method](../../METHODS.md)

## The easiest guided route

Open [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/).

You may be thinking, “I have no idea who hosts that page or where my text goes.” The page has no text-processing server. Its JavaScript runs in your browser tab. If you want to remove even the hosting question, download this repository and open `docs/index.html` while offline.

### Step 1: paste the source

Use text whose ideas and final responsibility are yours. The page finds common exact values such as dates, numbers, URLs, email addresses, quoted phrases and acronyms.

If it misses a name or a term that must remain exact, add it manually. Automatic extraction is a starting list, not an oracle.

### Step 2: prepare the two envelopes

Envelope 1 contains facts and meaning:

- what the reader should understand or do;
- one claim or idea per line;
- the audience;
- exact values that must survive.

Envelope 2 contains your voice:

- sentence rhythm;
- level of formality;
- connectors you use naturally;
- words and phrases you would never use;
- format and length constraints.

This may feel slower than asking for a paraphrase. It is. Those few minutes are what stop the drafting stage from copying the old structure blindly.

### Step 3: seal the source

The page hides the original text and creates a source-free prompt. It does not delete the source from the current tab, so you can unseal it and correct the brief.

Write manually from the two envelopes, or copy the prompt into a non-Anthropic system. The writing system should never receive the source.

### Step 4: compare the draft

Paste the new draft back into Rewrite Room. You will see separate checks for protected facts, shared phrases, sentence openings, structure and length.

If a fact is missing, fix that first. If a long phrase survives, rewrite the whole passage rather than swapping a few words. If the structure remains close, move the claims into a different order.

The page cannot tell you that Anthropic's private detector will accept the result. It tells you what it can actually measure.

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

Create the two prompts:

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompts.json
```

### 6. Keep the rewrite local too

Install [Ollama](https://ollama.com/) and choose a local model that is not from Anthropic. Confirm the model runs in Ollama, then use its exact name:

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --out result.json
```

The source goes to the Ollama process on your computer. It does not go to this repository or to Anthropic.

## I want the advanced routes

You may be thinking, “If the simple method is strong, why does the repository contain targeting and a Pareto set?” Because long or repeated work changes the cost equation.

- [Confidence-aware micro-surgery](../../methods/information-targeted/README.md) spends a limited edit budget on selected passages after facts are protected.
- [Candidate tournaments](../../methods/adaptive-search/README.md) generate several structures and keep non-dominated trade-offs visible.
- [Independent rewrite chains](../../methods/independent-rewrite-chain/README.md) repeat from the same checked brief, never from the previous draft.

These are experimental or expensive routes. Read the evidence boundary before using them.

## Read the CLI result without guessing

- `valid: true` means the candidate kept automatically protected values and stayed within the default length range.
- `ngramSurvival` measures surviving four-word sequences. Lower means more surface change, not better writing.
- `readability` is a rough reading-ease signal, not a quality grade.
- `recommended` is the public weighted choice from the Pareto set. You can inspect and choose another candidate.

No local score proves a result against Anthropic's private detector.

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
