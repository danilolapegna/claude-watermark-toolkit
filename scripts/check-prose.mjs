#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
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
  "start-here",
  "methods",
  "prompts",
  "skills",
  "research",
  "examples",
];

const BANNED = [
  { label: "em dash", pattern: /—/gu },
  { label: "stock opening", pattern: /in today['’]s (?:rapidly |ever-)?evolving (?:world|landscape)/giu },
  { label: "stock verb", pattern: /\bdelve(?:s|d|ing)?\b/giu },
  { label: "stock promise", pattern: /\bunlock the (?:power|potential)\b/giu },
  { label: "stock promise", pattern: /\bgame[- ]changer\b/giu },
  { label: "stock transition", pattern: /\bwithout further ado\b/giu },
  { label: "stock adjective", pattern: /\bgroundbreaking\b/giu },
  { label: "stock filler", pattern: /\bit is worth noting that\b/giu },
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

const findings = [];
for (const file of files) {
  const text = await readFile(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    for (const rule of BANNED) {
      rule.pattern.lastIndex = 0;
      if (rule.pattern.test(line)) findings.push(`${relative(ROOT, file)}:${index + 1}: ${rule.label}`);
    }
  });
}

if (files.length === 0) {
  process.stderr.write("Public prose check failed: no Markdown files were scanned.\n");
  process.exitCode = 1;
} else if (findings.length > 0) {
  process.stderr.write(`Public prose check failed:\n${findings.map((item) => `- ${item}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Public prose check passed for ${files.length} Markdown files.\n`);
}
