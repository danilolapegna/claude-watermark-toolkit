# Start here: no technical knowledge assumed

You have a text that may contain Claude's statistical watermark. You want a clean version that keeps your ideas and facts.

First, choose your situation.

## I have ten minutes and no software

Use the [fresh human redraft](../../methods/human-redraft/README.md). Make a fact sheet, close the source and write again from the facts.

## I want another AI system to help

Use two separate conversations in a non-Anthropic system.

1. The first conversation reads the source and produces a factual brief.
2. You check that brief.
3. The second conversation sees only the brief and writes a new draft.

Copy [the research prompt](../../prompts/en/research-pass.md), then [the drafting prompt](../../prompts/en/drafting-pass.md).

## I want the local tool

### Step 1: check Node.js

Open Terminal on macOS or Linux, or PowerShell on Windows. Run:

```bash
node --version
```

If the number starts with 20 or more, continue. Otherwise install the current LTS version from [nodejs.org](https://nodejs.org/).

### Step 2: download the repository

If Git is installed:

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
```

If Git is not installed, open the repository on GitHub, choose Code, then Download ZIP. Extract the folder and open Terminal inside it.

### Step 3: test the tool

```bash
npm test
```

You should see twelve or more passing tests and zero failures.

### Step 4: analyze your text

Save the source as `source.txt` inside the repository folder. Run:

```bash
node bin/watermark-toolkit.js start source.txt
```

The tool recommends a method and counts values that must survive.

### Step 5: create the two prompts

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompts.json
```

Open `prompts.json` in a text editor. It contains exact instructions for the two separate conversations.

## I want everything to stay on my computer

Install [Ollama](https://ollama.com/), choose a non-Anthropic local model, and confirm it runs. Then:

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --out result.json
```

Replace `YOUR_LOCAL_MODEL` with the exact name shown by Ollama.

## How to read the result

- `valid: true` means the candidate kept every automatically protected value and stayed within the default length range.
- `ngramSurvival` is the share of source four-word phrases that still appear. Lower means more surface change.
- `readability` is a rough reading-ease signal from 0 to 100. It is not a quality grade.
- `recommended` is the candidate that best balances the public objectives. Read the other Pareto candidates too.

## If something fails

### “Source text is empty”

Check that the file contains plain text and that you are using the right path.

### “Blocked provider configuration”

The provider URL or model name contains Anthropic or Claude. Choose a non-Anthropic system.

### “Provider timed out”

Your local model may still be loading. Try one more time. If it keeps failing, use the offline `prompt` command.

### A name disappeared

Run preparation again and protect it explicitly:

```bash
node bin/watermark-toolkit.js prepare source.txt --protect "Exact Name" --out case.json
```

## Final check

Do not submit or publish a draft because a score looks good. Check every fact, read it aloud and take responsibility for the final wording.

