import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../docs/app.js", import.meta.url), "utf8");
const core = await readFile(new URL("../docs/core.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../docs/styles.css", import.meta.url), "utf8");

assert.match(html, /<html lang="en">/u, "Workbench needs a default page language.");
assert.match(html, /<main id="workspace"(?:\s[^>]*)?>/u, "Workbench needs one named main landmark.");
assert.match(html, /class="skip-link"/u, "Workbench needs a skip link.");
assert.match(html, /role="status" aria-live="polite"/u, "Workbench needs an announced status region.");
assert.match(html, /<label for="source-text"/u, "Source textarea needs a visible label.");
assert.match(html, /<label for="candidate-text"/u, "Candidate textarea needs a visible label.");
assert.match(html, /<label for="prepared-prompt"/u, "Prepared prompt needs a visible label.");
assert.match(html, /<label class="sr-only" for="restored-draft"/u, "Restored draft needs an accessible label.");
assert.match(html, /id="restored-draft"[^>]*readonly/u, "Restored draft must be an explicit read-only output.");
assert.match(html, /costs €0/u, "Workbench must explain why the local page uses no AI credits.");
assert.match(html, /Open a non-Anthropic model and paste/u, "Workbench must make the external handoff explicit.");
assert.match(html, /PV-01/u, "Workbench must explain the exact-value placeholder handoff.");
assert.match(html, /simple, direct prompt builder/u, "Workbench must describe itself as a prompt builder.");
assert.match(html, /A non-Anthropic model does the writing/u, "Workbench must say that the external model writes the draft.");
assert.match(html, /mechanical checks/u, "Workbench must limit its comparison claim.");
assert.match(html, /Ideas shouldn't carry watermarks/u, "Workbench must explain the principle before presenting the tool.");
assert.match(html, /Provenance must not become a witch-hunt verdict/u, "Workbench must distinguish provenance from witch-hunt enforcement.");
assert.match(html, /Mark synthetic evidence\. Not ideas\./u, "Workbench must distinguish synthetic evidence from language and ideas.");
assert.match(html, /changes nothing by itself/u, "Workbench must not pretend to write the draft.");
assert.match(html, /target is wording, never thought/u, "Workbench must name the workflow's target.");
assert.match(html, /<main id="workspace" tabindex="-1">/u, "Skip-link target must accept programmatic focus.");

const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/gu)].map((match) => match[1]);
assert.deepEqual(scripts.map((source) => source.split("?")[0]), ["core.js", "app.js"], "Workbench scripts must remain local and auditable.");
assert.ok(scripts.every((source) => !source.includes("://") && !source.startsWith("//")), "Workbench scripts must not use remote URLs.");
assert.match(html, /href="styles\.css(?:\?[^"]+)?"/u, "Workbench stylesheet must remain local.");
assert.match(html, /href="favicon\.svg"/u, "Workbench icon must remain local.");
assert.doesNotMatch(styles, /https?:\/\//u, "Workbench styles must not load remote assets.");
assert.match(styles, /fonts\/space-grotesk-400\.woff2/u, "Workbench should use the local DL Solutions body font.");

const runtimeCode = `${app}\n${core}`;
assert.doesNotMatch(runtimeCode, /\bfetch\s*\(/u, "Workbench must not upload text with fetch.");
assert.doesNotMatch(runtimeCode, /XMLHttpRequest|WebSocket|sendBeacon/iu, "Workbench must not open another upload channel.");
assert.doesNotMatch(runtimeCode, /localStorage|sessionStorage|indexedDB/iu, "Workbench must not persist source text by default.");
assert.doesNotMatch(runtimeCode, /innerHTML|insertAdjacentHTML/u, "User text must be rendered through text nodes.");
assert.match(core, /restoreProtectedPlaceholders/u, "Workbench must restore exact values locally before comparison.");
assert.match(app, /restoreProtectedPlaceholders/u, "Workbench UI must apply local placeholder restoration.");
assert.match(app, /finalizedCandidate\.value = candidate/u, "Workbench must show the restored draft as an explicit result.");

process.stdout.write("Rewrite Room static privacy and accessibility contract passed.\n");
