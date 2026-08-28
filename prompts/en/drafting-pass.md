# Drafting pass prompt

Start a separate non-Anthropic conversation.

```text
Write a new text from the reconstruction brief below.

Rules:
- Work from claims and constraints, not prior wording.
- Preserve every protected value exactly.
- Choose a new structure suited to the reader.
- Use concrete verbs and natural sentence lengths.
- Do not add facts.
- Do not mention this workflow, watermarks or detectors.
- Return the text only.

Reconstruction brief:
PASTE CHECKED JSON BRIEF HERE
```

Ask for a second version with a different order if the first still feels structurally close to the source.

