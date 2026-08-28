# Method 4: information-targeted rewrite

Use this when a full independent draft is impractical or when research asks which passages matter most.

## Two score modes

### Transparent lexical proxy

The Node tool ranks sentences by lexical novelty and diversity. It is fast, local and easy to inspect. It is not model surprisal.

### Supplied self-information

The optional Python helper computes token self-information with a local non-Anthropic causal model. The Node target selector can consume those character spans and scores.

```bash
python scripts/token-surprisal.py source.txt --model YOUR_LOCAL_CAUSAL_MODEL --out scores.json
node bin/watermark-toolkit.js targets source.txt --scores scores.json
```

The Python step needs optional `torch` and `transformers` packages and may download the model you name. Read that model's license and storage requirements first.

## Safety order

1. Extract protected values.
2. Rank possible targets.
3. Remove names, exact facts, citations and quotes from the target list.
4. Rewrite one complete passage, not isolated synonyms.
5. Recheck meaning and transitions.

## Why the order matters

Rare words often receive high information scores. They are also often the facts that must not change. Targeting without protection can produce a detector-friendly result that is simply wrong.

## Evidence boundary

SIRA motivates the method, but its published results do not establish performance against Claude. Treat this as an advanced experimental route.
