# Use the ready-made agent skill

[Italiano](README.it.md) · [Open the skill file](SKILL.md) · [Use Rewrite Room instead](https://danilolapegna.github.io/claude-watermark-toolkit/)

> **Best for:** people who already use a non-Anthropic coding or writing agent  
> **Setup:** copy one folder or attach one file  
> **Expected result:** checked brief, protected values, independent candidates and visible trade-offs  
> **Not for:** your first attempt, or an agent that cannot isolate drafting from source reading

## “What is a skill, and do I need one?”

A skill is a reusable instruction file for an agent. It tells the agent how to run the whole workflow without you pasting the same process every time.

If that sentence creates more questions than it answers, you do not need the skill. Use [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) or the [two copyable prompts](../../prompts/en/research-pass.md).

## Before you install it

The agent must not be Anthropic or Claude. It must also be able to create a genuinely isolated writing context that does not inherit the source or research history. If it cannot, the skill should stop after producing the brief.

The agent provider may charge credits and may receive your source. Use a local agent for confidential text.

## Option A: attach the file for one job

1. Download [`SKILL.md`](SKILL.md).
2. Start a new task in your non-Anthropic agent.
3. Attach `SKILL.md` and your source file.
4. Say:

```text
Follow the attached non-anthropic-text-rewrite skill for this source. Keep the research and drafting contexts genuinely isolated. Show me the checked brief before drafting, and stop if a qualification is missing.
```

5. Review the brief before allowing the agent to continue.

## Option B: install it as a reusable Codex-style skill

Copy the complete `non-anthropic-text-rewrite` folder into the skills directory used by your non-Anthropic agent. The exact directory depends on that agent, so follow its official skill-loading documentation rather than guessing.

After installation, start a task with:

```text
Use non-anthropic-text-rewrite on the attached source. My priorities are factual fidelity first, then a fresh structure, then voice. Do not submit or publish anything.
```

## What a correct run must show you

- the checked reconstruction brief;
- values that must remain exact;
- at least two structurally independent drafts;
- fact-retention results for each;
- the longest surviving source phrase;
- factual and voice risks in plain language;
- no automatic winner; a plain-language trade-off for every surviving draft;
- an explicit `REQUIRES_MANUAL_SEMANTIC_REVIEW` status.

If you receive only one polished paragraph and a confidence score, the skill was not followed.

The underlying source-separated drafting contract also has a live bilingual gpt-oss 20B smoke test. Both admitted cases returned prose, retained every exact value and stayed inside the configured readability bound. That proves the workflow can execute as specified on those fixtures. It does not prove that your agent will isolate contexts correctly or preserve every meaning.

## Your approval points

Pause the agent twice:

1. **After the brief:** verify claims, qualifications and protected values.
2. **Before choosing the final draft:** reject invented facts and choose the voice yourself.

The agent must never publish, submit or overwrite the source for you.

## If the runtime cannot isolate contexts

Take the checked brief from the first run, open a completely new conversation and use the [drafting prompt](../../prompts/en/drafting-pass.md). Do not pretend that “ignore the earlier source” creates isolation inside the same context.
