# Start here: pick one route and finish it

You have a Claude-assisted text and want a genuinely new version that keeps your ideas and facts.

**If you are in a hurry, use Route 1.** You do not need to read the whole repository first. You do not need a detector.

[Back to the main page](../../README.md) · [Italian version](../it/README.md)

---

## Route 1: I want the simplest method

- **Time:** 10 to 30 minutes
- **Software:** none
- **Privacy:** the text stays with you

### 1. Make a fact sheet

Read the source once. On a blank page, fill in this small template:

```text
PURPOSE:
What should the reader understand or do?

MUST KEEP:
- Main idea
- Fact, number, name, date or URL
- Exact quote or citation
- Important condition or exception

MY VOICE:
- One sentence about how I normally write
- One thing I would never say
```

Use short notes. Do not copy full sentences unless they are exact quotations.

### 2. Close the source

This is the important part. Do not keep it beside your blank page.

### 3. Choose a new order

Ask what your reader needs first. Move the points into that order instead of following the old paragraphs.

### 4. Write again

Write from the fact sheet in words you would actually use. If a sentence feels too polished to be yours, simplify it.

### 5. Check facts, not phrasing

Reopen the source. Verify every number, name, link, quotation and qualification. Then read the new draft aloud.

You are done. See the [full manual method](../../methods/human-redraft/README.md) if you want its failure modes and final checks.

---

## Route 2: I want another AI system to help

- **Time:** 10 to 20 minutes
- **Software:** any non-Anthropic AI system
- **Privacy:** depends on the system you choose

Use two separate conversations. Not two messages in the same conversation.

### Conversation 1: make the brief

1. Open the [research prompt](../../prompts/en/research-pass.md).
2. Copy the whole prompt.
3. Paste it into a non-Anthropic system together with your source.
4. Check the resulting brief against the source. Correct missing or wrong facts.

### Conversation 2: write the new draft

1. Start a completely new conversation.
2. Open and copy the [drafting prompt](../../prompts/en/drafting-pass.md).
3. Paste the checked brief into the marked place.
4. Do not paste the original text.
5. Ask for two structures if the first one still feels too close to the source.

Finish by checking every fact and reading the result aloud. Fluency is not proof that a sentence is true.

---

## Route 3: I want the local tool

- **Time:** about 15 minutes for setup
- **Software:** Node.js 20 or newer
- **Privacy:** analysis and prompt creation stay on your computer

If a terminal feels like unnecessary work, use Route 1 or 2. You do not lose the central method.

### 1. Download the toolkit

The easiest option is GitHub's ZIP download:

1. Open the [repository page](https://github.com/danilolapegna/claude-watermark-toolkit).
2. Select the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded file.

If you already use Git, you can clone it instead:

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
```

### 2. Open a terminal in that folder

**Windows:** open the extracted folder in File Explorer, click the address bar, type `powershell`, then press Enter.

**macOS:** open Terminal, type `cd ` with a space after it, drag the extracted folder into the Terminal window, then press Enter.

**Linux:** open the extracted folder in your file manager, right-click inside it and choose **Open in Terminal**. The wording may vary by desktop.

### 3. Check Node.js

Run:

```bash
node --version
```

If you see `v20` or a higher number, continue. If the command is not found or the number is lower, install the current LTS version from [nodejs.org](https://nodejs.org/), then reopen the terminal.

### 4. Check the toolkit

```bash
npm test
```

You should see a list of passing tests and zero failures.

### 5. Add your text

Create a plain text file named `source.txt` inside the toolkit folder. Paste your source into it and save.

Then run:

```bash
node bin/watermark-toolkit.js start source.txt
```

The tool recommends a route and counts values that must survive.

### 6. Create the two prompts

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompts.json
```

Open `prompts.json` in any text editor. It contains the research and drafting instructions for the two-conversation method.

---

## Route 4: I want everything local, including the rewrite

Install [Ollama](https://ollama.com/) and choose a local model that is not from Anthropic. Confirm the model runs in Ollama first.

Then use the exact model name in this command:

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --out result.json
```

Replace `YOUR_LOCAL_MODEL` with the name shown by Ollama. Your text is sent to that local Ollama process, not to this repository or to Anthropic.

---

## Read the result without guessing

- `valid: true` means the draft kept every automatically protected value and stayed within the default length range.
- `ngramSurvival` shows how many four-word phrases still match the source. Lower means more surface change, not automatically better writing.
- `readability` is a rough reading-ease signal from 0 to 100. It is not a quality grade.
- `recommended` is the candidate that best balances the public objectives. Read the other candidates in the Pareto set too. They are the drafts with different trade-offs and no single clear winner.

No score proves that Anthropic's private detector would accept a text. The scores help you compare drafts while protecting facts.

---

## If something goes wrong

### `node` is not recognized or not found

Install Node.js LTS from [nodejs.org](https://nodejs.org/), close the terminal, open it again in the toolkit folder and repeat `node --version`.

### `Source text is empty`

Open `source.txt` and check that it contains plain text. Save it, then run the command again.

### `Blocked provider configuration`

The provider address or model name refers to Anthropic or Claude. Choose a non-Anthropic model.

### `Provider timed out`

Your local model may still be loading. Try once more. If it keeps failing, use the offline `prompt` command from Route 3.

### A name or exact value disappeared

Protect it explicitly:

```bash
node bin/watermark-toolkit.js prepare source.txt --protect "Exact Name" --out case.json
```

---

## Before you publish

Check every fact. Read the text aloud. Remove sentences you would never say. Take responsibility for the final wording.

[See a complete worked example](../../examples/walkthrough.md) · [Compare all methods](../../LIMITS.md) · [Read what is actually known](../../CLAIMS.md)
