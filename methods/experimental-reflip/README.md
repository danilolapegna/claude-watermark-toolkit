# Experimental automatic local rewrite with Reflip

[Italiano](README.it.md) · [All methods](../../METHODS.md)

Use this route only if your actual question is: “Can my browser make an automatic local draft with almost no setup?”

The answer is yes, experimentally. [Reflip](https://nerln.github.io/reflip/app/) is a separate open-source project. It downloads a small writing model, runs it on your device and shows a basic comparison of names, numbers, negations and quantifiers. It does not use Anthropic and it does not tell you whether Claude's private watermark is gone.

## What you need

- A recent desktop browser with WebGPU support;
- roughly 800 MB for the smallest writing model;
- a text you have the right to edit;
- enough patience to check the answer line by line.

No account or app installation is required. The model download uses the network. Reflip's code then locks network access while processing the text. This toolkit reviewed the code and reproduced its automated test suite on 3 November 2026; Reflip remains third-party software under its own MIT licence.

## The exact steps

1. Open [Reflip in the browser](https://nerln.github.io/reflip/app/).
2. Select **Rewrite**.
3. Paste the source in **Text**.
4. Leave the smallest Qwen model selected for the lowest download.
5. Select the download and rewrite button. The first run downloads about 800 MB.
6. Wait for **Rewritten text** to appear.
7. Read the fact comparison below it.
8. Copy the result only after checking every claim, number, name, negation and qualification against the source.
9. If a fact changed, repair it yourself. If several facts changed, stop and use [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) with a stronger writer or the [source-separated clean room](../two-envelope-clean-room/README.md).

## What the published test says

On Reflip's open SynthID surrogate, the smaller browser model brought 22 of 24 texts below the study's z-score threshold. That is a useful result on a public configuration with a known key. It is not a result from Anthropic's detector.

The same small model changed about 14 counted facts per 1,000 words in the published benchmark. Reflip's fact check caught 60% of the tested changes in numbers, names, negations and quantifiers, and 38% of reviewed pairs contained other meaning changes the check could not see. The tool is an automatic first draft, not an approval system.

## When it earns its place

Use it for low-stakes text when local processing and one-button convenience matter more than first-pass fidelity. Do not use it as the only review for contracts, medical or legal material, academic claims, technical specifications or anything where one altered qualification causes harm.

For important text, the less magical route is better: prepare a checked brief, use a capable writer, then compare the draft with the source.
