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

  assert.match(englishReadme, /simple prompt builder and checker/u);
  assert.match(englishReadme, /not an AI writer/u);
  assert.match(italianReadme, /prompt builder con un controllo/iu);
  assert.match(italianReadme, /Non è un writer AI/u);
  assert.match(englishStart, /ideas and facts are yours/u);
  assert.match(englishStart, /does not depend on Claude's sentences/u);
  assert.match(italianStart, /Idee e fatti sono tuoi/u);
  assert.match(italianStart, /non dipendano dalle frasi di Claude/iu);
  assert.match(englishExample, /does not create drafts/u);
  assert.match(englishExample, /still choose after checking/iu);
  assert.match(italianExample, /Non crea bozze/u);
  assert.match(italianExample, /La scelta arriva soltanto dopo/iu);
});

test("Italian practical copy does not address a generic masculine reader", async () => {
  const surfaces = await Promise.all([
    text("../README.it.md"),
    text("../METHODS.it.md"),
    text("../docs/app.js"),
    text("../docs/core.js"),
    text("../src/reconstruction.js"),
    text("../prompts/it/drafting-pass.md"),
    text("../methods/human-redraft/README.it.md"),
    text("../methods/independent-draft/README.it.md"),
  ]);

  for (const surface of surfaces) {
    assert.doesNotMatch(surface, /se sei arrivat[oa]|\bil lettore\b|\ballo stesso lettore\b|\bl'autore\b/iu);
  }
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
    englishLocal: await text("../methods/local-model/README.md"),
    italianLocal: await text("../methods/local-model/README.it.md"),
    englishCli: await text("../methods/semantic-reconstitution/README.md"),
    italianCli: await text("../methods/semantic-reconstitution/README.it.md"),
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
  assert.match(surfaces.englishLocal, /what does “local model” mean/iu);
  assert.match(surfaces.italianLocal, /che cos'è un modello locale/iu);
  assert.match(surfaces.englishCli, /source\.txt.*prompt\.txt.*draft\.txt/isu);
  assert.match(surfaces.italianCli, /sorgente\.txt.*prompt\.txt.*bozza\.txt/isu);
  assert.match(surfaces.workbench, /A simple, direct prompt builder/iu);
  assert.match(surfaces.workbenchCopy, /A non-Anthropic model does the writing/iu);
  assert.match(surfaces.workbench, /Where do you want the writing to happen/iu);
  assert.match(surfaces.workbench, /Paste there\. Copy the answer\. Return here\./iu);

  for (const surface of Object.values(surfaces)) {
    assert.doesNotMatch(surface, /watermark-toolkit\.js rewrite|--provider ollama|--method adaptive/iu);
  }
});

test("public instructions close every normal-path handoff", async () => {
  const englishStart = await text("../start-here/en/README.md");
  const italianStart = await text("../start-here/it/README.md");
  const cli = await text("../bin/watermark-toolkit.js");

  assert.match(englishStart, /Your text.*Rewrite Room builds a prompt.*a different model writes.*Rewrite Room checks/isu);
  assert.match(italianStart, /Il tuo testo.*Rewrite Room prepara un prompt.*un altro modello scrive.*Rewrite Room controlla/isu);
  assert.match(englishStart, /`source\.txt` is a plain text file you create/iu);
  assert.match(italianStart, /`sorgente\.txt` è un normale file di testo che crei tu/iu);
  assert.match(cli, /--out prompt\.txt/u);
  assert.doesNotMatch(englishStart, /prompt\.json|candidate\.txt/u);
  assert.doesNotMatch(italianStart, /prompt\.json|candidato\.txt/u);
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
  assert.match(italianMethods, /prototipi di targeting e torneo sono stati eliminati/iu);
  assert.match(englishMethods, /targeting and tournament prototypes were removed/iu);
  assert.doesNotMatch(mechanics, /project offers two targeting modes/iu);
  assert.doesNotMatch(mechanics, /remaining local batch/iu);
});
