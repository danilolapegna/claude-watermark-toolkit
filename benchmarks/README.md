# Local prompt benchmark

This benchmark asks a narrow product question: does the primary prompt built by Rewrite Room earn its extra complexity over “paraphrase this without changing the meaning”?

It does not test Anthropic's detector. It tests the part this repository can observe repeatably: exact-value retention, four-word phrase survival and the longest shared run. It also records a blinded model review as advisory evidence for human inspection.

## Current result

The admitted run used Qwen3.8 27B MLX 8-bit locally across eight English and Italian cases. The corpus includes statistical qualification, causality, conditional scope, conversational voice, fixed technical terms, exact policy language and ordered roles.

| Measure | Banal paraphrase | Rewrite Room prompt |
|---|---:|---:|
| Cases retaining every exact value | 6 of 8 | 8 of 8 |
| Mean four-word survival | 10.1% | 7.1% |
| Mean longest shared run | 6.4 words | 5.4 words |

Seven of eight cases met the per-case mechanical independence rule and every structured-prompt draft retained its exact-value set. The rigid technical case did not improve, and one Italian draft became more formal than its source. The aggregate result passes, but the exceptions are part of the result. They are why the UI asks for a human meaning-and-voice check instead of showing a green semantic verdict.

Read the case-by-case [manual semantic review](MANUAL-REVIEW-2026-08-28.md). Raw source, drafts, scorecards, blind labels and judge reasons are in [`results/local-qwen3.8-27b-mlx-2026-08-28-v3.json`](results/local-qwen3.8-27b-mlx-2026-08-28-v3.json).

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

Set `BENCHMARK_BASE_URL` if the local endpoint uses another address. Set `BENCHMARK_MODEL` to select one model when the server exposes several. Set `BENCHMARK_OUTPUT` to choose the JSON filename. The runner alternates the blind A/B labels, uses the same seed for both drafting prompts in each case and otherwise writes a model-derived filename inside `benchmarks/results/`.

## Mechanical admission gate

The repeatable gate passes only when:

- every structured-prompt draft retains every exact-value set after local placeholder restoration;
- in at least three quarters of the cases, the structured prompt either improves four-word survival by more than one percentage point or both prompts are already below the strong 8% survival floor;
- mean four-word survival improves by at least two percentage points and the longest shared run does not worsen.

The model-assisted fidelity and voice scores are advisory. Repeated runs showed that the same local judge could change those scores for identical drafts, so they are deliberately excluded from the automatic gate. Read every draft against the source. Semantic release status remains `REQUIRES_MANUAL_SEMANTIC_REVIEW`.

## Source-separated prompt smoke

The advanced drafting prompt has a separate live smoke because a structural test cannot prove that a model returns prose instead of another brief.

```bash
npm run benchmark:clean-room
```

It gives two bilingual, human-reviewed briefs to the local non-Anthropic model in clean contexts. The run fails if the model returns JSON, a code fence or `BRIEF_ERROR`, loses an exact value, receives automatic semantic approval, exceeds the bounded mean surface-reuse threshold or drifts too far from source readability. The full reviewed briefs and drafts are saved in [`results/local-clean-room-smoke.json`](results/local-clean-room-smoke.json). Human reading is still required.
