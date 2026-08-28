# Ideas Shouldn't Carry Watermarks

<p align="center">
  <strong>Claude wrote the first draft. Now make it yours.</strong><br />
  A no-install prompt builder with local checks, a complete method guide and open-source tools for rebuilding AI-assisted text from the ideas up.
</p>

<table>
  <tr>
    <td><strong>01</strong></td>
    <td><strong>Provenance must not become a witch-hunt verdict.</strong><br />A detector may flag statistical influence. Using that flag as automatic proof of authorship, fraud or intellectual laziness is not provenance analysis. It is judgment outsourced to a score.</td>
  </tr>
  <tr>
    <td><strong>02</strong></td>
    <td><strong>Enforcement punishes the people writing tools help most.</strong><br />Dyslexia, dysgraphia, motor limitations and second-language writing can separate the quality of an idea from the ease of typing it. Detectable assistance is not a measure of intellectual contribution.</td>
  </tr>
  <tr>
    <td><strong>03</strong></td>
    <td><strong>Mark synthetic evidence. Not ideas.</strong><br />An image can be mistaken for a camera's record of an event, so provenance answers a concrete question about apparent evidence. Words are symbols that carry ideas. A text may contain a false claim, but the harm is the claim, fraud or impersonation, not the software that helped shape a sentence.</td>
  </tr>
</table>

That is the reason for the repository. Everything below is the practical consequence: what we actually know, which route fits your time and privacy, and how to use it without destroying the text.

You probably arrived with one practical question: **how do I remove a possible Claude text watermark without wrecking the text?**

The short answer is not to disguise the old wording. Extract what must remain, put the source out of sight and write a genuinely new draft from a checked brief.

If you were hoping for one button that says “watermark gone”, I understand. That button cannot honestly exist while Anthropic's detector, key and threshold remain private. What we can give you is a much better workflow, from a blank page to a local browser tool to a source-separated writing method, with facts protected before any sentence changes.

This is for text whose ideas, judgment and final responsibility are yours. Changing the surface of somebody else's work does not make it yours.

<p align="center">
  <a href="https://danilolapegna.github.io/claude-watermark-toolkit/"><img src="https://img.shields.io/badge/OPEN-REWRITE_ROOM-C9A84C?style=for-the-badge&labelColor=09090F" alt="Open Rewrite Room in your browser" /></a>
  <a href="start-here/en/README.md"><img src="https://img.shields.io/badge/START_FROM-ZERO-F8F6EE?style=for-the-badge&labelColor=09090F" alt="Start from zero" /></a>
  <a href="README.it.md"><img src="https://img.shields.io/badge/LEGGI_IN-ITALIANO-C9A84C?style=for-the-badge&labelColor=171714" alt="Leggi in italiano" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-356346?style=for-the-badge" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="https://danilolapegna.com/guides/claude-text-watermark-guide?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide">Read the web guide</a>
  ·
  <a href="METHODS.md">Compare every method</a>
  ·
  <a href="examples/walkthrough.md">See one complete example</a>
</p>

---

## Want the useful answer in five minutes?

Open [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/).

Rewrite Room is a simple, direct prompt builder with a local comparison step. It is not an AI writer. Paste the source once and it prepares a structured rewrite prompt for a non-Anthropic model without an account, upload or installation. Dates, figures, links, quoted phrases and other exact values become local `[PV-01]` placeholders, reducing the risk that the writing model normalizes a hyphen, decimal or quotation mark. If those markers survive, the page restores the originals character for character when you paste the draft back.

Copy the entire prompt, paste it into the model you prefer, then bring its draft back. The page checks:

- missing names, dates, numbers, links, quotes and values you added;
- the longest phrase still shared with the source;
- surviving three-, four- and five-word sequences;
- repeated sentence openings;
- rough paragraph and sentence-shape similarity.

Prompt preparation and comparison happen locally. The page uses no model and no AI credits. The external model does all the writing and may use its normal subscription, free plan or credits. The report covers surface evidence only. It is not a semantic review or an Anthropic detector result.

This was not admitted on prompt theory alone. On a four-case English and Italian offline benchmark with gpt-oss 20B, the structured prompt preserved every exact-value set, versus one of four for a banal paraphrase. It also reduced mean surviving four-word sequences from 27.4% to 23.7% and shortened the average longest shared run from 10 to 9 words. That is one local model and a small corpus, not a universal guarantee. The complete raw drafts and scores are in [`benchmarks/results/local-gpt-oss-20b.json`](benchmarks/results/local-gpt-oss-20b.json).

If you want stronger wording separation and accept more work, expand the source-free clean-room route inside Rewrite Room. That is where the two-envelope method now lives. It is an advanced option, not an entrance exam. Its separate bilingual live smoke retained every exact value, returned prose in both cases, kept readability within the configured bound and reduced mean four-word survival to 14.6%. Two cases are evidence of function, not a universal performance claim.

---

## “Isn't the real solution just to rewrite it yourself?”

Yes. Duh.

