# Search battlefield, 28 August 2026

This is a dated search snapshot, not a ranking promise. The target is to make the public guide the most complete useful answer for a person searching how to remove a Claude text watermark in Italian or English.

## Primary intent

- Italian: `rimuovere watermark testi Claude`, `watermark testi Claude`, `come togliere watermark Claude`
- English: `remove Claude watermark from text`, `Claude text watermark removal`, `how to remove Claude watermark`

The person behind these queries usually needs three answers in this order:

1. Is the mark hidden formatting or a statistical pattern?
2. What can I do now without destroying facts and voice?
3. Can I do the writing locally without another hosted provider?

## Pages already competing for the answer

| Page | What it does well | Gap the toolkit must close |
|---|---|---|
| [Anthropic Help Center](https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content) | authoritative coverage and mechanism boundary | explains marking, not a complete independent workflow |
| [Anthropic technical article](https://www.anthropic.com/news/claude-text-watermark) | states that light edits probably do not suffice and a complete rewrite removes the signal | no protected-fact workflow, writer handoff or local setup |
| [Contengi](https://contengi.com/blog/how-to-remove-claude-watermark) | correctly rejects metadata cleanup and recommends self-hosted rewriting | assumes the reader can turn “self-hosted model” into an operational path |
| [IsWatermarked](https://iswatermarked.com/blog/remove-claude-watermark) | plain explanation, honest detector limits and draft-history advice | manual answer only; no prompt builder, local writer or returned-draft check |
| [Informarea](https://www.informarea.it/come-rimuovere-il-watermark-di-claude-dai-testi-e-contenuti-ai/) | Italian-language search coverage and useful distinction between text and file metadata | no tested closed loop from source to checked draft |
| [Simply Humanize](https://simplyhumanize.com/tools/claude-watermark-remover) | immediate tool-shaped answer | targets Unicode cleanup and makes claims that conflict with Anthropic's statistical-watermark description |

## The answer this project must own

One page should close the entire loop without inherited knowledge:

> source → prompt builder → hosted or local writer → returned draft → exact-value restoration → visible overlap check → human meaning review

Its differentiators are useful only if they remain true:

- the primary tool clearly says it is a prompt builder and checker, not a writer or detector;
- LM Studio and Ollama instructions begin with download and end with the draft back in Rewrite Room;
- the CLI names who creates `source.txt`, `prompt.txt` and `draft.txt`, and why anyone would use it;
- every route states cost, privacy, hardware, output, limit and stop condition;
- research methods are evidence behind product decisions, not homework for the visitor;
- Italian is written natively and independently from English;
- the manifesto explains why a provenance trace must not become an authorship verdict.

## On-page release contract

- One stable canonical URL per language with reciprocal hreflang.
- Search phrase appears naturally in title, description, opening and one heading without stuffing.
- The first screen explains the problem, the position and the next action.
- FAQ answers the coverage date, hidden-character myth, local-credit question and detector limit.
- Official sources appear near factual claims; open-source implementation and raw benchmark evidence are reachable.
- Mobile navigation exposes the guide map, contents and route back without requiring a long scroll.
- Structured Article, FAQ and breadcrumb data match visible content.

## Measurement after release

Record a baseline in Search Console, then compare at days 7 and 21:

- indexed canonical and selected canonical;
- impressions and average position for the six target queries;
- click-through rate by Italian and English page;
- mobile Core Web Vitals and any horizontal overflow;
- clicks from guide to Rewrite Room and repository;
- queries that reveal a missing question worth answering.

Do not react to one day's rank movement. Revise only when query evidence shows a comprehension gap, stale fact or missing intent. More words are not the default response.
