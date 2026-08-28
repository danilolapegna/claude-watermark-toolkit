# Security policy

## Supported version

Security fixes target the latest release on the default branch.

## Report a vulnerability

Do not open a public issue for a vulnerability that exposes credentials, private text or a provider-routing bypass. Email security details to hello@danilolapegna.com with the subject `Claude Watermark Toolkit security report`.

Include the affected version, a minimal reproduction, impact and any suggested fix. Do not include real private documents or live API keys.

## Security model

- Source files are read-only inputs.
- The tool does not store API keys.
- Network calls happen only during an explicit rewrite command.
- Provider configuration rejects Anthropic and Claude identifiers.
- Optional local model downloads remain the user's responsibility.

