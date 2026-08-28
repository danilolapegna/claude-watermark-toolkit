# Delta: from-zero routes, local writer and mobile wayfinding

Date: 2026-08-28  
Plan: [`_plan-from-zero-local-models.md`](_plan-from-zero-local-models.md)

## What changed

The public product now has one shared contract across GitHub, Rewrite Room and the website:

`source -> Rewrite Room builds a prompt -> a chosen writer drafts -> Rewrite Room or the CLI checks the returned draft`

Rewrite Room is always named as a prompt builder with local checks. A hosted non-Anthropic model and a local LM Studio or Ollama model are choices for the writer step. The CLI is an optional file-based helper, not another writer or a detector.

## Public surfaces affected

- repository front doors, start-here pages, method comparison and walkthroughs;
- Rewrite Room copy, handoff UI and responsive writer-choice cards;
- bilingual local-model and CLI guides;
- primary precision prompt and CLI text export;
- Italian and English website guides, crawler summaries and FAQ/schema content;
- guides landing and guide-article mobile navigation;
- shared route scroll restoration used by same-page and cross-page anchors.

## Product decisions

- Keep manual reconstruction, Rewrite Room, the source-free clean room, the agent skill and the optional CLI.
- Keep research attacks in the research area only. The old targeting, tournament, automatic winner and rewrite chains do not return as reader actions.
- Do not add an automatic local writer, provider dependency, API key or hidden model call.
- Do not claim detector success. Exact-value restoration and surface comparison remain observable evidence only.

## Evidence added

- eight-case bilingual paired benchmark against a banal paraphrase;
- admitted raw local Qwen3.8 27B run;
- independent manual semantic review that records voice and rigid-text limitations;
- rejected-prompt evidence showing that a stricter instruction set failed all mechanical gates;
- geometry-based mobile navigation audit plus same-page anchor regression test;
- live-style Rewrite Room journey covering prompt creation, writer handoff, exact-value restoration and result rendering.

## Downstream implications

- Website copy must continue to match the repository route map and tool verbs.
- New guide-writing work inherits the central workspace contract automatically; the monthly guide radar consumes the same standard.
- Any future automatic writer, targeting method or detector claim requires a new architecture decision and fresh evidence. It is outside this release.
- Changing the route-scroll manager affects every same-page hash. Full website tests and the all-guides browser smoke are therefore release gates, not optional checks.

## Rollback

- Toolkit: revert this release to the previous `main` commit. GitHub Pages then returns to the prior Rewrite Room bundle.
- Website: revert the corresponding site merge and republish through Lovable.
- Framework: revert only the guide-writing contract delta if it causes a false trigger; keep the existing automation schedule and historical reports.

## Plan versus actual

| Feature pianificata | Realizzato | Gap | Razionale del gap |
|---|---|---|---|
| Un solo percorso comprensibile fra prompt builder, writer e controllo | Rewrite Room, README, start-here e guide usano lo stesso flusso chiuso | Nessuno nello stage locale | Verificato con test di contratto e journey browser reale |
| Writer locale senza crediti ospitati | Guide native per LM Studio e Ollama, con requisiti, download, input, output e recupero | Nessuno nello stage locale | L'installazione resta deliberatamente a carico della persona e non viene nascosta dal toolkit |
| CLI spiegata da zero | Ogni file ha creatore, contenuto, comando e destinazione; `prepare` e `compare` sono facoltativi | Nessuno nello stage locale | La CLI prepara e misura, non scrive |
| Metodi utili, premium e proporzionati alla fatica | Restano manuale, Rewrite Room, camera stagna, skill e CLI; i prototipi falliti sono solo ricerca | Nessuno nello stage locale | La numerazione residua è stata riallineata durante il controllo editoriale finale |
| Guide IT/EN sincronizzate senza traduzione meccanica | Entrambe partono dal problema, mostrano la mappa e chiudono ogni percorso | Nessuno nello stage locale | L'italiano ha una revisione nativa separata |
| Navigazione mobile di landing e articoli | Salti immediati, barra persistente indietro-indice, target stabili dopo il layout | Nessuno nello stage locale | Due difetti reali di sticky e drift sono coperti da controlli geometrici |
| Richiamo automatico dello standard guide | Contratto centrale, regola lazy, trust loop e radar mensile puntano allo stesso standard | Nessuno nello stage locale | Nessuna nuova mega-skill o duplicazione del contratto |
| Merge, GitHub Pages, Lovable e verifica pubblica | Non ancora eseguiti in questo stage | Stato live da produrre | È il passaggio di release immediatamente successivo, non una capacità simulabile in locale |

