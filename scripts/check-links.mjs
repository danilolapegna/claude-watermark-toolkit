#!/usr/bin/env node

import { access, readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PUBLIC_ROOTS = [
  "README.md",
  "README.it.md",
  "MANIFESTO.md",
  "MANIFESTO.it.md",
  "CLAIMS.md",
  "STATUS.md",
  "LIMITS.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  "ARCHITECTURE.md",
  "EXECUTION-PLAN.md",
  "start-here",
  "methods",
  "prompts",
  "skills",
  "research",
  "examples",
];

async function markdownFiles(path) {
  const entry = await stat(path);
  if (entry.isFile()) return extname(path) === ".md" ? [path] : [];
  const children = await readdir(path, { withFileTypes: true });
  const nested = await Promise.all(children.map((child) => markdownFiles(join(path, child.name))));
  return nested.flat();
}

const files = [];
for (const item of PUBLIC_ROOTS) {
  const path = join(ROOT, item);
  try {
    files.push(...await markdownFiles(path));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const failures = [];
for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/gu)) {
    const target = match[1].replace(/^<|>$/gu, "");
    if (/^(?:https?:|mailto:)/u.test(target) || target.startsWith("#")) continue;
    const cleanTarget = decodeURIComponent(target.split("#")[0].split("?")[0]);
    if (!cleanTarget) continue;
    const resolved = cleanTarget.startsWith("/")
      ? resolve(ROOT, `.${cleanTarget}`)
      : resolve(dirname(file), cleanTarget);
    try {
      await access(resolved);
    } catch {
      const line = source.slice(0, match.index).split("\n").length;
      failures.push(`${relative(ROOT, file)}:${line}: ${target}`);
    }
  }
}

if (files.length === 0) {
  process.stderr.write("Link check failed: no Markdown files were scanned.\n");
  process.exitCode = 1;
} else if (failures.length > 0) {
  process.stderr.write(`Link check failed:\n${failures.map((item) => `- ${item}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Internal link check passed for ${files.length} Markdown files.\n`);
}
