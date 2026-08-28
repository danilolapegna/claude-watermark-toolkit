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

A candidate lowers phrase overlap by producing unnatural language. Mitigation: no draft is recommended automatically, reading-ease drift remains visible and human semantic review decides. The pseudo-adaptive loop and automatic batch were removed after their complexity failed to buy a real steering benefit.

### Privacy loss

Sensitive text is pasted into a service the user did not understand. Mitigation: preparation and comparison stay local, the external writing step remains reader-controlled, and the guides state the privacy trade-off before the prompt is copied.

The static Rewrite Room makes no provider request, stores no source by default and renders user input with text nodes rather than executable HTML. Closing or reloading the tab clears its in-memory state.

### Vendor boundary drift

The reader pastes the prompt into Claude and asks the same system to rewrite its own marked output. Mitigation: every practical route says to use a non-Anthropic writer, and the automated runtime contains no provider call that can silently cross this boundary.

### Enforcement misuse

Someone uses the toolkit to misrepresent work they did not author. Mitigation: the project explains legitimate authorship and accessibility use, preserves an audit-friendly fact sheet and does not automate submission to institutions.

## Security boundary

No source or candidate file is overwritten. The browser page and CLI contain no model-provider call, accept no API key and upload no text. The reader chooses the separate writing environment and accepts its privacy, credit and provenance terms directly. Toolkit results are ordinary browser state or files controlled by the user.
