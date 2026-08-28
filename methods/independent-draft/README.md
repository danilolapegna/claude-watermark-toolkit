# Route 4: an independent draft in another non-Anthropic system

[Italiano](README.it.md) · [Copy the prompts](../../prompts/en/research-pass.md) · [Compare every route](../../METHODS.md)

> **Best for:** people who want model help without installing the CLI<br>
> **Time:** roughly 10 to 30 minutes<br>
> **Difficulty:** two chats and one careful fact check<br>
> **Privacy:** the first chat sees the source; the second sees the brief

## “Why not open a new chat and ask for a paraphrase?”

Because a new window is not the important part. The writing context must not receive the old wording.

This route uses two genuinely separate conversations:

1. A research conversation turns the source into a checked brief.
2. A writing conversation receives only that brief and creates a new draft.

Two messages in the same chat do not count. Conversation history can preserve the source even if the second message says to ignore it.

## What you need

- a non-Anthropic writing system;
- the [research prompt](../../prompts/en/research-pass.md);
- the [drafting prompt](../../prompts/en/drafting-pass.md);
- permission to send the source and brief to the provider you choose.

The provider may use its normal plan or AI credits. It may also apply its own watermark or provenance mechanism. For confidential text or zero hosted credits, use a local open model.

## Step 1: run the research pass

Open a conversation with no relevant history. Copy the complete research prompt, replace the placeholder with the source and send it.

The expected result is a JSON brief containing purpose, audience, atomic claims, evidence, qualifications, protected values, constraints and voice instructions. If you receive prose instead, ask once for valid JSON only. If it still fails, switch model or prepare the brief manually.

## Step 2: verify the brief

Do not trust it because it looks organized. Check source and JSON side by side:

- every source claim has one matching atomic claim;
- “may”, “likely”, “only”, “except” and similar qualifications survive;
- names, numbers, dates, links, citations and quotations are exact;
- no claim, audience or conclusion was invented;
- voice notes describe behavior, not generic adjectives.

Repair the JSON yourself before moving on.

## Step 3: start a clean writing context

Open a completely new conversation in a non-Anthropic system. Do not paste the source. Copy the drafting prompt, insert only the checked JSON brief and send it.

If the service automatically shares memory across chats, disable that memory for this task or use a separate local session.

## Step 4: request visible alternatives

One draft can be fluent and still preserve a predictable structure. Ask for a second candidate from the same brief with a different claim order or paragraph plan. Do not feed Candidate A back as input for Candidate B.

## Step 5: choose by meaning first

Reject a candidate immediately if it loses a protected value, changes a qualification or adds a claim. Among valid candidates, choose the one that best fits your voice and reader. Low phrase overlap is useful evidence, not the deciding vote.

You can paste the chosen draft into [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) for local surface checks.

## Failure map

| Problem | What probably happened | Recovery |
|---|---|---|
| Both drafts sound alike | The writing brief is too prescriptive or generic | Shorten claims and add concrete voice behavior |
| The draft repeats source sentences | The source entered the writing context or polished sentences entered the brief | Start a truly clean context from atomic notes |
| Facts drift | The research brief was not checked | Repair the brief before generating again |
| The provider refuses or ignores JSON | The model is a poor fit for the research pass | Build the two envelopes manually or switch non-Anthropic model |

## Stop rule

After two candidates with the same failure, stop generating. The brief is the bottleneck. Fix it or use a human editor.
