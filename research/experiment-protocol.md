# Experiment protocol

This protocol tests methods against public watermark implementations. It does not certify a Claude result.

## 1. Freeze the question

Record:

- watermark implementation and commit;
- detector configuration and threshold;
- model, tokenizer and decoding settings;
- language and text genre;
- source prompt class;
- text length bands;
- rewrite method and edit budget;
- semantic and human-quality acceptance rules.

## 2. Build the corpus

Use at least four text types:

1. explanatory prose;
2. argument or opinion;
3. fact-dense reporting;
4. low-entropy procedural text.

Keep English and Italian as separate strata. Do not average them into one score.

For each source prompt, retain unmarked and marked generations from the same base model when the implementation permits it.

## 3. Detector ensemble

For public SynthID, vary:

- random secret keys;
- context lengths;
- tournament layers;
- aggregation method;
- text length;
- detector threshold.

Use an ensemble because one favorable key can reward an attack that does not generalize.

## 4. Apply methods

Run the methods under fixed budgets:

- human redraft time;
- number of model calls;
- candidate population;
- generations;
- maximum source overlap allowed during selection;
- provider cost or local compute time.

Keep the original source away from the drafting pass for semantic reconstitution.

## 5. Quality gate

A successful sample must pass all of these:

- every protected fact remains;
- no new factual claim appears;
- semantic meaning passes a blind review;
- the text is grammatical and natural;
- style fits the stated audience;
- a reviewer prefers it to or accepts it alongside the source.

Detector reduction without this gate is not counted as useful success.

## 6. Metrics

Report:

- true-positive rate before and after rewriting;
- false-positive rate on unmarked controls;
- attack success at each quality threshold;
- protected-fact retention;
- four-word and six-word phrase survival;
- length change;
- human acceptability;
- calls, time and cost.

Do not report one average without language, genre and length breakdowns.

## 7. Negative controls

Include:

- punctuation-only edits;
- light synonym replacement;
- Unicode normalization;
- backtranslation;
- independent human redraft.

The weak controls show whether the detector reacts to the expected mechanism. The human redraft is the practical upper reference.

## 8. Release a receipt

Publish configuration, commit hashes, aggregate data, failed cases and quality decisions. Never relabel a surrogate result as Claude removal.

