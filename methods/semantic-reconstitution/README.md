# Method 3: semantic reconstitution

This is the strongest general-purpose method in the toolkit.

## What changes

The source becomes a structured brief containing purpose, atomic claims, evidence, causal links, audience, constraints, protected values and voice instructions. The drafting pass sees the brief instead of the source wording.

## Run it offline first

```bash
node bin/watermark-toolkit.js prepare source.txt --out case.json
node bin/watermark-toolkit.js prompt source.txt --out prompts.json
```

The first command shows what must survive. The second gives you two prompts for separate non-Anthropic conversations.

## Run it with Ollama

```bash
node bin/watermark-toolkit.js rewrite source.txt \
  --provider ollama \
  --model YOUR_LOCAL_MODEL \
  --count 3 \
  --out result.json
```

## Quality checks

- All protected values must remain.
- Claims must not merge if the qualification changes.
- Direct quotes stay exact.
- The new structure must follow the reader's need, not novelty for its own sake.
- The final draft still needs a human line edit.

## Failure mode

An over-detailed brief can preserve the source skeleton. Keep each claim short. Describe voice as actions such as “use short openings” or “state uncertainty directly”, not as vague adjectives.

