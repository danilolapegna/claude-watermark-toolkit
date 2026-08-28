# Limits you should know before choosing a route

No method wins on every dimension. Choose by authorship, privacy, time, stakes and how much of the old wording must disappear.

| Method | Likely wording change | Meaning risk | Privacy | Main failure |
|---|---|---|---|---|
| Leave it alone or disclose | none | none | best | does not help when detectable assistance itself triggers enforcement |
| Human redraft from a fact sheet | high | low when the author knows the material | best | peeking at the source and copying its structure |
| Rewrite Room prompt builder | high when followed | medium | local preparation; external writing provider varies | the model can flatten nuance or add a claim |
| Source-separated clean room | high | low to medium | depends on writer | an unchecked brief loses a fact or voice notes stay generic |
| Another system from the checked brief | high | medium | depends on provider | provider memory breaks isolation or the model invents |
| Human editor from the brief | high | low to medium | depends on agreement | money, availability and confidentiality |
| Backtranslation | unpredictable | high | usually remote | meaning drift and awkward language |
| Light synonyms | low | medium | varies | too little structural change |
| Unicode cleanup | none for a statistical mark | low | local | solving the wrong problem |

## Rewrite Room

Rewrite Room is a prompt builder with local mechanical checks. It does not write the draft, upload the source, judge meaning or consume AI credits. The external writing model does the writing, can charge and may apply its own provenance system.

The comparison reports exact-value retention and visible surface properties. Those are useful revision clues. They do not read causal meaning, verify every claim or reproduce Anthropic's detector.

## Protected values

Automatic extraction covers common values, not every proper name, legal formula or scientific term. Add anything important that the page or CLI misses.

The check is intentionally character for character. `API` and `api` are different. So are one space and two. That strictness catches exact-value drift but can also flag a harmless formatting choice. A human decides whether the exact form truly matters.

## Source-separated reconstruction

The research pass may see the source. The drafting pass should not. Two messages in one conversation do not create isolation, and some providers share memory across conversations.

The method is only as good as the checked brief. A vague brief produces generic prose. An over-detailed brief can smuggle old sentence structure into the new draft. Keep claims atomic, relationships explicit and voice notes concrete.

## The prompt and agent skill

Contract tests verify that the public prompts define inert-data boundaries, a structured brief, exact-value rules and a fail-closed `BRIEF_ERROR`. The skill adds source protection, provider exclusion, isolation and semantic stop rules.

Those tests inspect the instructions. They cannot force an arbitrary third-party model or agent to obey. If a runtime cannot isolate the drafting context, stop after the brief and move it manually into a new context.

## Why targeting and the tournament were removed

Published watermark attacks make token confidence, self-information and multi-objective search worth researching. That does not make every related implementation useful against Claude.

The toolkit's lexical target score measured unusual words, not Anthropic's sampling confidence or keyed greenlist. It could point straight at names and technical facts. The optional local-model score came from the wrong probability distribution. Both were scientifically interesting and practically misleading.

The tournament produced candidates under different instructions, but its numerical feedback referred to source overlap that the source-separated writer could not see. It was a batch wearing an adaptive label. A later honest-batch design also failed the practical-value gate on a real local model, so the automatic batch was removed too.

## Why no guarantee appears here

A private keyed detector can change without notice. Anthropic has not published its detector threshold, key, model-by-model coverage or error rates. Public SynthID experiments can challenge an algorithmic idea. They cannot certify a Claude result.

The strongest responsible statement is narrower: a genuinely independent reconstruction replaces much more of the original sampling path than cosmetic editing, while explicit fact checks reduce the risk of changing the substance.
