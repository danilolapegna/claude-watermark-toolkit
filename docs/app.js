(function startRewriteRoom() {
  "use strict";

  const core = globalThis.RewriteRoomCore;
  if (!core) throw new Error("Rewrite Room core did not load.");

  const copy = {
    en: {
      repoLink: "Open source",
      skipLink: "Skip to Rewrite Room", languageLabel: "Language", stepsLabel: "Rewrite steps",
      eyebrow: "A simple, direct prompt builder",
      title: "Paste. Build. Check.",
      intro: "Have a Claude-assisted draft built from your ideas? Rewrite Room masks exact values and builds a prompt locally. A non-Anthropic model does the writing. Paste its draft back here for mechanical checks.",
      manifestoEyebrow: "Why this",
      manifestoTitle: "Ideas shouldn't carry watermarks.",
      manifestoIntro: "Rewrite Room changes nothing by itself. It builds a prompt and checks surface differences. The target is wording, never thought. A statistical trace cannot tell who formed an idea or took responsibility for it.",
      manifesto1Title: "Provenance must not become a witch-hunt verdict.",
      manifesto1Body: "A detector may flag statistical influence. Turning that flag into proof of authorship, fraud or intellectual laziness is judgment outsourced to a score.",
      manifesto2Title: "Enforcement punishes the people writing tools help most.",
      manifesto2Body: "Dyslexia, dysgraphia, motor limitations and second-language writing can separate the quality of an idea from the ease of typing it. Treating detectable assistance as cheating measures surface production, not intellectual contribution.",
      manifesto3Title: "Mark synthetic evidence. Not ideas.",
      manifesto3Body: "An image can pretend to be a camera record. Text is a symbolic carrier: a false claim is harmful because of the claim, not because software helped phrase it.",
      manifestoLink: "Full manifesto",
      step1Short: "Your text", step2Short: "Your prompt", step3Short: "Your check",
      step1Kicker: "Start here. Really.", step1Title: "Paste the text you want to rebuild",
      step1Thought: "“Am I about to upload a private text?” No. This page costs €0, has no server call and stores nothing. If you still do not trust it, download the repository and open this exact page offline.",
      sourceLabel: "Source text", sourceHelp: "Use text you own and can stand behind. The next button prepares a prompt. It does not send or rewrite anything.",
      extraSummary: "Optional: add names or phrases that must remain letter-for-letter identical", extraLabel: "One protected value per line",
      prepareAction: "Prepare my rewrite prompt",
      step2Kicker: "The useful part is ready", step2Title: "Copy this entire prompt",
      step2Thought: "“Couldn’t I just ask another model to paraphrase it?” You could. That often means lazy synonym swaps, lost nuance and long copied sequences. This prompt forces two things at once: fidelity to your meaning and independence from the old token sequence.",
      promptDoesLabel: "What the prompt does", promptDoesBody: "It masks exact values as PV markers, asks the model to rebuild from a fact ledger and keeps those markers unchanged. When you paste the draft back, this page restores the original values character for character before checking anything.",
      protectedTitle: "Values it must keep exact", protectedEmpty: "No automatic values found. That is normal for text without dates, figures, links or quoted phrases.",
      promptLabel: "Your prepared rewrite prompt", backSource: "Edit the source", downloadAction: "Download prompt", copyAction: "Copy the entire prompt",
      handoffKicker: "What you do now", handoffTitle: "Open a non-Anthropic model and paste",
      handoff1: "Open the writing model you prefer.", handoff2: "Paste the full prompt and send it as one message.", handoff3: "Copy its answer and paste it below. If you see [PV-01] markers, good. Do not replace them yourself; this page will.",
      modelBoundary: "One caveat worth knowing: another hosted provider may apply its own watermark or provenance mechanism. For zero hosted credits and no provider-side watermark, use a local open model.",
      advancedTitle: "Want more separation? Build without showing the old wording.", advancedSubtitle: "More work and a cleaner boundary. This was the old default and, yes, it was too much for the entrance.",
      advancedIntro: "Here the other model never receives the source. You give it only facts, ideas and your voice. Choose this when maximum wording separation matters more than speed.",
      factsEnvelope: "Meaning and facts", voiceEnvelope: "Voice and limits",
      purposeLabel: "What should the reader understand or do?", claimsLabel: "Ideas and claims, one per line", audienceLabel: "Who is this for?",
      voiceLabel: "How do you actually write?", voiceHelp: "Be concrete: sentence rhythm, formality, favorite connectors and words you would never use.", constraintsLabel: "Length, format and other constraints",
      quickPromptAction: "Restore the quick prompt", cleanPromptAction: "Build the source-free prompt",
      candidateLabel: "Paste the model's new draft here", candidateHelp: "Leave any [PV-01] markers exactly as they are. The check restores their original values locally, then measures exact values and surface overlap. It cannot read meaning like a human editor.", compareAction: "Restore exact values and check",
      step3Kicker: "Evidence you can actually use", step3Title: "See what changed and what survived",
      step3Thought: "“So is the watermark gone?” Nobody outside Anthropic can certify that from this page. What you can see is whether exact facts survived and whether too much of the old wording, openings or structure remains.",
      restoredDraftKicker: "The usable output", restoredDraftTitle: "Your draft, with exact values restored",
      restoredDraftHelp: "This is the external model's draft with every surviving [PV-XX] marker replaced locally by the exact original value. Read it for meaning, tone and unsupported claims before you use it.", restoredDraftLabel: "Restored draft", copyDraftAction: "Copy restored draft",
      nextTitle: "What I would fix next", reviseAction: "Revise the draft", resetAction: "Clear everything", resetConfirm: "Click again to clear everything",
      boundaryKicker: "The line is simple", boundaryTitle: "Use it for ideas and work you can honestly defend.",
      boundaryBody: "A rewrite can change a text's surface. It cannot turn somebody else's work into yours, repair false claims or replace your responsibility for what you publish.",
      footerText: "Rewrite Room is part of the open-source Claude Watermark Toolkit.", footerLink: "Read the methods and research.",
      sourceError: "Paste the source before continuing.", briefError: "Add the purpose, at least one idea and concrete voice notes before building the source-free prompt.", candidateError: "Paste the new draft before checking it.",
      copied: "Prompt copied. Now paste it into your chosen model.", draftCopied: "Restored draft copied. Read it once before you use it.", downloaded: "Prompt downloaded.", quickRestored: "Quick prompt restored.", cleanBuilt: "Source-free prompt ready.", valuesRestored: "Exact values restored locally. Now read the draft and the mechanical report.",
      reset: "Everything in this tab was cleared.", resetWarning: "One more click will clear the source, prompt and draft.", clipboardFallback: "Select and copy the prompt manually.",
      protectedLabels: { url: "URL", email: "Email", date: "Date", number: "Number", quote: "Quote", acronym: "Acronym", manual: "Added by you" },
      verdictGood: "Mechanical checks passed. Now read for meaning, tone and unsupported claims.", verdictReview: "The mechanical checks found specific problems to repair before your human review.",
      factsCard: "Protected values", factsGood: "All {count} protected values are present.", factsMissing: "Missing: {values}",
      phraseCard: "Longest identical phrase", phraseValue: "{count} words", phraseGood: "No long copied run found.", phraseReview: "Shared run: “{phrase}”",
      ngramCard: "Four-word sequences left", ngramValue: "{value}%", ngramGood: "Most four-word sequences are new.", ngramReview: "A noticeable share of source wording remains.",
      openingCard: "Sentence openings reused", openingValue: "{value}%", openingGood: "Sentence openings changed.", openingReview: "Several sentences still start the same way.",
      structureCard: "Structure similarity", structureValue: "{value}%", structureGood: "Paragraph and sentence shape changed.", structureReview: "The overall shape is still very close.",
      lengthCard: "Length compared with source", lengthValue: "{value}%", lengthGood: "The length stays in a useful range.", lengthReview: "A large length change deserves a meaning check.",
      actionFacts: "Restore these protected values exactly: {values}.", actionPhrase: "Rebuild the longest identical passage as a whole. Do not swap its words one by one.",
      actionOpening: "Change how the repeated sentences begin and connect to the previous point.", actionStructure: "Change a few sentence boundaries or paragraph transitions without changing the logic.",
      actionLength: "Check whether the new length removed nuance or added unsupported material.", actionHuman: "Read both versions side by side for claims, uncertainty and tone. The browser cannot perform that semantic check for you.",
    },
    it: {
      repoLink: "Open source",
      skipLink: "Vai a Rewrite Room", languageLabel: "Lingua", stepsLabel: "Passaggi della riscrittura",
      eyebrow: "Un prompt builder semplice e diretto",
      title: "Incolla. Prepara. Controlla.",
      intro: "Hai una bozza nata dalle tue idee con l'aiuto di Claude? Rewrite Room maschera i valori esatti e prepara un prompt in locale. A scrivere è un modello non Anthropic. Riporta qui la bozza per i controlli meccanici.",
      manifestoEyebrow: "Perché esiste",
      manifestoTitle: "Le idee non dovrebbero portare watermark.",
      manifestoIntro: "Rewrite Room da sola non cambia nulla. Prepara un prompt e controlla differenze superficiali. L'obiettivo sono le parole, mai il pensiero. Una traccia statistica non dice chi ha avuto un'idea o se ne è assunto la responsabilità.",
      manifesto1Title: "La provenienza non può diventare una caccia alle streghe.",
      manifesto1Body: "Un detector può segnalare un'influenza statistica. Trasformarla in prova di paternità, frode o pigrizia intellettuale significa appaltare il giudizio a un punteggio.",
      manifesto2Title: "L'enforcement punisce proprio chi gli strumenti di scrittura aiutano di più.",
      manifesto2Body: "Dislessia, disgrafia, difficoltà motorie e scrittura in una seconda lingua possono creare distanza fra la qualità di un'idea e la facilità di metterla su pagina. Trattare l'assistenza rilevabile come disonestà misura la forma superficiale, non il contributo intellettuale.",
      manifesto3Title: "Marchiamo le prove sintetiche. Non le idee.",
      manifesto3Body: "Un'immagine può fingersi una registrazione fotografica. Il testo è un vettore simbolico: un'affermazione falsa è dannosa per ciò che afferma, non perché un software ha aiutato a formularla.",
      manifestoLink: "Manifesto completo",
      step1Short: "Il testo", step2Short: "Il prompt", step3Short: "Il controllo",
      step1Kicker: "Parti da qui. Sul serio.", step1Title: "Incolla il testo che vuoi ricostruire",
      step1Thought: "“Sto per caricare un testo privato?” No. Questa pagina costa €0, non chiama alcun server e non salva nulla. Se ancora non ti fidi, scarica il repository e apri questa stessa pagina offline.",
      sourceLabel: "Testo di partenza", sourceHelp: "Usa un testo tuo, che sei disposto a difendere. Il pulsante qui sotto prepara un prompt. Non invia e non riscrive nulla.",
      extraSummary: "Facoltativo: aggiungi nomi o formule che devono restare identici fino all'ultima lettera", extraLabel: "Un valore protetto per riga",
      prepareAction: "Prepara il mio prompt di riscrittura",
      step2Kicker: "La parte utile è pronta", step2Title: "Copia tutto questo prompt",
      step2Thought: "“Non potevo semplicemente chiedere a un altro modello di parafrasarlo?” Certo. Spesso però ottieni sinonimi pigri, sfumature perse e pezzi interi rimasti identici. Questo prompt obbliga il modello a fare due cose insieme: restare fedele al significato e staccarsi dalla vecchia sequenza di parole.",
      promptDoesLabel: "Che cosa fa il prompt", promptDoesBody: "Maschera i valori esatti con segnaposto PV, chiede al modello di ricostruire dal registro dei fatti e gli fa conservare quei segnaposto. Quando riporti qui la bozza, la pagina rimette i valori originali carattere per carattere prima di controllare qualsiasi cosa.",
      protectedTitle: "Valori che deve conservare identici", protectedEmpty: "Non ho rilevato valori automatici. È normale in un testo senza date, cifre, link o citazioni.",
      promptLabel: "Il tuo prompt di riscrittura pronto", backSource: "Modifica il testo", downloadAction: "Scarica il prompt", copyAction: "Copia tutto il prompt",
      handoffKicker: "Che cosa fai adesso", handoffTitle: "Apri un modello non Anthropic e incolla",
      handoff1: "Apri il modello di scrittura che preferisci.", handoff2: "Incolla il prompt completo e invialo come un solo messaggio.", handoff3: "Copia la risposta e incollala qui sotto. Se vedi segnaposto come [PV-01], va bene. Non sostituirli tu: lo farà questa pagina.",
      modelBoundary: "Una cosa che vale la pena sapere: un altro provider ospitato potrebbe applicare il proprio watermark o un altro sistema di provenienza. Per non usare crediti ospitati e non dipendere dal watermark di un provider, serve un modello open locale.",
      advancedTitle: "Vuoi separare ancora di più le formulazioni? Ricostruisci senza mostrare le vecchie frasi.", advancedSubtitle: "Più lavoro e un confine più netto. Prima era il percorso principale e sì, come ingresso era decisamente troppo.",
      advancedIntro: "Qui l'altro modello non riceve mai il testo di partenza. Gli dai soltanto fatti, idee e la tua voce. Scegli questa strada quando la massima separazione delle frasi conta più della velocità.",
      factsEnvelope: "Significato e fatti", voiceEnvelope: "Voce e limiti",
      purposeLabel: "Che cosa deve capire o fare chi legge?", claimsLabel: "Idee e affermazioni, una per riga", audienceLabel: "Per chi stai scrivendo?",
      voiceLabel: "Come scrivi davvero?", voiceHelp: "Sii concreto: ritmo delle frasi, formalità, connettivi che usi e parole che non diresti mai.", constraintsLabel: "Lunghezza, formato e altri vincoli",
      quickPromptAction: "Ripristina il prompt rapido", cleanPromptAction: "Crea il prompt senza la fonte",
      candidateLabel: "Incolla qui la nuova bozza del modello", candidateHelp: "Lascia identici gli eventuali segnaposto [PV-01]. Il controllo ripristina in locale i valori originali, poi misura valori esatti e somiglianza superficiale. Non sa leggere il significato come un editor umano.", compareAction: "Ripristina i valori e controlla",
      step3Kicker: "Prove che puoi davvero usare", step3Title: "Guarda che cosa è cambiato e che cosa è rimasto",
      step3Thought: "“Quindi il watermark è sparito?” Nessuno fuori da Anthropic può certificarlo da questa pagina. Qui puoi vedere se i valori esatti sono sopravvissuti e se sono rimaste troppe vecchie frasi, aperture o strutture.",
      restoredDraftKicker: "Il risultato che puoi usare", restoredDraftTitle: "La tua bozza, con i valori esatti ripristinati",
      restoredDraftHelp: "Questa è la bozza del modello esterno con ogni segnaposto [PV-XX] sopravvissuto sostituito in locale dal valore originale esatto. Rileggi significato, tono e affermazioni non supportate prima di usarla.", restoredDraftLabel: "Bozza con valori ripristinati", copyDraftAction: "Copia la bozza ripristinata",
      nextTitle: "Che cosa sistemerei adesso", reviseAction: "Rivedi la bozza", resetAction: "Cancella tutto", resetConfirm: "Clicca ancora per cancellare tutto",
      boundaryKicker: "Il confine è semplice", boundaryTitle: "Usalo per idee e lavori che puoi difendere onestamente.",
      boundaryBody: "Una riscrittura può cambiare la superficie di un testo. Non può rendere tuo il lavoro di qualcun altro, correggere affermazioni false o sostituire la tua responsabilità su ciò che pubblichi.",
      footerText: "Rewrite Room fa parte del Claude Watermark Toolkit open source.", footerLink: "Leggi i metodi e la ricerca.",
      sourceError: "Incolla il testo di partenza prima di continuare.", briefError: "Aggiungi lo scopo, almeno un'idea e note concrete sulla tua voce prima di creare il prompt senza la fonte.", candidateError: "Incolla la nuova bozza prima di controllarla.",
      copied: "Prompt copiato. Adesso incollalo nel modello che hai scelto.", draftCopied: "Bozza ripristinata copiata. Rileggila una volta prima di usarla.", downloaded: "Prompt scaricato.", quickRestored: "Prompt rapido ripristinato.", cleanBuilt: "Prompt senza la fonte pronto.", valuesRestored: "Valori esatti ripristinati in locale. Ora leggi la bozza e il resoconto meccanico.",
      reset: "Ho cancellato tutto ciò che era in questa scheda.", resetWarning: "Un altro clic cancellerà testo, prompt e bozza.", clipboardFallback: "Seleziona il prompt e copialo manualmente.",
      protectedLabels: { url: "URL", email: "Email", date: "Data", number: "Numero", quote: "Citazione", acronym: "Acronimo", manual: "Aggiunto da te" },
      verdictGood: "Controlli meccanici superati. Ora rileggi significato, tono e affermazioni non supportate.", verdictReview: "I controlli meccanici hanno trovato problemi precisi da correggere prima della tua rilettura.",
      factsCard: "Valori protetti", factsGood: "Sono presenti tutti i {count} valori protetti.", factsMissing: "Mancano: {values}",
      phraseCard: "Sequenza identica più lunga", phraseValue: "{count} parole", phraseGood: "Non ho trovato lunghe sequenze copiate.", phraseReview: "Sequenza condivisa: “{phrase}”",
      ngramCard: "Sequenze di quattro parole rimaste", ngramValue: "{value}%", ngramGood: "Quasi tutte le sequenze di quattro parole sono nuove.", ngramReview: "È rimasta una parte non trascurabile della vecchia formulazione.",
      openingCard: "Inizi di frase riutilizzati", openingValue: "{value}%", openingGood: "Gli inizi delle frasi sono cambiati.", openingReview: "Diverse frasi partono ancora nello stesso modo.",
      structureCard: "Somiglianza della struttura", structureValue: "{value}%", structureGood: "La forma di paragrafi e frasi è cambiata.", structureReview: "La forma complessiva è ancora molto vicina.",
      lengthCard: "Lunghezza rispetto alla fonte", lengthValue: "{value}%", lengthGood: "La lunghezza resta in un intervallo sensato.", lengthReview: "Una grande differenza di lunghezza richiede un controllo del significato.",
      actionFacts: "Ripristina esattamente questi valori protetti: {values}.", actionPhrase: "Ricostruisci per intero il passaggio identico più lungo. Non cambiare una parola alla volta.",
      actionOpening: "Cambia l'inizio delle frasi ripetute e il legame con il punto precedente.", actionStructure: "Cambia qualche confine di frase o passaggio tra paragrafi senza alterare la logica.",
      actionLength: "Controlla se la nuova lunghezza ha eliminato sfumature o aggiunto materiale non supportato.", actionHuman: "Confronta le due versioni per affermazioni, incertezze e tono. Il browser non può fare al posto tuo questo controllo semantico.",
    },
  };

  const queryLanguage = new URLSearchParams(globalThis.location.search).get("lang");
  const browserLanguage = String(globalThis.navigator.language || "").toLowerCase();
  const initialLanguage = queryLanguage === "it" || queryLanguage === "en" ? queryLanguage : (browserLanguage.startsWith("it") ? "it" : "en");
  const state = { language: initialLanguage, source: "", protectedValues: [], promptMode: "precision", finalizedCandidate: "", report: null, resetArmed: false };
  const byId = (id) => document.getElementById(id);
  const elements = {
    form: byId("rewrite-form"), source: byId("source-text"), extras: byId("extra-values"), sourceError: byId("source-error"),
    stepSource: byId("step-source"), stepPrompt: byId("step-prompt"), stepResults: byId("step-results"),
    protectedList: byId("protected-list"), protectedEmpty: byId("protected-empty"), prompt: byId("prepared-prompt"),
    purpose: byId("purpose"), claims: byId("claims"), audience: byId("audience"), voice: byId("voice"), constraints: byId("constraints"), briefError: byId("brief-error"),
    candidate: byId("candidate-text"), candidateError: byId("candidate-error"), finalizedCandidate: byId("restored-draft"), verdict: byId("verdict"), resultGrid: byId("result-grid"),
    nextActions: byId("next-actions"), toast: byId("toast"),
  };

  function interpolate(template, values) {
    return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), template);
  }

  function currentCopy() { return copy[state.language]; }

  function brief() {
    return {
      purpose: elements.purpose.value.trim(), claims: elements.claims.value.trim(), audience: elements.audience.value.trim(),
      voice: elements.voice.value.trim(), constraints: elements.constraints.value.trim(), protectedValues: state.protectedValues,
    };
  }

  function updatePrompt() {
    elements.prompt.value = state.promptMode === "clean"
      ? core.buildCleanRoomPrompt(brief(), state.language)
      : core.buildPrecisionRewritePrompt(state.source, state.protectedValues, state.language);
  }

  function setLanguage(language) {
    if (!copy[language]) return;
    state.language = language;
    document.documentElement.lang = language;
    document.title = language === "it" ? "Rewrite Room | DL Solutions" : "Rewrite Room | DL Solutions";
    document.querySelectorAll("[data-copy]").forEach((node) => {
      const value = currentCopy()[node.dataset.copy];
      if (value) node.textContent = value;
    });
    document.querySelectorAll("[data-copy-aria]").forEach((node) => {
      const value = currentCopy()[node.dataset.copyAria];
      if (value) node.setAttribute("aria-label", value);
    });
    byId("reset-button").textContent = state.resetArmed ? currentCopy().resetConfirm : currentCopy().resetAction;
    byId("reset-button").classList.toggle("is-armed", state.resetArmed);
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    byId("manifesto-link").href = language === "it"
      ? "https://github.com/danilolapegna/claude-watermark-toolkit/blob/main/MANIFESTO.it.md"
      : "https://github.com/danilolapegna/claude-watermark-toolkit/blob/main/MANIFESTO.md";
    renderProtectedValues();
    if (state.source) updatePrompt();
    if (state.report) renderReport(state.report);
  }

  function showStep(number) {
    document.querySelectorAll("[data-step-indicator]").forEach((item) => {
      const itemNumber = Number(item.dataset.stepIndicator);
      item.classList.toggle("is-current", itemNumber === number);
      item.classList.toggle("is-done", itemNumber < number);
    });
  }

  function focusHeading(section) {
    const heading = section.querySelector("h2");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function renderProtectedValues() {
    elements.protectedList.replaceChildren();
    elements.protectedEmpty.hidden = state.protectedValues.length > 0;
    state.protectedValues.forEach((item) => {
      const li = document.createElement("li");
      const type = document.createElement("span");
      const value = document.createElement("span");
      type.className = "value-type";
      type.textContent = currentCopy().protectedLabels[item.type] || item.type;
      value.textContent = item.value;
      li.append(type, value);
      elements.protectedList.append(li);
    });
  }

  function prepareSource() {
    const source = elements.source.value.trim();
    elements.sourceError.textContent = "";
    if (!source) {
      elements.sourceError.textContent = currentCopy().sourceError;
      elements.source.focus();
      return;
    }
    state.source = source;
    state.protectedValues = core.extractProtectedValues(source, elements.extras.value);
    state.promptMode = "precision";
    renderProtectedValues();
    updatePrompt();
    elements.stepSource.hidden = true;
    elements.stepPrompt.hidden = false;
    elements.stepResults.hidden = true;
    showStep(2);
    focusHeading(elements.stepPrompt);
  }

  function returnToSource() {
    elements.stepSource.hidden = false;
    elements.stepPrompt.hidden = true;
    elements.stepResults.hidden = true;
    showStep(1);
    focusHeading(elements.stepSource);
  }

  function restoreQuickPrompt() {
    state.promptMode = "precision";
    elements.briefError.textContent = "";
    updatePrompt();
    toast(currentCopy().quickRestored);
    elements.prompt.focus();
  }

  function buildCleanPrompt() {
    const values = brief();
    elements.briefError.textContent = "";
    if (!values.purpose || !values.claims || !values.voice) {
      elements.briefError.textContent = currentCopy().briefError;
      const firstEmpty = [elements.purpose, elements.claims, elements.voice].find((field) => !field.value.trim());
      firstEmpty.focus();
      return;
    }
    state.promptMode = "clean";
    updatePrompt();
    toast(currentCopy().cleanBuilt);
    elements.prompt.focus();
  }

  function toast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    globalThis.setTimeout(() => elements.toast.classList.remove("is-visible"), 2800);
  }

  async function copyPrompt() {
    updatePrompt();
    try {
      await navigator.clipboard.writeText(elements.prompt.value);
      toast(currentCopy().copied);
    } catch {
      elements.prompt.focus();
      elements.prompt.select();
      toast(currentCopy().clipboardFallback);
    }
  }

  async function copyFinalizedCandidate() {
    if (!state.finalizedCandidate) return;
    try {
      await navigator.clipboard.writeText(state.finalizedCandidate);
      toast(currentCopy().draftCopied);
    } catch {
      elements.finalizedCandidate.focus();
      elements.finalizedCandidate.select();
      toast(currentCopy().clipboardFallback);
    }
  }

  function downloadPrompt() {
    updatePrompt();
    const blob = new Blob([elements.prompt.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = state.language === "it" ? "prompt-riscrittura.txt" : "rewrite-prompt.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast(currentCopy().downloaded);
  }

  function resultCard(title, value, body, stateName) {
    const article = document.createElement("article");
    article.className = `result-card result-${stateName}`;
    const heading = document.createElement("h3");
    const metric = document.createElement("strong");
    const explanation = document.createElement("p");
    heading.textContent = title;
    metric.textContent = value;
    explanation.textContent = body;
    article.append(heading, metric, explanation);
    return article;
  }

  function reportActions(report) {
    const c = currentCopy();
    const actions = [];
    if (report.missingProtectedValues.length) actions.push(interpolate(c.actionFacts, { values: report.missingProtectedValues.map((item) => item.value).join(", ") }));
    if (report.longestSharedPhrase.length >= 8 || report.ngramSurvival[4] > 0.18) actions.push(c.actionPhrase);
    if (report.sentenceOpeningReuse > 0.3) actions.push(c.actionOpening);
    if (report.structureSimilarity > 0.82) actions.push(c.actionStructure);
    if (report.lengthRatio < 0.55 || report.lengthRatio > 1.65) actions.push(c.actionLength);
    actions.push(c.actionHuman);
    return actions;
  }

  function renderReport(report) {
    const c = currentCopy();
    const needsReview = report.missingProtectedValues.length > 0 || report.longestSharedPhrase.length >= 8 || report.ngramSurvival[4] > 0.18;
    elements.verdict.className = `verdict verdict-${needsReview ? "review" : "good"}`;
    elements.verdict.textContent = needsReview ? c.verdictReview : c.verdictGood;
    elements.resultGrid.replaceChildren();

    const factsGood = report.missingProtectedValues.length === 0;
    elements.resultGrid.append(resultCard(
      c.factsCard,
      `${Math.round(report.protectedRetention * 100)}%`,
      factsGood ? interpolate(c.factsGood, { count: report.protectedCount }) : interpolate(c.factsMissing, { values: report.missingProtectedValues.map((item) => item.value).join(", ") }),
      factsGood ? "good" : "review",
    ));

    const phraseReview = report.longestSharedPhrase.length >= 8;
    elements.resultGrid.append(resultCard(c.phraseCard, interpolate(c.phraseValue, { count: report.longestSharedPhrase.length }), phraseReview ? interpolate(c.phraseReview, { phrase: report.longestSharedPhrase.phrase }) : c.phraseGood, phraseReview ? "review" : "good"));

    const ngramPercent = Math.round(report.ngramSurvival[4] * 100);
    elements.resultGrid.append(resultCard(c.ngramCard, interpolate(c.ngramValue, { value: ngramPercent }), ngramPercent > 18 ? c.ngramReview : c.ngramGood, ngramPercent > 18 ? "review" : "good"));

    const openingPercent = Math.round(report.sentenceOpeningReuse * 100);
    elements.resultGrid.append(resultCard(c.openingCard, interpolate(c.openingValue, { value: openingPercent }), openingPercent > 30 ? c.openingReview : c.openingGood, openingPercent > 30 ? "review" : "good"));

    const structurePercent = Math.round(report.structureSimilarity * 100);
    elements.resultGrid.append(resultCard(c.structureCard, interpolate(c.structureValue, { value: structurePercent }), structurePercent > 82 ? c.structureReview : c.structureGood, structurePercent > 82 ? "review" : "good"));

    const lengthPercent = Math.round(report.lengthRatio * 100);
    const lengthReview = report.lengthRatio < 0.55 || report.lengthRatio > 1.65;
    elements.resultGrid.append(resultCard(c.lengthCard, interpolate(c.lengthValue, { value: lengthPercent }), lengthReview ? c.lengthReview : c.lengthGood, lengthReview ? "review" : "good"));

    elements.nextActions.replaceChildren();
    reportActions(report).forEach((action) => {
      const item = document.createElement("li");
      item.textContent = action;
      elements.nextActions.append(item);
    });
  }

  function compareCandidate() {
    elements.candidateError.textContent = "";
    const rawCandidate = elements.candidate.value.trim();
    if (!rawCandidate) {
      elements.candidateError.textContent = currentCopy().candidateError;
      elements.candidate.focus();
      return;
    }
    const candidate = core.restoreProtectedPlaceholders(rawCandidate, state.protectedValues);
    if (candidate !== rawCandidate) {
      elements.candidate.value = candidate;
      toast(currentCopy().valuesRestored);
    }
    state.finalizedCandidate = candidate;
    elements.finalizedCandidate.value = candidate;
    state.report = core.compareTexts(state.source, candidate, state.protectedValues);
    renderReport(state.report);
    elements.stepResults.hidden = false;
    showStep(3);
    focusHeading(elements.stepResults);
  }

  function resetAll() {
    const language = state.language;
    elements.form.reset();
    Object.assign(state, { language, source: "", protectedValues: [], promptMode: "precision", finalizedCandidate: "", report: null, resetArmed: false });
    elements.sourceError.textContent = "";
    elements.briefError.textContent = "";
    elements.candidateError.textContent = "";
    elements.stepSource.hidden = false;
    elements.stepPrompt.hidden = true;
    elements.stepResults.hidden = true;
    elements.prompt.value = "";
    elements.finalizedCandidate.value = "";
    renderProtectedValues();
    byId("reset-button").textContent = currentCopy().resetAction;
    byId("reset-button").classList.remove("is-armed");
    showStep(1);
    toast(currentCopy().reset);
    focusHeading(elements.stepSource);
  }

  function requestReset() {
    if (state.resetArmed) {
      resetAll();
      return;
    }
    state.resetArmed = true;
    byId("reset-button").textContent = currentCopy().resetConfirm;
    byId("reset-button").classList.add("is-armed");
    toast(currentCopy().resetWarning);
  }

  byId("prepare-button").addEventListener("click", prepareSource);
  byId("back-to-source").addEventListener("click", returnToSource);
  byId("quick-prompt-button").addEventListener("click", restoreQuickPrompt);
  byId("clean-prompt-button").addEventListener("click", buildCleanPrompt);
  byId("copy-button").addEventListener("click", copyPrompt);
  byId("copy-draft-button").addEventListener("click", copyFinalizedCandidate);
  byId("download-button").addEventListener("click", downloadPrompt);
  byId("compare-button").addEventListener("click", compareCandidate);
  byId("revise-button").addEventListener("click", () => {
    showStep(2);
    elements.candidate.focus();
    elements.stepPrompt.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  byId("reset-button").addEventListener("click", requestReset);
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));

  setLanguage(initialLanguage);
  showStep(1);
}());
