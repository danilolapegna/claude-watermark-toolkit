# Method 2: independent draft from an outline

Use this when you want help writing but do not need the local CLI.

## The separation rule

One conversation may read the source and extract a brief. A separate conversation writes from that brief. The second conversation must not receive the source text.

## Steps

1. Run the research prompt in [prompts/en/research-pass.md](../../prompts/en/research-pass.md) or [prompts/it/research-pass.md](../../prompts/it/research-pass.md).
2. Check the JSON brief against the source.
3. Start a new conversation in a non-Anthropic system.
4. Paste only the brief into the drafting prompt.
5. Ask for two versions with different structures.
6. Check protected facts and choose the version that sounds like you.

## Privacy

The research conversation sees the source. Use a local model for confidential text. The drafting conversation sees only the brief, but the brief may still contain sensitive facts.

## Failure mode

Using the same chat for both passes. Conversation memory can preserve wording even when the final prompt says to start fresh.

