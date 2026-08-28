# Method limits and honest trade-offs

No method wins on every dimension. Choose based on authorship, privacy, time and how much wording must change.

| Method | Likely change strength | Meaning risk | Privacy | Cost | Main failure |
|---|---|---|---|---|---|
| Fresh human redraft | high | low when the author knows the material | best | time | looking back at the original and copying its structure |
| Independent draft from an outline | high | medium | depends on tool | low | outline omits a fact or the model adds one |
| Semantic reconstitution | high | low to medium | local option | medium | research brief preserves hidden structure or loses nuance |
| Information-targeted rewrite | medium to high | medium | local option | medium | proxy targets unusual facts rather than sampling choices |
| Adaptive candidate search | high within its budget | medium | local option | highest | optimizing the available proxies instead of real writing quality |
| Backtranslation | unpredictable | high | usually remote | low | meaning drift and awkward language |
| Light synonyms | low | medium | varies | low | too little structural change |
| Unicode cleanup | none for a statistical mark | low | local | low | solving the wrong problem |

## Fresh human redraft

This is the strongest default when the text is yours and short enough to rewrite. It uses your knowledge as the semantic validator. Its weakness is effort. It also fails if you keep the original open and follow the same sentence order.

## Independent draft

Give a new writer only claims, evidence, constraints and voice notes. A separate conversation matters. If the drafting system sees the original, it can preserve more phrasing and structure than intended.

Check every number, URL, quote and citation. A fluent sentence can still be false.

## Semantic reconstitution

The research pass may see the source. The drafting pass should not. This separates meaning extraction from word choice.

The method is only as good as the brief. A vague brief produces generic prose. An over-detailed brief can smuggle the source structure into the new draft. Keep claims atomic and voice notes practical.

## Information targeting

Public watermark research suggests that tokens with high self-information are useful attack targets. This repository supports supplied token scores, but its default offline proxy measures lexical novelty and diversity. The proxy is not token probability and does not claim to be one.

Protect names and exact facts first. Rare words are often important facts. Rewriting them blindly is a quality failure.

## Adaptive search

The algorithm generates a bounded population, validates hard facts and retains non-dominated candidates. It does not optimize a Claude detector score. Its objectives are protected-fact retention, phrase change, length fit and readability.

The pro is visibility: you can see why one candidate beats another. The con is proxy gaming. A draft can achieve low phrase overlap and still be dull, evasive or tonally wrong. A human remains the final judge.

## Why we reject guarantees

A private keyed detector can change without notice. Anthropic has not published its detector threshold, model coverage or error rates. Public SynthID tests can challenge an algorithmic idea, but they cannot certify a Claude result.

The strongest responsible statement is narrower: a genuinely independent reconstruction replaces far more of the original generator's sampling path than cosmetic editing does, while protected-fact checks reduce the risk of changing the substance.

