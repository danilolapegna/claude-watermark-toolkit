# Public-tool red-team gate

This file answers a less glamorous question than “how many methods do we have?” It asks whether each public thing deserves a stranger's time.

## Admission rule

A tool, prompt, guide or skill ships only when it has:

1. one useful result stated before setup;
2. one repeatable test or check;
3. one limit a normal reader can understand;
4. a recovery path when it fails;
5. no language that approves meaning, detector success or authorship by proxy.

## Current verdicts

| Surface | Contract | Repeatable evidence | Limit shown to reader | Verdict |
|---|---|---|---|---|
| Rewrite Room | prepare prompt, restore exact values, compare returned draft | browser core, static privacy gate, paired local benchmark | surface report only, external model varies | keep |
| `prepare` | exact-value and case inventory without source mutation | multilingual, nesting, large-input and overwrite tests | misses some proper names and ideas | keep |
| `prompt` | primary or source-separated prompt export | injection, masking and isolation tests | receiving model can ignore instructions | keep |
| `check` | one restored candidate and one mechanical report | contract, overwrite and adversarial semantic tests | never approves meaning | keep |
| `compare` | at least two restored candidates with visible trade-offs | contract and no-winner tests | cannot choose the author's voice | keep |
| Automated `brief` and `rewrite` | promised a repeatable local batch | real gpt-oss 20B trials exposed meta-constraints, JSON instead of prose, close copying and false `BRIEF_ERROR` stops | setup cost exceeded the value | remove |
| Copyable prompts | fixed brief or prose output with `BRIEF_ERROR` | structural tests plus bilingual clean-room live smoke | third-party compliance cannot be forced | keep |
| Agent skill | isolated research and drafting with stop rules | boundary contract test plus the same live drafting contract | runtime may not provide real isolation | keep |
| `targets` | claimed priority passages | proxy did not map to Claude's distribution | failure is structural, not fixable with copy | remove |
| Adaptive tournament | claimed guided search | feedback did not guide the writer's available evidence | adaptive label was false | remove |
| Automatic winner | claimed best draft | semantic inversion passed surface checks | metric cannot perform editorial judgment | remove |
| Draft-to-draft chain | claimed extra independence | known drift compounds at each handoff | independent attempts can start manually from one checked brief | remove as route |

## Adversarial cases in the suite

- an output path aimed at the source or candidate;
- a date, URL or quotation that contains nested numbers and acronyms;
- typographic normalization of hyphens, spaces and percent signs;
- instructions embedded inside the source or brief;
- structured data returned where prose was required;
- a draft that preserves every exact value while reversing the conclusion;
- Italian and English dates, currencies and short factual passages;
- a long multilingual source;
- a third-party agent that cannot create a separate drafting context;
- a reviewed brief rejected by the local automatic drafting path.

## Release boundary

Passing this gate means the repository behaves as documented on the tested cases. It does not mean every external model writes well, every important proper name is detected or a private watermark detector will return a particular verdict.
