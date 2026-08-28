# Research pass prompt

Use this in one non-Anthropic conversation.

```text
Act as a factual editor. Read the source below and return valid JSON only.

Extract:
- purpose;
- audience;
- claims as short, atomic propositions;
- evidence and examples;
- causal links and qualifications;
- numbers, dates, names, URLs, citations and direct quotes that must stay exact;
- format and length constraints;
- practical voice instructions.

Do not draft. Do not paraphrase paragraphs. Do not preserve sentence order when order is not logically required. Do not add a fact.

Source:
<source>
PASTE SOURCE HERE
</source>
```

Check the returned brief before using it. The next conversation must receive the brief, not the source.

