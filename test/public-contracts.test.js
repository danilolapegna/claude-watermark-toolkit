import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function text(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

test("copyable research prompts define inert source boundaries and a checkable schema", async () => {
  for (const language of ["en", "it"]) {
    const prompt = await text(`../prompts/${language}/research-pass.md`);
    assert.match(prompt, /inert|inerte/iu);
    assert.match(prompt, /claims|affermazioni/iu);
    assert.match(prompt, /qualification|precisazione/iu);
    assert.match(prompt, /protected_values|valori_protetti/iu);
    assert.match(prompt, /JSON only|soltanto JSON/iu);
    assert.match(prompt, /BEGIN SOURCE|INIZIO TESTO/iu);
  }
});

test("copyable drafting prompts are source-separated and fail closed on broken briefs", async () => {
  for (const language of ["en", "it"]) {
    const prompt = await text(`../prompts/${language}/drafting-pass.md`);
    assert.match(prompt, /never the source|mai la fonte/iu);
    assert.match(prompt, /inert|inerti/iu);
    assert.match(prompt, /BRIEF_ERROR|ERRORE_SCHEDA/u);
    assert.match(prompt, /character for character|carattere per carattere/iu);
    assert.match(prompt, /BEGIN BRIEF|INIZIO SCHEDA/iu);
  }
});

test("agent skill exposes provider, isolation, source and semantic stop rules", async () => {
  const skill = await text("../skills/non-anthropic-text-rewrite/SKILL.md");
  assert.match(skill, /Do not call an Anthropic endpoint/u);
  assert.match(skill, /Do not overwrite the source/u);
  assert.match(skill, /genuinely isolated drafting context/u);
  assert.match(skill, /REQUIRES_MANUAL_SEMANTIC_REVIEW/u);
  assert.match(skill, /no automatic winner/u);
  assert.match(skill, /stop after the checked brief/u);
});

test("public front doors explain the reader's goal without inherited context", async () => {
  const englishReadme = await text("../README.md");
  const italianReadme = await text("../README.it.md");
  const englishStart = await text("../start-here/en/README.md");
  const italianStart = await text("../start-here/it/README.md");
  const englishExample = await text("../examples/walkthrough.md");
  const italianExample = await text("../examples/walkthrough.it.md");

  assert.match(englishReadme, /simple, direct prompt builder/u);
  assert.match(englishReadme, /not an AI writer/u);
  assert.match(italianReadme, /prompt builder semplice e diretto/u);
  assert.match(italianReadme, /Non è un writer AI/u);
  assert.match(englishStart, /ideas and facts are yours/u);
  assert.match(englishStart, /no longer depends on Claude's wording/u);
  assert.match(italianStart, /Idee e fatti sono tuoi/u);
  assert.match(italianStart, /non dipenda più dal modo in cui Claude/iu);
  assert.match(englishExample, /can and cannot decide/u);
  assert.match(englishExample, /semantic decision yourself/u);
  assert.match(italianExample, /può decidere e che cosa/u);
  assert.match(italianExample, /decisione sul significato/u);
});

test("every practical surface guides the reader before exposing implementation detail", async () => {
  const surfaces = {
    englishMethods: await text("../METHODS.md"),
    italianMethods: await text("../METHODS.it.md"),
    englishManual: await text("../methods/human-redraft/README.md"),
    italianManual: await text("../methods/human-redraft/README.it.md"),
    englishCleanRoom: await text("../methods/two-envelope-clean-room/README.md"),
    italianCleanRoom: await text("../methods/two-envelope-clean-room/README.it.md"),
    englishAgent: await text("../skills/non-anthropic-text-rewrite/README.md"),
    italianAgent: await text("../skills/non-anthropic-text-rewrite/README.it.md"),
    workbench: await text("../docs/index.html"),
    workbenchCopy: await text("../docs/app.js"),
  };

  assert.match(surfaces.englishMethods, /Choose in thirty seconds|Pick in thirty seconds/iu);
  assert.match(surfaces.italianMethods, /Scegli in trenta secondi/iu);
  assert.match(surfaces.englishManual, /What you will have at the end/iu);
  assert.match(surfaces.italianManual, /Che cosa avrai alla fine/iu);
  assert.match(surfaces.englishCleanRoom, /Choose this over the quick prompt when/iu);
  assert.match(surfaces.italianCleanRoom, /Sceglilo al posto del prompt rapido quando/iu);
  assert.match(surfaces.englishAgent, /What is a skill, and do I need one/iu);
  assert.match(surfaces.italianAgent, /Che cos'è una skill, e mi serve davvero/iu);
  assert.match(surfaces.workbench, /A simple, direct prompt builder/iu);
  assert.match(surfaces.workbenchCopy, /A non-Anthropic model does the writing/iu);

  for (const surface of Object.values(surfaces)) {
    assert.doesNotMatch(surface, /watermark-toolkit\.js rewrite|--provider ollama|--method adaptive/iu);
  }
});

test("removed research prototypes stay research, not implied reader instructions", async () => {
  const mechanics = await text("../research/probable-mechanics.md");
  const status = await text("../STATUS.md");
  const italianMethods = await text("../METHODS.it.md");
  const englishMethods = await text("../METHODS.md");

  assert.match(mechanics, /You do not need to run either method/iu);
  assert.match(mechanics, /targets.*removed/isu);
  assert.match(mechanics, /automatic generation paths were removed/iu);
  assert.match(status, /adaptive tournament/iu);
  assert.match(italianMethods, /comando `targets` è stato eliminato/iu);
  assert.match(englishMethods, /removed `targets` command/iu);
  assert.doesNotMatch(mechanics, /project offers two targeting modes/iu);
  assert.doesNotMatch(mechanics, /remaining local batch/iu);
});
