# Run the prepared prompt on your own computer

[Italiano](README.it.md) · [Open Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) · [Back to every route](../../METHODS.md)

> **Use this when:** you do not want a hosted writing provider to receive the text  
> **What you get:** a local chat where you paste Rewrite Room's prompt and receive a draft  
> **Cost:** no hosted AI credits; one model download, disk space, electricity and your computer's time  
> **Important:** the local model writes; Rewrite Room prepares and checks

## First, what does “local model” mean?

It means the writing model runs on your computer. Your browser still builds the prompt. Instead of pasting that prompt into an online AI chat, you paste it into an app installed on the same machine.

This solves one specific problem: the writing step does not need a hosted AI account. It does not prove that a private detector will accept the result, and a small local model can lose facts or produce worse prose.

If you have never used a terminal, choose LM Studio. If you like terminal commands and want a lighter interface, choose Ollama. You need one, not both.

## Before downloading anything: can your computer run it?

LM Studio recommends 16 GB of memory. Its current Qwen3.5 9B package needs about 7 GB of system memory and a download of similar size. That is a reasonable starting point for this writing task, not a quality guarantee.

- **16 GB or more:** start with Qwen3.5 9B.
- **8 GB:** try Qwen3.5 4B, but expect more missed nuance and check the draft very carefully.
- **Less than 8 GB or an unsupported computer:** use a hosted non-Anthropic model or the manual route.

On macOS, LM Studio currently supports Apple Silicon and requires macOS 14 or newer. Its official requirements page lists the current Windows and Linux boundaries too.

## Option A: LM Studio, the graphical route

Choose this if you want normal buttons and a chat window.

### What goes in and what comes out

- **Input:** the complete prompt copied from Rewrite Room.
- **Action:** paste it into a new LM Studio chat and send it once.
- **Output:** one rewritten draft.
- **Next destination:** copy that draft back into Rewrite Room and select **Restore exact values and check**.

### Install and run it from zero

1. Download LM Studio from [the official download page](https://lmstudio.ai/download).
2. Install and open the app.
3. Open **Discover**. Search for `qwen3.5-9b`.
4. Choose the Qwen3.5 9B model page and download the recommended local build. The download is roughly 7 GB, so it can take a while.
5. Open **Chat**.
6. Use the model selector at the top to load the model you downloaded. “Load” means the app is placing the model in your computer's memory. It is not uploading your text.
7. Return to Rewrite Room, select **Copy the entire prompt**, then paste it into the empty LM Studio chat.
8. Send the prompt as one message. Wait for the model to finish.
9. Copy only the draft. If it contains markers such as `[PV-01]`, leave them untouched.
10. Paste the draft into Rewrite Room and run the local check.

You do not need LM Studio's Developer tab, local server or API for this route.

## Option B: Ollama, the lighter terminal route

Choose this only if opening a terminal is comfortable. Ollama downloads the model the first time you run it, then opens a local chat in the same window.

### Install and run it from zero

1. Download Ollama from [the official download page](https://ollama.com/download) and install it.
2. Open Terminal on macOS or Linux, or PowerShell on Windows.
3. Run this exact command:

```bash
ollama run qwen3.5:9b
```

4. The first run downloads about 6.6 GB. When you see the chat prompt, the model is ready.
5. Copy the entire prepared prompt from Rewrite Room, paste it into the terminal and press Enter.
6. When the draft is complete, copy it back into Rewrite Room.
7. Type `/bye` to leave the Ollama chat.

The `:9b` tag matters. Do not choose a tag ending in `:cloud` if the goal is to keep generation on your computer.

## How to know whether the local run was good enough

Reject the draft and try a larger model, a better brief or the manual route when any of these happens:

- a name, number, date, quotation or `[PV-XX]` marker disappears;
- a “may” becomes a certainty, or a negative claim becomes positive;
- the model adds an example, argument or conclusion;
- the result is JSON, a checklist or an explanation instead of the final prose;
- the prose is grammatical but no longer sounds like you;
- long source passages remain almost unchanged.

Rewrite Room catches some of the first and last problems. You must still read for meaning.

## What this route does not promise

Running locally avoids hosted writing credits and hosted text submission. It does not recreate Anthropic's private detector, guarantee semantic fidelity or issue a “watermark removed” certificate.

Official references: [LM Studio getting started](https://lmstudio.ai/docs/app/basics), [LM Studio system requirements](https://lmstudio.ai/docs/app/system-requirements), [Qwen3.5 9B in LM Studio](https://lmstudio.ai/models/qwen/qwen3.5-9b), [Ollama quickstart](https://docs.ollama.com/quickstart), [Qwen3.5 tags in Ollama](https://ollama.com/library/qwen3.5/tags).
