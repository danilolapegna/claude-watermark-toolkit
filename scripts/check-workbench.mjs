import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../docs/app.js", import.meta.url), "utf8");
const core = await readFile(new URL("../docs/core.js", import.meta.url), "utf8");

assert.match(html, /<html lang="en">/u, "Workbench needs a default page language.");
assert.match(html, /<main id="workspace">/u, "Workbench needs one named main landmark.");
assert.match(html, /class="skip-link"/u, "Workbench needs a skip link.");
assert.match(html, /role="status" aria-live="polite"/u, "Workbench needs an announced status region.");
assert.match(html, /<label for="source-text"/u, "Source textarea needs a visible label.");
assert.match(html, /<label for="candidate-text"/u, "Candidate textarea needs a visible label.");

const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/gu)].map((match) => match[1]);
assert.deepEqual(scripts, ["core.js", "app.js"], "Workbench scripts must remain local and auditable.");

const runtimeCode = `${app}\n${core}`;
assert.doesNotMatch(runtimeCode, /\bfetch\s*\(/u, "Workbench must not upload text with fetch.");
assert.doesNotMatch(runtimeCode, /XMLHttpRequest|WebSocket|sendBeacon/iu, "Workbench must not open another upload channel.");
assert.doesNotMatch(runtimeCode, /localStorage|sessionStorage|indexedDB/iu, "Workbench must not persist source text by default.");
assert.doesNotMatch(runtimeCode, /innerHTML|insertAdjacentHTML/u, "User text must be rendered through text nodes.");

process.stdout.write("Rewrite Room static privacy and accessibility contract passed.\n");