It still belongs at the top because this guide contains every useful method, not only the ones that make the repository look clever. For a short text, a manual rebuild from a fact sheet costs nothing, sends nothing anywhere and may be the strongest route.

The part people often skip is what makes it work:

1. Write down facts, claims and constraints.
2. Close the source.
3. Put the claims in a different order.
4. Write from what you mean, not from the existing sentences.
5. Reopen the source only to check the facts.

[Use the manual method](methods/human-redraft/README.md).

---

## Pick the amount of effort you actually want to spend

| Your situation | Start here | Effort | Main trade-off |
|---|---|---:|---|
| The policy allows assisted writing | Leave it alone or disclose it | none | does not help where detection itself triggers enforcement |
| Short text, maximum privacy | [Manual redraft](methods/human-redraft/README.md) | 10 to 60 min | your time |
| No installation, guided workflow | [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) | 2 to 5 min to prepare, plus model time | the external model may charge or apply its own provenance mechanism |
| Help from another system | [Two-envelope clean room](methods/two-envelope-clean-room/README.md) | 15 to 40 min | provider privacy and brief quality |
| A ready-made agent workflow | [Copy the prompt](prompts/en/research-pass.md) or [the skill](skills/non-anthropic-text-rewrite/SKILL.md) | 10 to 30 min | model fact errors still need review |
| Repeatable local preparation and checks | [Local CLI](methods/semantic-reconstitution/README.md) | setup plus a few minutes per text | it prepares and measures, but does not write |
| High-stakes text and a budget | Human editor from the checked brief | paid time | money, availability and confidentiality |

That table is the quick version. [The complete method guide](METHODS.md) explains what each route buys, where it fails and why backtranslation, Unicode tricks and light synonyms do not deserve equal status.

---

## “Fine, but is Claude already watermarking everything?”

The current official record is more specific than either extreme.

Anthropic says supported models launched in the EU on or after 2 August 2026 include the mark at launch and that supported use across Claude products and the API is marked worldwide. It also says the rollout to earlier models is still in progress. There is no public model-by-model inventory.

So we should not claim that every Claude output has been marked since 14 August. We should not claim that older models are unmarked either.

Anthropic describes the mark as a statistical pattern in token choices, not hidden characters. It says light edits are unlikely to be enough and a complete rewrite that replaces every word removes the signal. A Claude-made translation receives its own watermark.

[Read the claim ledger](CLAIMS.md) for the exact fact, inference and unknown boundaries.

---

## Want the local tool?

You do not need the terminal for the main method. If you want repeatable prompt export and local comparison, the CLI requires Node.js 20 or newer and no runtime packages.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-en.txt
```

Prepare the same structured prompt from a local file:

```bash
node bin/watermark-toolkit.js prompt source.txt --out prompt.json
```

Give the saved prompt to the non-Anthropic system you choose, save its answer as `candidate.txt`, then restore exact values and inspect it locally:

```bash
node bin/watermark-toolkit.js check source.txt candidate.txt
```

The CLI makes no model call and never overwrites the source or candidate. That narrower contract survived testing. The automatic local batch did not, so it was removed.

---

## Why the toolkit is smaller now

You may have expected confidence targeting, an adaptive tournament and several rewrite chains. They were studied, built and then removed from the practical toolkit.

The targeting proxy could not identify Claude's private signal positions and tended to reward unusual factual language. The tournament generated several drafts, but its feedback did not truly steer later generations. Calling either one “advanced” would have been theater.

What remains is narrower and useful: structured prompt export, exact-value restoration, one-draft checks and multi-draft comparison with no automatic winner. The [complete method guide](METHODS.md) publishes the contract, tests and limit of every remaining tool. The [research protocol](research/experiment-protocol.md) remains available for real surrogate experiments, clearly separated from the public solution.

---

## Why this project exists

Detectable AI involvement is not the same thing as false authorship.

Someone may own the idea, evidence and judgment while using software to bridge dyslexia, dysgraphia, motor limitations, cognitive fatigue or a language barrier. The watermark itself does not make a text harder to read. The harm appears when a school, employer or publisher turns detectable assistance into a witch hunt and treats it as proof that the person had no idea of their own.

Image provenance can answer a useful question when a synthetic image may be mistaken for a photograph of a real event. Text is different. A statistical mark cannot tell us who had the idea, checked the evidence or accepted responsibility for the result.

[Read the manifesto: Ideas Shouldn't Carry Watermarks](MANIFESTO.md).

---

## What this project will not pretend

- It cannot certify a result against Anthropic's private detector.
- A public SynthID implementation does not possess Anthropic's key.
- Low phrase overlap does not prove good writing.
- A fluent candidate can still be factually wrong.
- Rewriting somebody else's work does not create authorship.

Read [the honest limits](LIMITS.md), [probable mechanics](research/probable-mechanics.md) and [current implementation status](STATUS.md).

MIT licensed. Built and maintained by [Danilo Lapegna](https://danilolapegna.com/?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide).
