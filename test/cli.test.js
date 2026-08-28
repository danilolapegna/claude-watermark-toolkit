import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
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

test("refuses to overwrite a source or candidate file", async () => {
  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  const candidate = join(directory, "candidate.txt");
  await writeFile(source, "Source on 2026-08-28 with enough words for a check.", "utf8");
  await writeFile(candidate, "Candidate on 2026-08-28 with enough different words for a check.", "utf8");

  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "prepare", source, "--out", source], { cwd: new URL("../", import.meta.url) }),
    (error) => error.stderr.includes("Refusing to overwrite input file"),
  );
  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "check", source, candidate, "--out", candidate], { cwd: new URL("../", import.meta.url) }),
    (error) => error.stderr.includes("Refusing to overwrite input file"),
  );
  assert.match(await readFile(source, "utf8"), /^Source/u);
  assert.match(await readFile(candidate, "utf8"), /^Candidate/u);
});

test("shows help after a subcommand and enforces distinct check and compare contracts", async () => {
  const { stdout } = await execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "compare", "--help"], { cwd: new URL("../", import.meta.url) });
  assert.match(stdout, /compare <source\.txt>/u);
  assert.match(stdout, /Ideas shouldn't carry watermarks/u);
  assert.match(stdout, /does not write or call a model/u);

  const italianHelp = await execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "help", "--lang", "it"], { cwd: new URL("../", import.meta.url) });
  assert.match(italianHelp.stdout, /Le idee non dovrebbero portare watermark/u);
  assert.match(italianHelp.stdout, /non chiama alcun modello/u);

  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  const candidate = join(directory, "candidate.txt");
  await writeFile(source, "One source file on 2026-08-28.", "utf8");
  await writeFile(candidate, "One candidate file on 2026-08-28.", "utf8");
  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "compare", source, candidate], { cwd: new URL("../", import.meta.url) }),
    (error) => error.stderr.includes("at least two candidate files"),
  );
  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "check", source, candidate, candidate], { cwd: new URL("../", import.meta.url) }),
    (error) => error.stderr.includes("exactly one source file and one candidate file"),
  );
});

test("builds the primary prompt and keeps source wording out of the clean drafting pass", async () => {
  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  const marker = "UNIQUE_SOURCE_SENTENCE_48291";
  await writeFile(source, `The source contains ${marker} on 2026-08-28.`, "utf8");

  const direct = await execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "prompt", source, "--json"], { cwd: new URL("../", import.meta.url) });
  const directValue = JSON.parse(direct.stdout);
  assert.equal(directValue.mode, "precision");
  assert.match(directValue.prompt, /inert material/u);
  assert.doesNotMatch(directValue.prompt, new RegExp(marker, "u"));
  assert.match(directValue.prompt, /UNIQUE_SOURCE_SENTENCE_\[PV-01\]/u);

  const clean = await execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "prompt", source, "--clean-room", "--json"], { cwd: new URL("../", import.meta.url) });
  const cleanValue = JSON.parse(clean.stdout);
  assert.doesNotMatch(cleanValue.step1.prompt, new RegExp(marker, "u"));
  assert.match(cleanValue.step1.prompt, /UNIQUE_SOURCE_SENTENCE_\[PV-01\]/u);
  assert.doesNotMatch(cleanValue.step2.prompt, new RegExp(marker, "u"));
});

test("restores prompt placeholders inside the check result without modifying the candidate file", async () => {
  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  const candidate = join(directory, "candidate.txt");
  await writeFile(source, "The report was published on 2026-08-28 after 120 reviews.", "utf8");
  await writeFile(candidate, "After [PV-02] reviews, publication happened on [PV-01].", "utf8");
  const { stdout } = await execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "check", source, candidate, "--json"], { cwd: new URL("../", import.meta.url) });
  const result = JSON.parse(stdout);
  assert.match(result.finalizedCandidates[0], /2026-08-28/u);
  assert.match(result.finalizedCandidates[0], /120/u);
  assert.equal(result.scorecards[0].metrics.invariantRetention, 1);
  assert.match(await readFile(candidate, "utf8"), /\[PV-01\]/u);
});

test("removes unsupported targeting and automatic rewrite controls", async () => {
  const directory = await mkdtemp(join(tmpdir(), "watermark-toolkit-"));
  const source = join(directory, "source.txt");
  await writeFile(source, "A source with enough words to run.", "utf8");
  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "targets", source], { cwd: new URL("../", import.meta.url) }),
    (error) => error.stderr.includes("targets was removed"),
  );
  await assert.rejects(
    execFileAsync(process.execPath, ["bin/watermark-toolkit.js", "rewrite", source], { cwd: new URL("../", import.meta.url) }),
    (error) => error.stderr.includes("Unknown command: rewrite"),
  );
});