## Guide quality receipt

| Controllo | Verdetto | Prova |
|---|---|---|
| Comprensione a freddo | PASS | L'apertura spiega perché la pagina esiste, offre una mappa completa e indica subito la prima azione |
| Terminologia spiegata | PASS | Prompt builder, writer, modello locale, CLI, file, segnaposto e ricerca sono definiti prima dell'uso; SIRA, B4 e TSAPA hanno una risposta esplicita: nessuna azione richiesta |
| Azionabilità dei metodi | PASS | Ogni percorso chiude situazione, input, azione, output, destinazione, costo, limite e recupero |
| Onestà delle promesse | PASS | Rewrite Room non viene chiamata writer o detector; i controlli restano meccanici e nessun testo promette il responso privato di Anthropic |
| Lingua nativa e inclusiva | PASS | IT ed EN sono indipendenti, l'italiano usa forme neutrali naturali e la prosa pubblica non contiene em dash |

## Delivery Readiness Gate, stage locale, 2026-08-28 21:45 CEST

### Verdetto

**STAGE_READY**

### Mechanical scan

| Pattern | Match nelle righe aggiunte | Azione |
|---|---:|---|
| TODO, FIXME, XXX, HACK, STUB, tbd | 0 | clean |
| coming soon, placeholder, lorem ipsum | 0 | clean |
| test saltati | 0 | clean |
| console.log, debugger, alert | 0 | clean |
| whitespace e conflitti | 0 | `git diff --check` clean in entrambi i repository |

### Adjacent regression check

| Area adiacente | Stato | Verifica |
|---|---|---|
| Tutte le altre guide pubblicate | verified | radar statico 22/22 e browser smoke 22 guide per 3 viewport |
| Scroll fra route senza hash | verified | suite `RouteScrollManager`, incluso reset in cima |
| Rewrite Room rapido e camera stagna | verified | 39 test, workbench contract e journey bilingue |
| Build e prerender del sito | verified | build di produzione e dual prerender delle due guide |
| Contenuto pubblico IT/EN | verified | prose gate, link gate, test inclusività e controllo editoriale manuale |

### Execution proof

- Toolkit: 39 test passati; workbench privacy/accessibilità, 45 file pubblici e 40 documenti linkati verdi.
- Sito: 387 test passati e 4 test dipendenti dall'ambiente saltati; TypeScript e lint dei file modificati verdi.
- Sito: build e prerender verdi; radar statico 22/22; browser smoke 22 guide per 3 viewport.
- Journey watermark: desktop e mobile verdi; navigazione sticky a 72 px, target stabile entro 4 px e nessun overflow orizzontale.
- Benchmark: otto casi letti manualmente; 8/8 valori esatti nel prompt ammesso; un caso tecnico e una deriva di formalità dichiarati.

### Coverage delta

I nuovi contratti hanno copertura diretta in `test/public-contracts.test.js`, `src/test/content/claude-watermark-guide.test.tsx`, `src/test/components/RouteScrollManager.test.tsx` e nei due smoke browser. Nessun percorso nuovo è coperto soltanto dalla presenza di una stringa.

### Quality classification

**production-ready per lo stage statico**: nessun backend, segreto, API pubblica o chiamata a provider è stato aggiunto. Il release-gate sul runtime pubblico resta obbligatorio dopo il deploy.

### Journey Observatory

Il delta locale è verificato. Il profilo `release-gate` sul target pubblico è intenzionalmente pendente fino al deploy e impedisce di trasformare questo `STAGE_READY` in `RELEASE_READY` prima della prova live.

### Self-score

**10/10 per lo stage locale**: piano, stati, delta, scan, happy ed edge path, prove, regressioni, copertura, classificazione e review avversariale sono presenti.

### Adversarial review

1. Una persona nuova troverebbe un percorso silenziosamente rotto in cinque minuti? **No**, per quanto osservabile in locale; browser e CLI sono stati eseguiti da input a risultato.
2. Lo stage viene chiuso per fretta? **No**; un prompt più severo è stato scartato e tre strumenti complessi sono rimasti fuori quando le prove non giustificavano la frizione.
3. È stata omessa una parte del piano che avrebbe richiesto altro lavoro? **No**; merge, Publish e verifica live restano esplicitamente aperti.

### Smoke test prescritto

```bash
npm run check
npm test -- --run
npx tsc --noEmit
npm run build
GUIDE_BASE_URL=http://127.0.0.1:4174 npm run audit:guide-formatting:browser
npm run audit:watermark-guides -- http://127.0.0.1:4174
```
