# Known unknowns

These questions stay open until a primary source or reproducible test answers them.

## Claude deployment

- How quickly will the official table reflect patch releases and rollout changes?
- Does coverage vary by product, account, geography or rollout cohort?
- Are short answers skipped or treated with a different threshold?
- How are tool results, quoted text and retrieved passages handled?

## Sampling

- What context length seeds the keyed scores?
- How many tournament layers are used?
- Does the configuration change by model, language or decoding setting?
- How does the system handle deterministic or low-entropy output?

## Detection

- What is the operating threshold?
- What minimum text length is useful?
- What are false-positive and false-negative rates by language and genre?
- Does the detector locate marked spans or return one document score?
- Does it use one key, rotating keys or model-specific keys?

## Robustness

- How much independent rewriting is needed at each text length?
- Does human editing weaken the signal differently from model paraphrasing?
- How do citations, tables, code and copied source passages affect the score?
- Can mixed-author documents be handled without turning a partial signal into a verdict on the whole text?

## Policy

- How does Anthropic select organizations within the published private-preview eligibility groups?
- What use restrictions and audit duties apply to private-preview detector access?
- Will a person be able to challenge a result?
- Will institutions be told the detector's error rates for the relevant language and text type?
- Will accessibility and assistive-writing use be protected in enforcement guidance?

Do not fill these gaps with confidence. Record the missing evidence and update [CLAIMS.md](../CLAIMS.md) when the answer becomes public.
