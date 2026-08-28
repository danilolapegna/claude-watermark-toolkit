#!/usr/bin/env python3
"""Compute token self-information with a local non-Anthropic causal model.

Optional dependencies: torch and transformers. This helper is research-only and
does not run during the normal Node workflow.
"""

from __future__ import annotations

import argparse
import json
import math
from pathlib import Path


def reject_blocked_model(model_name: str) -> None:
    lowered = model_name.lower()
    if "anthropic" in lowered or "claude" in lowered:
        raise SystemExit("Blocked model name. Choose a non-Anthropic local causal model.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("--model", required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    reject_blocked_model(args.model)

    try:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer
    except ImportError as error:
        raise SystemExit("Install optional research packages: python -m pip install torch transformers") from error

    text = args.source.read_text(encoding="utf-8")
    tokenizer = AutoTokenizer.from_pretrained(args.model, use_fast=True)
    model = AutoModelForCausalLM.from_pretrained(args.model)
    model.eval()

    encoded = tokenizer(text, return_tensors="pt", return_offsets_mapping=True)
    offsets = encoded.pop("offset_mapping")[0].tolist()
    with torch.no_grad():
        logits = model(**encoded).logits[0]

    input_ids = encoded["input_ids"][0]
    log_probabilities = torch.log_softmax(logits[:-1], dim=-1)
    target_ids = input_ids[1:]
    chosen = log_probabilities.gather(1, target_ids.unsqueeze(1)).squeeze(1)

    scores = []
    for token_index, log_probability in enumerate(chosen.tolist(), start=1):
        start, end = offsets[token_index]
        if end <= start:
            continue
        scores.append({
            "token": tokenizer.decode([int(input_ids[token_index])]),
            "start": start,
            "end": end,
            "score": round(-log_probability / math.log(2), 6),
            "unit": "bits",
        })

    args.out.write_text(json.dumps(scores, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
