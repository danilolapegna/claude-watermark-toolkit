# Claude wrote the first draft. Now make it yours.

<p align="center">
  <strong>A no-install workbench, a complete method guide and open-source tools for rebuilding AI-assisted text from the ideas up.</strong>
</p>

You probably arrived with one practical question: **how do I remove a possible Claude text watermark without wrecking the text?**

The short answer is not to disguise the old wording. Extract what must remain, put the source out of sight and write a genuinely new draft from a checked brief.

If you were hoping for one button that says “watermark gone”, I understand. That button cannot honestly exist while Anthropic's detector, key and threshold remain private. What we can give you is a much better workflow, from a blank page to a local browser tool to advanced candidate search, with facts protected before any sentence changes.

This is for text whose ideas, judgment and final responsibility are yours. Changing the surface of somebody else's work does not make it yours.

<p align="center">
  <a href="https://danilolapegna.github.io/claude-watermark-toolkit/"><img src="https://img.shields.io/badge/OPEN-REWRITE_ROOM-B63B26?style=for-the-badge" alt="Open Rewrite Room in your browser" /></a>
  <a href="start-here/en/README.md"><img src="https://img.shields.io/badge/START_FROM-ZERO-164C6E?style=for-the-badge" alt="Start from zero" /></a>
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

It runs in the browser with no account, no upload and no installation. You paste the source, protect names and exact values, prepare two short envelopes for meaning and voice, then seal the source before drafting.

Write the new version yourself or copy the source-free prompt into any non-Anthropic system you trust. Paste the result back and the page will check:

- missing names, dates, numbers, links, quotes and values you added;
- the longest phrase still shared with the source;
- surviving three-, four- and five-word sequences;
- repeated sentence openings;
- rough paragraph and sentence-shape similarity.

All of that happens locally. The report is a comparison, not an Anthropic detector result.

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
| No installation, guided workflow | [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) | 10 to 30 min | it guides and checks, but does not generate prose |
| Help from another system | [Two-envelope clean room](methods/two-envelope-clean-room/README.md) | 15 to 40 min | provider privacy and brief quality |
| A ready-made agent workflow | [Copy the prompt](prompts/en/research-pass.md) or [the skill](skills/non-anthropic-text-rewrite/SKILL.md) | 10 to 30 min | model fact errors still need review |
| Repeated or confidential work | [Local CLI](start-here/en/README.md#i-want-the-local-cli) | setup plus 10 to 60 min | installation and compute |
| Full rewriting is impractical | [Confidence-aware micro-surgery](methods/information-targeted/README.md) | 20 to 90 min | can target rare facts by mistake |
| You want several visible trade-offs | [Candidate tournament](methods/adaptive-search/README.md) | 30 to 120 min | more compute and proxy gaming |
| One independent pass is still too close | [Independent rewrite chain](methods/independent-rewrite-chain/README.md) | 30 to 120 min | meaning drift compounds |
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

You do not need the terminal for the main method. If you want repeatable prompt export, local model calls and multi-candidate comparison, the CLI requires Node.js 20 or newer and no required runtime packages.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-en.txt
```

Run everything through a local non-Anthropic model with Ollama:

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out result.json
```

The toolkit rejects Anthropic hosts and Claude model identifiers before a request leaves the process. It never overwrites the source.

---

## The advanced routes are here for a reason

If “use a genetic algorithm” sounds like a splendid way to create twelve bad paragraphs, that concern is valid.

The advanced methods do not trust low overlap by itself. They protect facts first, reject broken candidates and keep competing objectives visible:

- [information-targeted rewriting](methods/information-targeted/README.md), informed by SIRA and Watermark Smoothing research;
- [adaptive candidate search](methods/adaptive-search/README.md), informed by B4 and TSAPA;
- [independent rewrite chains](methods/independent-rewrite-chain/README.md), treated as experimental because Chainwash studies a narrower model family;
- [surrogate experiments](research/experiment-protocol.md), where public SynthID is named as a surrogate and never presented as Claude's detector.

The research is there to improve the method, not to decorate a simple paraphraser with scientific nouns.

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
