# Local prompt benchmark

This benchmark asks a narrow product question: does the primary prompt built by Rewrite Room earn its extra complexity over “paraphrase this without changing the meaning”?

It does not test Anthropic's detector. It tests the part this repository can observe repeatably: exact-value retention, four-word phrase survival and the longest shared run. It also records a blinded model review as advisory evidence for human inspection.

## Current result

The admitted run used gpt-oss 20B Q4_K_M locally across four English and Italian cases.

| Measure | Banal paraphrase | Rewrite Room prompt |
|---|---:|---:|
| Cases retaining every exact value | 1 of 4 | 4 of 4 |
| Mean four-word survival | 27.4% | 23.7% |
| Mean longest shared run | 10 words | 9 words |

The prompt won the deterministic independence comparison in three of four cases and protected every exact-value set. The corpus is small, so the result supports this release only after a person reads the drafts. It does not support a universal claim about every model or text.

Raw source, drafts, scorecards, blind labels and judge reasons are in [`results/local-gpt-oss-20b.json`](results/local-gpt-oss-20b.json).

## Reproduce it

You need a local non-Anthropic model served through an OpenAI-compatible llama.cpp endpoint.

```bash
llama-server -m /path/to/model.gguf \
  --host 127.0.0.1 \
  --port 18081 \
  --ctx-size 8192 \
  --parallel 1 \
  --no-webui \
  --reasoning-format none \
  --reasoning-effort low \
  --jinja
```

In another terminal:

```bash
node benchmarks/run-local-benchmark.mjs
```

Set `BENCHMARK_BASE_URL` if the local endpoint uses another address. The runner alternates the blind A/B labels, uses the same seed for both drafting prompts in each case and writes the complete result to `benchmarks/results/local-gpt-oss-20b.json`.

## Mechanical admission gate

The repeatable gate passes only when:

- every structured-prompt draft retains every exact-value set after local placeholder restoration;
- the structured prompt wins deterministic four-word survival in at least three quarters of the cases;
- mean four-word survival improves by at least two percentage points and the longest shared run does not worsen.

The model-assisted fidelity and voice scores are advisory. Repeated runs showed that the same local judge could change those scores for identical drafts, so they are deliberately excluded from the automatic gate. Read every draft against the source. Semantic release status remains `REQUIRES_MANUAL_SEMANTIC_REVIEW`.

## Source-separated prompt smoke

The advanced drafting prompt has a separate live smoke because a structural test cannot prove that a model returns prose instead of another brief.

```bash
npm run benchmark:clean-room
```

It gives two bilingual, human-reviewed briefs to the local non-Anthropic model in clean contexts. The run fails if the model returns JSON, a code fence or `BRIEF_ERROR`, loses an exact value, receives automatic semantic approval, exceeds the bounded mean surface-reuse threshold or drifts too far from source readability. The full reviewed briefs and drafts are saved in [`results/local-clean-room-smoke.json`](results/local-clean-room-smoke.json). Human reading is still required.
