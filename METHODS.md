# Three writing routes, plus the helpers that earn their place

[Italiano](METHODS.it.md) · [Start from zero](start-here/en/README.md) · [Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/)

The useful choice is smaller than it looks. You need to know who will write the new draft, what they will see and how you will check the result.

## Choose in thirty seconds

| Your situation | Start here | Time | What you actually receive |
|---|---|---:|---|
| Assistance is allowed and disclosure solves the policy | Leave the text alone and disclose | 2 min | no needless rewrite or new factual drift |
| The text is short or must stay entirely private | [Write again from a fact sheet](methods/human-redraft/README.md) | 10-60 min | a draft written by you with no upload |
| You want the easiest guided path | [Use Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) | 2-5 min plus writing time | a prepared prompt, then local checks on the returned draft |
| The writing model must run on your computer | [Use LM Studio or Ollama](methods/local-model/README.md) | setup plus writing time | the same prepared prompt executed without a hosted writer |
| The writer must not see the old sentences | [Use the two-envelope clean room](methods/two-envelope-clean-room/README.md) | 15-40 min | a draft created from checked facts and voice notes only |
| You already use a non-Anthropic agent | [Install the skill](skills/non-anthropic-text-rewrite/README.md) | 10-30 min | the source-separated workflow run by the agent, with two human approvals |
| You repeat the work or need saved files | [Use the optional CLI](methods/semantic-reconstitution/README.md) | setup plus a few minutes | prompt files and repeatable mechanical reports |

For most people, the answer is Rewrite Room with a writing model they already use. If hosted privacy or credits are the problem, keep Rewrite Room and change only the writer step to LM Studio or Ollama.

## Route 1: write again from a fact sheet

You may be thinking, “Yes, obviously. Write it yourself. Duh.” It stays because this is a complete guide, not a catalogue designed to make the software look necessary.

- **Use it when:** the text is short, private or important enough to deserve your direct attention.
- **What goes in:** a fact sheet with purpose, claims, evidence, qualifications, exact values and voice notes.
- **What happens:** you close the source and write from the sheet.
- **What comes out:** a new draft that never passed through another model.
- **Check:** reopen the source only after drafting and verify every claim and qualification.
- **Stop if:** the fact sheet cannot hold the text without losing relationships. Use the clean-room route instead.

[Follow the complete manual route](methods/human-redraft/README.md).

## Route 2: Rewrite Room, then a writer of your choice

Rewrite Room is a prompt builder with local checks. It does not write.

The normal loop is:

1. Paste the source into Rewrite Room.
2. Copy the prompt it builds.
3. Paste that prompt into a non-Anthropic writer.
4. Paste the returned draft back into Rewrite Room.
5. Restore exact values and inspect the report.

At step 3, choose either:

- **a hosted non-Anthropic model:** no installation, but the provider receives the prompt and may charge or apply its own provenance system;
- **a local model in LM Studio or Ollama:** no hosted writing credits or submission, but you install a large model and quality depends on the computer and model.

What the browser checks is deliberately narrow: protected values, long shared phrases, four-word sequence survival, sentence openings, structure and length. It cannot approve meaning or reproduce Anthropic's private detector.

[Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) or [set up the local writer from zero](methods/local-model/README.md).

## Route 3: the source-separated clean room

“Two envelopes sounds like a lot for one paragraph.” It is. Do not use this for one paragraph.

Use it when the text matters enough that the writing context should never see the old sentences. Envelope 1 contains facts, claims and qualifications. Envelope 2 contains concrete voice behavior. The writer receives both envelopes, not the source.

- **What you get:** stronger separation from source phrasing.
- **What it costs:** a careful brief and a second fact check.
- **Main failure:** a bad brief creates an independently worded but incorrect draft.
- **Stop if:** two drafts repeat the same error. Repair the envelopes instead of generating again.

[Build the two envelopes](methods/two-envelope-clean-room/README.md).

## Helper 1: the agent skill

A skill is a reusable instruction file for an agent. It is not a stronger model and not an app. It packages the clean-room route so an agent can prepare the brief, isolate drafting and show trade-offs repeatedly.

Use it only if you already have a non-Anthropic agent that can create a genuinely isolated writing context. If you do not know where your agent loads skills, you are not missing a secret route. Use Rewrite Room.

[See exactly how to attach or install the skill](skills/non-anthropic-text-rewrite/README.md).

## Helper 2: the local CLI

CLI means a tool controlled by terminal commands. It is useful for saved files and repeated runs, not for better prose.

Its normal loop is `source.txt -> prompt.txt -> writer -> draft.txt -> check`. The `prepare` command only previews protected values. The `compare` command only shows the same evidence for two drafts. Neither is required for the normal loop.

[Follow the CLI from download to final check](methods/semantic-reconstitution/README.md).

## Shortcuts that do not earn a route

Punctuation changes, invisible-character cleaners and a few synonyms target the wrong layer. Backtranslation and repeated rewriting can add factual drift. Public SynthID code does not possess Anthropic's private key. Research attacks called SIRA, B4 and TSAPA informed testing, but they are not actions a reader should perform here.

The targeting and tournament prototypes were removed because their local proxies could not identify Claude's private signal and could encourage changes to rare factual language. The automatic local writer was removed after real runs returned JSON, copied too closely and rejected valid briefs. That research remains public in [probable mechanics](research/probable-mechanics.md) and [the red-team report](REDTEAM.md), clearly separated from the product.

## The honest finish

These routes can produce a fact-checked draft with substantially rebuilt wording. None can issue Anthropic's private verdict. Choose by fidelity, privacy, time and how much responsibility you are prepared to take for the final text.
