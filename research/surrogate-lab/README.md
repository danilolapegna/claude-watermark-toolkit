# Public SynthID surrogate lab

The lab answers one narrow question: does a reconstruction method generalize across plausible public SynthID configurations?

It does not answer whether Anthropic's private detector accepts a text.

## Reference implementation

Use [google-deepmind/synthid-text](https://github.com/google-deepmind/synthid-text) at a pinned commit. Its Apache-2.0 license permits a clear research workflow. Keep it in a separate environment so the user-facing Node tool stays small.

## Suggested environment

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

Then follow the official repository installation instructions for the pinned commit. Do not copy an install command from an old blog post.

## Ensemble file

For each run, create a JSON file with:

- reference repository commit;
- model and tokenizer;
- random key identifier, never the key itself in a public result;
- context length;
- tournament layers;
- detector aggregator;
- threshold;
- language, genre and length band;
- method and budget.

Run several keys and settings. A method that wins against one key and fails against the rest has not generalized.

## Required controls

- original marked output;
- unmarked output from the same base model;
- punctuation-only edit;
- light synonym edit;
- independent human redraft.

## Required result language

Good: “Under five public SynthID configurations, semantic reconstitution reduced detection in four while passing the protected-fact and human-quality gates.”

Bad: “The Claude watermark was removed.”

The exact execution harness will be added only after the official implementation and model environment are pinned in a dated experiment. Until then this directory is a protocol, not a completed benchmark.

