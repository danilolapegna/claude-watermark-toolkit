# Method limits and honest trade-offs

No method wins on every dimension. Choose based on authorship, privacy, time and how much wording must change.

| Method | Likely change strength | Meaning risk | Privacy | Cost | Main failure |
|---|---|---|---|---|---|
| Leave it alone or disclose | none | none | best | none | does not help when detectable assistance itself triggers enforcement |
| Fresh human redraft | high | low when the author knows the material | best | time | looking back at the original and copying its structure |
| Two-envelope clean room | high | low to medium | depends on writer | low | unchecked brief loses a fact or the voice notes stay generic |
| Rewrite Room | high when the method is followed | low to medium | local preparation and comparison | low | guides and checks but does not generate the prose |
| Independent draft from an outline | high | medium | depends on tool | low | outline omits a fact or the model adds one |
| Semantic reconstitution | high | low to medium | local option | medium | research brief preserves hidden structure or loses nuance |
| Information-targeted rewrite | medium to high | medium | local option | medium | proxy targets unusual facts rather than sampling choices |
| Adaptive candidate search | high within its budget | medium | local option | highest | optimizing the available proxies instead of real writing quality |
| Independent rewrite chain | potentially very high | high without repeated validation | depends on writer | high | meaning drift compounds across passes |
| Human editor from the brief | high | low to medium | depends on agreement | paid time | cost, availability and confidentiality |
| Backtranslation | unpredictable | high | usually remote | low | meaning drift and awkward language |
| Light synonyms | low | medium | varies | low | too little structural change |
| Unicode cleanup | none for a statistical mark | low | local | low | solving the wrong problem |

## Fresh human redraft

This is the strongest default when the text is yours and short enough to rewrite. It uses your knowledge as the semantic validator. Its weakness is effort. It also fails if you keep the original open and follow the same sentence order.

## Independent draft

Give a new writer only claims, evidence, constraints and voice notes. A separate conversation matters. If the drafting system sees the original, it can preserve more phrasing and structure than intended.

Check every number, URL, quote and citation. A fluent sentence can still be false.

## Two envelopes and Rewrite Room

The two-envelope method separates factual meaning from voice because they fail differently. Rewrite Room makes that separation visible, finds protected values, hides the source during drafting and compares the candidate locally.

The tool does not generate prose, upload the text or certify Anthropic's detector. Its structure and phrase measures are editorial warnings, not proof that a private watermark is present or absent.

## Semantic reconstitution

The research pass may see the source. The drafting pass should not. This separates meaning extraction from word choice.

The method is only as good as the brief. A vague brief produces generic prose. An over-detailed brief can smuggle the source structure into the new draft. Keep claims atomic and voice notes practical.

## Information targeting

Public watermark research suggests that tokens with high self-information are useful attack targets. This repository supports supplied token scores, but its default offline proxy measures lexical novelty and diversity. The proxy is not token probability and does not claim to be one.

Protect names and exact facts first. Rare words are often important facts. Rewriting them blindly is a quality failure.

## Adaptive search

The algorithm generates a bounded population, validates hard facts and retains non-dominated candidates. It does not optimize a Claude detector score. Its objectives are protected-fact retention, phrase change, length fit and readability.

The pro is visibility: you can see why one candidate beats another. The con is proxy gaming. A draft can achieve low phrase overlap and still be dull, evasive or tonally wrong. A human remains the final judge.

## Independent chains

Repeated independent drafts can replace more of a source's sampling path, but every pass creates another chance to lose a qualification. Restart each candidate from the same checked brief. Do not feed one paraphrase into the next. Chainwash studies a narrower diffusion-language-model watermark family, so this route remains experimental for Claude.

## Human editor

A good editor brings judgment that no overlap metric provides. Give the editor the checked brief first and the source only for final fact checking. Agree on confidentiality when the material is sensitive.

## Why we reject guarantees

A private keyed detector can change without notice. Anthropic has not published its detector threshold, model coverage or error rates. Public SynthID tests can challenge an algorithmic idea, but they cannot certify a Claude result.

The strongest responsible statement is narrower: a genuinely independent reconstruction replaces far more of the original generator's sampling path than cosmetic editing does, while protected-fact checks reduce the risk of changing the substance.
