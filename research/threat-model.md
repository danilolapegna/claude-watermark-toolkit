# Threat model

## Asset we protect

The asset is a person's ability to express and revise ideas without a statistical trace being treated as proof of authorship fraud. The toolkit also protects factual integrity during reconstruction.

## Adversary model

The relevant detector may have:

- a secret key;
- a private threshold;
- access to model or product metadata;
- a configuration that differs from public SynthID;
- future updates that invalidate a successful public test.

We assume no detector API and no access to the key.

## Failure modes

### False confidence

A public surrogate reports a low score, so the user believes Claude's private detector must agree. Mitigation: surrogate results stay in the research lab and every report names the exact implementation, key and configuration.

### Meaning damage

The rewrite drops a number, URL, date, quote or qualification. Mitigation: protected values fail closed before selection, and the user reviews the final draft.

### Proxy gaming

The adaptive method lowers phrase overlap by producing unnatural language. Mitigation: Pareto results remain visible, readability is only one signal and human quality decides.

### Privacy loss

Sensitive text is sent to an endpoint the user did not understand. Mitigation: offline preparation is the default, provider calls are explicit and local Ollama is documented first.

The static Rewrite Room makes no provider request, stores no source by default and renders user input with text nodes rather than executable HTML. Closing or reloading the tab clears its in-memory state.

### Vendor boundary drift

An adapter, base URL or local model name routes work back to Anthropic. Mitigation: provider and model strings fail closed on Anthropic and Claude identifiers, with tests.

### Enforcement misuse

Someone uses the toolkit to misrepresent work they did not author. Mitigation: the project explains legitimate authorship and accessibility use, preserves an audit-friendly fact sheet and does not automate submission to institutions.

## Security boundary

No source file is overwritten. No key is stored by the tool. API keys come from process environment or an explicit command option and are sent only to the chosen base URL. Results are ordinary files controlled by the user.
