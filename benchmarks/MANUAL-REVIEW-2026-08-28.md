# Manual semantic review, 2026-08-28

The mechanical gate passed. This second gate asks the question the code cannot answer: did each structured-prompt draft preserve what the source actually meant, including its uncertainty and voice?

The reviewer read the source, the banal paraphrase and the structured-prompt draft without using the model judge as an authority.

| Case | Meaning and boundaries | Voice | Independence | Human verdict |
|---|---|---|---|---|
| English qualification | The sample, date, effect, confidence interval and limits remain intact. | Slightly more institutional, still compatible. | Low overlap floor in both drafts; the structured draft is not mechanically better here. | Pass with limitation |
| Italian policy voice | The detector claim and the difference between opening and closing a review remain intact. | Too formal in places, especially around assistance and individual judgment. | Stronger reconstruction than the banal paraphrase. | Pass only after voice edit |
| English causality | Publication order, 41 to 23 change, staffing confounder and test-only conclusion remain intact. | Comparable to the source. | Better four-word separation. | Pass |
| Italian exact boundaries | No automatic publication, no sending, the decision owner and draft status remain intact. | More bureaucratic than the source. | Much lower phrase survival. | Pass only after voice edit |
| English conditional scope | The second-audit condition, unapproved extension, combined ceiling and legal dependency remain intact. | Comparable to the source. | Both drafts were already under the strong overlap floor. | Pass |
| Italian conversational contrast | Both possible causes and the warning against causal invention remain intact. | More conversational than the banal paraphrase, though not identical to the source. | Better phrase separation. | Pass |
| English fixed technical terms | HTTP status, header, delay, API contract and non-database conclusion remain intact. | Comparable to the source. | Worse than the banal paraphrase because rigid terms leave little safe room. | Pass meaning, fail independence improvement |
| Italian ordered roles | Order, veto boundary and exact log phrase remain intact. | Slightly more formal. | Better four-word separation, with the same longest shared run. | Pass with limitation |

## Release decision

**Admit the prompt builder, not an automatic rewrite claim.**

The structured prompt passed the aggregate mechanical gate and preserved every exact-value set. Human reading found no reversed condition, lost negation, invented fact or changed owner. It also found the two limitations that must remain visible:

1. a local model can flatten a conversational source into formal prose;
2. highly constrained technical text may not have enough safe wording freedom to improve surface independence.

Rewrite Room therefore prepares a serious first draft and a local check. It does not promise a finished text, a semantic verdict or detector evasion. If the returned draft changes voice, meaning or a protected boundary, the correct action is to edit it or reject it.

## Rejected prompt iteration

A stricter intermediate prompt was also run against the same eight cases. It retained every exact-value set in only seven cases, increased mean four-word survival from 10.1% to 13.1% and lengthened the mean shared run from 6.4 to 8.4 words. It failed all three mechanical gates and was reverted. More instructions did not make the tool better.
