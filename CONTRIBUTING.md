# Contributing

Good contributions make the project more accurate, more usable or easier to challenge.

## Useful work

- report a failed fact extraction with a small, non-sensitive fixture;
- add an English or Italian edge case;
- add another language with a native reviewer;
- improve a validator and its tests;
- reproduce a public watermark experiment with full configuration;
- correct a claim with a primary source;
- improve setup instructions after following them from a clean machine.

## Before opening a pull request

```bash
npm test
npm run check:prose
python -m py_compile scripts/token-surprisal.py
```

Describe:

1. the problem;
2. the exact behavior before and after;
3. the test or source that proves the change;
4. any privacy, license or model-download cost;
5. what remains unknown.

## Research contributions

Name the implementation, commit, model, tokenizer, key configuration, detector threshold, language, genre, text length and quality gate. Do not submit a screenshot of one detector score as a result.

Code from a repository without a license cannot be copied here. Papers may inform a clean-room implementation when the method is cited and the code is written independently.

## Writing

Write English and Italian natively. Use direct sentences. Do not use em dashes, inflated certainty or stock promotional language. The prose check catches a small set of patterns; a passing check is not permission to publish awkward text.

## Provider boundary

Provider adapters must reject Anthropic hosts and Claude model identifiers. A contribution that routes rewriting through Anthropic will not be accepted.

