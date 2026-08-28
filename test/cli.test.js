import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("prepares a source file through the CLI", async () => {
  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  await writeFile(source, "On 2026-08-28, 120 people read https://example.com.", "utf8");
  const { stdout } = await execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "prepare", source, "--json"], { cwd: new URL("../", import.meta.url) });
  const value = JSON.parse(stdout);
  assert.equal(value.language, "en");
  assert.ok(value.invariants.length >= 3);
});

test("fails closed for a Claude model in the CLI", async () => {
  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  await writeFile(source, "A source with enough words to run.", "utf8");
  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "rewrite", source, "--provider", "ollama", "--model", "claude-local"], { cwd: new URL("../", import.meta.url) }),
    (error) => error.code === 1 && error.stderr.includes("Blocked provider configuration"),
  );
});
