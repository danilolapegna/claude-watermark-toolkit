(function startRewriteRoom() {
  "use strict";

  const core = globalThis.RewriteRoomCore;
  if (!core) throw new Error("Rewrite Room core did not load.");

  const copy = {
    en: {
      eyebrow: "No account. No upload. No installation.",
      title: "Put the meaning in. Leave the old wording out.",
      intro: "This page will not hand you a magic detector score. It helps you separate facts and ideas from the original phrasing, then checks the new draft without sending either text anywhere.",
      localLabel: "Local:", localValue: "your text stays in this browser tab",
      promiseLabel: "Promise:", promiseValue: "useful comparison, not private-detector certification",
      step1Short: "Source", step2Short: "Meaning", step3Short: "New draft", step4Short: "Check",
      step1Kicker: "First, the obvious bit", step1Title: "Paste the source",
      step1Thought: "“So I paste a text into a random web page?” Fair question. This one has no server call. You can download the repository, open this file offline and get the same tool.",
      sourceLabel: "Source text", sourceHelp: "Use text you own and are prepared to stand behind. Nothing is saved when you close the tab.",
      extraSummary: "Add names or exact phrases the automatic check may miss", extraLabel: "One protected value per line",
      prepareAction: "Find the facts to protect",
      step2Kicker: "Now build the part that is actually yours", step2Title: "Make the two envelopes",
      step2Thought: "“This sounds like office theatre.” It is really just a clean break: one envelope holds facts and meaning, the other holds your voice. The old sentences go into neither.",
      factsEnvelope: "Envelope 1: facts and meaning", voiceEnvelope: "Envelope 2: your voice",
      purposeLabel: "What should the reader understand or do?", claimsLabel: "Ideas and claims, one per line", audienceLabel: "Who is this for?",
      protectedTitle: "Values to keep exact", protectedEmpty: "No automatic values found. Add any important names yourself.",
      voiceLabel: "How do you actually write?", voiceHelp: "Use concrete notes: short or crowded sentences, favorite connectors, level of formality, words you would never use.",
      constraintsLabel: "Length, format and other constraints", backSource: "Edit the source", sealAction: "Seal the source",
      step3Kicker: "The source is out of sight", step3Title: "Write from the brief",
      step3Thought: "“But I wanted the tool to rewrite it for me.” You still have that option. Copy the prompt into any non-Anthropic system. The important bit is that the writing conversation receives your two envelopes, not the old wording.",
      sealedTitle: "Source sealed in this tab", sealedBody: "It is hidden, not deleted or uploaded. Unseal it whenever you need to correct the brief.",
      promptLabel: "Source-free writing prompt", unsealAction: "Unseal and edit", downloadAction: "Download the brief", copyAction: "Copy the clean-room prompt",
      manualBridge: "Writing it yourself? Good. Keep this brief visible and the source closed, then come back with the draft.",
      candidateLabel: "Paste the new draft", compareAction: "Compare facts and wording",
      step4Kicker: "No magic score here", step4Title: "See what survived",
      step4Thought: "“Can you just tell me whether the watermark is gone?” No, and neither can a public tool honestly certify Anthropic's private detector. These checks answer narrower questions you can actually act on.",
      nextTitle: "What I would fix next", reviseAction: "Revise the draft", resetAction: "Clear everything", resetConfirm: "Click again to clear everything",
      boundaryKicker: "One useful boundary", boundaryTitle: "This helps with your own writing. It does not manufacture authorship.",
      boundaryBody: "Use it when the ideas, judgment and final responsibility are yours. If the underlying work belongs to somebody else, changing its surface does not make it yours.",
      footerText: "Part of the open-source Claude Watermark Toolkit.", footerLink: "Read the methods and research.",
      sourceError: "Paste the source before continuing.", briefError: "Add the purpose, at least one idea and a few real voice notes before sealing the source.", candidateError: "Paste a new draft before comparing it.",
      copied: "Prompt copied.", downloaded: "Brief downloaded.", reset: "Everything in this tab was cleared.", resetWarning: "One more click will clear the source, brief and draft.", clipboardFallback: "Select and copy the prompt manually.",
      protectedLabels: { url: "URL", email: "Email", date: "Date", number: "Number", quote: "Quote", acronym: "Acronym", manual: "Added by you" },
      verdictGood: "This is a useful new-draft check, with no obvious fact loss.", verdictReview: "The draft needs another pass before you rely on it.",
      factsCard: "Protected facts", factsGood: "All {count} protected values are present.", factsMissing: "Missing: {values}",
      phraseCard: "Longest shared phrase", phraseValue: "{count} words", phraseGood: "No long copied run found.", phraseReview: "Shared run: “{phrase}”",
      ngramCard: "Four-word phrase survival", ngramValue: "{value}%", ngramGood: "Most four-word sequences are new.", ngramReview: "A noticeable share of source phrasing remains.",
      openingCard: "Sentence-opening reuse", openingValue: "{value}%", openingGood: "Sentence openings have changed.", openingReview: "Several sentences still start the same way.",
      structureCard: "Structure similarity", structureValue: "{value}%", structureGood: "Paragraph and sentence shape changed.", structureReview: "The overall shape is still close to the source.",
      lengthCard: "Length compared with source", lengthValue: "{value}%", lengthGood: "The length stays in a useful range.", lengthReview: "A large length change deserves a fact and nuance check.",
      actionFacts: "Restore the missing protected values exactly: {values}.", actionPhrase: "Rewrite the longest shared passage as a whole. Do not swap its words one by one.",
      actionOpening: "Change how the repeated sentences begin and how they connect to the previous point.", actionStructure: "Try a different order for the claims or split and combine paragraphs differently.",
      actionLength: "Check whether the new length removed nuance or added unsupported material.", actionHuman: "Read it aloud. Remove any sentence that sounds like a system, not you.",
      noneDetected: "No protected values were detected.",
    },
    it: {
      eyebrow: "Niente account. Niente upload. Niente installazione.",
      title: "Metti dentro il significato. Lascia fuori le vecchie frasi.",
      intro: "Questa pagina non ti rifila il solito punteggio magico da detector. Ti aiuta a separare fatti e idee dalla formulazione originale, poi controlla la nuova bozza senza mandare da nessuna parte né l'una né l'altra.",
      localLabel: "Locale:", localValue: "il testo resta in questa scheda del browser",
      promiseLabel: "Promessa:", promiseValue: "un confronto utile, non una certificazione sul detector privato",
      step1Short: "Fonte", step2Short: "Significato", step3Short: "Nuova bozza", step4Short: "Controllo",
      step1Kicker: "Prima la parte ovvia", step1Title: "Incolla il testo",
      step1Thought: "“Quindi dovrei incollare un testo in una pagina a caso?” Domanda più che legittima. Questa non chiama alcun server. Puoi anche scaricare il repository, aprire il file offline e usare esattamente lo stesso strumento.",
      sourceLabel: "Testo di partenza", sourceHelp: "Usa un testo tuo, del quale sei disposto a prenderti la responsabilità. Quando chiudi la scheda non resta salvato nulla.",
      extraSummary: "Aggiungi nomi o formule esatte che il controllo automatico potrebbe non vedere", extraLabel: "Un valore da proteggere per riga",
      prepareAction: "Trova i fatti da proteggere",
      step2Kicker: "Ora costruisci la parte che è davvero tua", step2Title: "Prepara le due buste",
      step2Thought: "“Sembra un teatrino da ufficio.” In realtà è soltanto una separazione pulita: in una busta metti fatti e significato, nell'altra la tua voce. Le vecchie frasi non entrano in nessuna delle due.",
      factsEnvelope: "Busta 1: fatti e significato", voiceEnvelope: "Busta 2: la tua voce",
      purposeLabel: "Che cosa deve capire o fare chi legge?", claimsLabel: "Idee e affermazioni, una per riga", audienceLabel: "Per chi stai scrivendo?",
      protectedTitle: "Valori da conservare identici", protectedEmpty: "Non ho trovato valori automatici. Aggiungi tu gli eventuali nomi importanti.",
      voiceLabel: "Come scrivi davvero?", voiceHelp: "Usa note concrete: frasi brevi o affollate, connettivi che usi spesso, livello di formalità, parole che non diresti mai.",
      constraintsLabel: "Lunghezza, formato e altri vincoli", backSource: "Modifica il testo", sealAction: "Sigilla la fonte",
      step3Kicker: "La fonte ora è fuori vista", step3Title: "Scrivi partendo dalla scheda",
      step3Thought: "“Però io volevo che lo strumento riscrivesse al posto mio.” Puoi ancora farlo. Copia il prompt in qualunque sistema non Anthropic. La cosa importante è che la conversazione di scrittura riceva le due buste, non le vecchie frasi.",
      sealedTitle: "Fonte sigillata in questa scheda", sealedBody: "È nascosta, non cancellata né caricata. Puoi riaprirla quando vuoi correggere la scheda.",
      promptLabel: "Prompt di scrittura senza la fonte", unsealAction: "Riapri e modifica", downloadAction: "Scarica la scheda", copyAction: "Copia il prompt a camera stagna",
      manualBridge: "Scrivi tu? Bene. Tieni davanti questa scheda e lascia chiusa la fonte, poi torna qui con la nuova bozza.",
      candidateLabel: "Incolla la nuova bozza", compareAction: "Confronta fatti e formulazione",
      step4Kicker: "Qui non c'è un punteggio magico", step4Title: "Guarda che cosa è sopravvissuto",
      step4Thought: "“Non puoi dirmi semplicemente se il watermark è sparito?” No. E nessuno strumento pubblico può certificare onestamente il detector privato di Anthropic. Questi controlli rispondono a domande più strette, ma almeno ci puoi fare qualcosa.",
      nextTitle: "Che cosa sistemerei adesso", reviseAction: "Rivedi la bozza", resetAction: "Cancella tutto", resetConfirm: "Clicca ancora per cancellare tutto",
      boundaryKicker: "Un confine che serve", boundaryTitle: "Ti aiuta con un testo tuo. Non fabbrica la paternità di un testo.",
      boundaryBody: "Usalo quando idee, giudizio e responsabilità finale sono tuoi. Se il lavoro alla base appartiene a qualcun altro, cambiarne la superficie non lo rende tuo.",
      footerText: "Parte del Claude Watermark Toolkit open source.", footerLink: "Leggi metodi e ricerca.",
      sourceError: "Incolla il testo prima di continuare.", briefError: "Aggiungi lo scopo, almeno un'idea e qualche nota vera sulla tua voce prima di sigillare la fonte.", candidateError: "Incolla una nuova bozza prima di confrontarla.",
      copied: "Prompt copiato.", downloaded: "Scheda scaricata.", reset: "Ho cancellato tutto ciò che era in questa scheda.", resetWarning: "Un altro clic cancellerà fonte, scheda e bozza.", clipboardFallback: "Seleziona il prompt e copialo manualmente.",
      protectedLabels: { url: "URL", email: "Email", date: "Data", number: "Numero", quote: "Citazione", acronym: "Acronimo", manual: "Aggiunto da te" },
      verdictGood: "È un controllo utile su una bozza nuova, senza perdite evidenti nei fatti.", verdictReview: "La bozza merita un altro giro prima che tu possa fidartene.",
      factsCard: "Fatti protetti", factsGood: "Sono presenti tutti i {count} valori protetti.", factsMissing: "Mancano: {values}",
      phraseCard: "Sequenza identica più lunga", phraseValue: "{count} parole", phraseGood: "Non ho trovato lunghe sequenze copiate.", phraseReview: "Sequenza condivisa: “{phrase}”",
      ngramCard: "Sequenze di quattro parole rimaste", ngramValue: "{value}%", ngramGood: "Quasi tutte le sequenze di quattro parole sono nuove.", ngramReview: "È rimasta una parte non trascurabile della formulazione originale.",
      openingCard: "Inizi di frase riutilizzati", openingValue: "{value}%", openingGood: "Gli inizi delle frasi sono cambiati.", openingReview: "Diverse frasi partono ancora nello stesso modo.",
      structureCard: "Somiglianza della struttura", structureValue: "{value}%", structureGood: "La forma di paragrafi e frasi è cambiata.", structureReview: "La forma complessiva è ancora vicina alla fonte.",
      lengthCard: "Lunghezza rispetto alla fonte", lengthValue: "{value}%", lengthGood: "La lunghezza resta in un intervallo sensato.", lengthReview: "Una differenza grande di lunghezza richiede un controllo di fatti e sfumature.",
      actionFacts: "Ripristina esattamente questi valori protetti: {values}.", actionPhrase: "Riscrivi per intero il passaggio identico più lungo. Non cambiare una parola alla volta.",
      actionOpening: "Cambia l'inizio delle frasi ripetute e il modo in cui si legano al punto precedente.", actionStructure: "Prova un ordine diverso delle idee oppure dividi e unisci i paragrafi in modo nuovo.",
      actionLength: "Controlla se la nuova lunghezza ha eliminato sfumature o aggiunto materiale non supportato.", actionHuman: "Leggilo ad alta voce. Togli ogni frase che sembra scritta da un sistema e non da te.",
      noneDetected: "Non sono stati rilevati valori da proteggere.",
    },
  };

  const state = { language: "en", source: "", protectedValues: [], sealed: false, report: null, resetArmed: false };
  const byId = (id) => document.getElementById(id);
  const elements = {
    form: byId("rewrite-form"), source: byId("source-text"), extras: byId("extra-values"), sourceError: byId("source-error"),
    stepSource: byId("step-source"), stepMeaning: byId("step-meaning"), stepDraft: byId("step-draft"), stepResults: byId("step-results"),
    protectedList: byId("protected-list"), protectedEmpty: byId("protected-empty"), purpose: byId("purpose"), claims: byId("claims"), audience: byId("audience"),
    voice: byId("voice"), constraints: byId("constraints"), briefError: byId("brief-error"), prompt: byId("clean-prompt"),
    candidate: byId("candidate-text"), candidateError: byId("candidate-error"), verdict: byId("verdict"), resultGrid: byId("result-grid"),
    nextActions: byId("next-actions"), toast: byId("toast"),
  };

  function interpolate(template, values) {
    return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), template);
  }

  function currentCopy() { return copy[state.language]; }

  function setLanguage(language) {
    if (!copy[language]) return;
    state.language = language;
    document.documentElement.lang = language;
    document.title = language === "it" ? "Rewrite Room | Toolkit watermark testi Claude" : "Rewrite Room | Claude Watermark Toolkit";
    document.querySelectorAll("[data-copy]").forEach((node) => {
      const value = currentCopy()[node.dataset.copy];
      if (value) node.textContent = value;
    });
    byId("reset-button").textContent = state.resetArmed ? currentCopy().resetConfirm : currentCopy().resetAction;
    byId("reset-button").classList.toggle("is-armed", state.resetArmed);
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderProtectedValues();
    if (state.sealed) updatePrompt();
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

  function brief() {
    return {
      purpose: elements.purpose.value.trim(), claims: elements.claims.value.trim(), audience: elements.audience.value.trim(),
      voice: elements.voice.value.trim(), constraints: elements.constraints.value.trim(), protectedValues: state.protectedValues,
    };
  }

  function updatePrompt() {
    elements.prompt.value = core.buildCleanRoomPrompt(brief(), state.language);
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
    renderProtectedValues();
    elements.stepMeaning.hidden = false;
    showStep(2);
    focusHeading(elements.stepMeaning);
  }

  function sealSource() {
    elements.briefError.textContent = "";
    const values = brief();
    if (!values.purpose || !values.claims || !values.voice) {
      elements.briefError.textContent = currentCopy().briefError;
      const firstEmpty = [elements.purpose, elements.claims, elements.voice].find((field) => !field.value.trim());
      firstEmpty.focus();
      return;
    }
    state.sealed = true;
    updatePrompt();
    elements.stepSource.hidden = true;
    elements.stepMeaning.hidden = true;
    elements.stepDraft.hidden = false;
    showStep(3);
    focusHeading(elements.stepDraft);
  }

  function unsealSource() {
    state.sealed = false;
    elements.stepSource.hidden = false;
    elements.stepMeaning.hidden = false;
    elements.stepDraft.hidden = true;
    elements.stepResults.hidden = true;
    state.report = null;
    showStep(2);
    focusHeading(elements.stepMeaning);
  }

  function toast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    globalThis.setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
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

  function downloadPrompt() {
    updatePrompt();
    const blob = new Blob([elements.prompt.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = state.language === "it" ? "scheda-riscrittura.txt" : "rewrite-brief.txt";
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
    if (report.longestSharedPhrase.length >= 8 || report.ngramSurvival[4] > 0.2) actions.push(c.actionPhrase);
    if (report.sentenceOpeningReuse > 0.3) actions.push(c.actionOpening);
    if (report.structureSimilarity > 0.82) actions.push(c.actionStructure);
    if (report.lengthRatio < 0.55 || report.lengthRatio > 1.65) actions.push(c.actionLength);
    actions.push(c.actionHuman);
    return actions;
  }

  function renderReport(report) {
    const c = currentCopy();
    const needsReview = report.missingProtectedValues.length > 0 || report.ngramSurvival[4] > 0.2 || report.longestSharedPhrase.length >= 8;
    elements.verdict.className = `verdict ${needsReview ? "verdict-review" : "verdict-good"}`;
    elements.verdict.textContent = needsReview ? c.verdictReview : c.verdictGood;
    elements.resultGrid.replaceChildren();

    const retained = Math.round(report.protectedRetention * 100);
    const factBody = report.missingProtectedValues.length
      ? interpolate(c.factsMissing, { values: report.missingProtectedValues.map((item) => item.value).join(", ") })
      : (report.protectedCount ? interpolate(c.factsGood, { count: report.protectedCount }) : c.noneDetected);
    elements.resultGrid.append(resultCard(c.factsCard, `${retained}%`, factBody, report.missingProtectedValues.length ? "review" : "good"));

    const phraseReview = report.longestSharedPhrase.length >= 8;
    elements.resultGrid.append(resultCard(
      c.phraseCard,
      interpolate(c.phraseValue, { count: report.longestSharedPhrase.length }),
      phraseReview ? interpolate(c.phraseReview, { phrase: report.longestSharedPhrase.phrase }) : c.phraseGood,
      phraseReview ? "review" : "good",
    ));

    const ngramPercent = Math.round(report.ngramSurvival[4] * 100);
    elements.resultGrid.append(resultCard(c.ngramCard, interpolate(c.ngramValue, { value: ngramPercent }), ngramPercent > 20 ? c.ngramReview : c.ngramGood, ngramPercent > 20 ? "review" : "good"));

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
    const candidate = elements.candidate.value.trim();
    if (!candidate) {
      elements.candidateError.textContent = currentCopy().candidateError;
      elements.candidate.focus();
      return;
    }
    state.report = core.compareTexts(state.source, candidate, state.protectedValues);
    renderReport(state.report);
    elements.stepResults.hidden = false;
    showStep(4);
    focusHeading(elements.stepResults);
  }

  function resetAll() {
    const language = state.language;
    elements.form.reset();
    Object.assign(state, { language, source: "", protectedValues: [], sealed: false, report: null, resetArmed: false });
    elements.sourceError.textContent = "";
    elements.briefError.textContent = "";
    elements.candidateError.textContent = "";
    elements.stepSource.hidden = false;
    elements.stepMeaning.hidden = true;
    elements.stepDraft.hidden = true;
    elements.stepResults.hidden = true;
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

  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  byId("prepare-button").addEventListener("click", prepareSource);
  byId("back-to-source").addEventListener("click", () => { showStep(1); focusHeading(elements.stepSource); });
  byId("seal-button").addEventListener("click", sealSource);
  byId("unseal-button").addEventListener("click", unsealSource);
  byId("copy-button").addEventListener("click", copyPrompt);
  byId("download-button").addEventListener("click", downloadPrompt);
  byId("compare-button").addEventListener("click", compareCandidate);
  byId("revise-button").addEventListener("click", () => { showStep(3); elements.candidate.focus(); elements.candidate.scrollIntoView({ block: "center" }); });
  byId("reset-button").addEventListener("click", requestReset);
  elements.form.addEventListener("submit", (event) => event.preventDefault());
  setLanguage("en");
}());
