# Parti da zero: per adesso non installare niente

Hai un testo scritto con l'aiuto di Claude. Idee e fatti sono tuoi, però vuoi una versione che non dipenda più dal modo in cui Claude li ha messi in frase.

Se non sei una persona tecnica, questa pagina è per te. Parti dal browser. Il Terminale arriva molto più avanti e soltanto se lo vuoi.

[Torna alla pagina principale](../../README.it.md) · [English version](../en/README.md) · [Guarda tutti i metodi](../../METHODS.it.md)

## La strada guidata più semplice

Apri [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/).

La prima obiezione è probabilmente: “Non so chi ospita quella pagina e dove finisca il mio testo.” Giusto. La pagina non ha un server che riceve il testo. Il JavaScript lavora nella scheda del browser. Se vuoi togliere di mezzo pure il dubbio sull'hosting, scarica il repository e apri `docs/index.html` mentre sei offline.

### Passaggio 1: incolla la fonte

Usa un testo del quale idee e responsabilità finale sono tuoi. La pagina trova valori esatti comuni come date, numeri, URL, indirizzi email, citazioni e acronimi.

Se manca un nome o un termine che deve restare identico, aggiungilo tu. L'estrazione automatica è una lista di partenza, non l'oracolo.

### Passaggio 2: prepara le due buste

Nella Busta 1 vanno fatti e significato:

- che cosa deve capire o fare chi legge;
- un'idea o un'affermazione per riga;
- il pubblico;
- i valori esatti che devono sopravvivere.

Nella Busta 2 va la tua voce:

- ritmo delle frasi;
- livello di formalità;
- connettivi che usi naturalmente;
- parole e formule che non useresti mai;
- vincoli di formato e lunghezza.

Può sembrare più lento di chiedere una parafrasi. Lo è. Quei pochi minuti servono proprio a impedire che il passaggio di scrittura copi alla cieca la vecchia struttura.

### Passaggio 3: sigilla la fonte

La pagina nasconde il testo originale e crea un prompt senza fonte. Non lo cancella dalla scheda aperta, quindi puoi riaprirlo e correggere la scheda quando serve.

Scrivi tu partendo dalle due buste, oppure copia il prompt in un sistema non Anthropic. Il sistema che scrive non dovrebbe mai ricevere la fonte.

### Passaggio 4: confronta la bozza

Riporta la nuova bozza in Rewrite Room. Vedrai controlli separati per fatti protetti, frasi condivise, inizi delle frasi, struttura e lunghezza.

Se manca un fatto, sistema quello per primo. Se è rimasta una lunga sequenza identica, riscrivi tutto il passaggio invece di cambiare tre parole. Se la struttura è troppo vicina, rimetti le idee in un ordine diverso.

La pagina non può dirti che il detector privato di Anthropic accetterà il risultato. Ti dice quello che può misurare davvero.

## La strada manuale, se anche il form ti sembra di troppo

Sì, il metodo può essere una pagina bianca.

1. Leggi la fonte una volta.
2. Segna con appunti brevi scopo, idee, prove e valori esatti.
3. Aggiungi tre indicazioni concrete sulla tua voce.
4. Chiudi la fonte.
5. Scegli l'ordine che serve a chi legge, non quello che trovi già sulla pagina.
6. Scrivi di nuovo.
7. Riapri la fonte e confronta soltanto i fatti.
8. Leggi il risultato ad alta voce e togli le frasi che non diresti mai.

Questo è il metodo intero, non il ripiego povero. Costa il tuo tempo. [Guarda dove fallisce più spesso](../../methods/human-redraft/README.md).

## Voglio che scriva un altro sistema partendo dalla scheda

Usa due contesti separati in un sistema non Anthropic. Non due messaggi nella stessa conversazione.

### Contesto di ricerca

1. Apri il [prompt di ricerca](../../prompts/it/research-pass.md).
2. Incollalo con la fonte in un sistema non Anthropic.
3. Confronta la scheda ottenuta con la fonte.
4. Correggi fatti mancanti, aggiunte inventate e precisazioni appiattite.

### Contesto di scrittura

1. Apri una conversazione completamente nuova.
2. Apri il [prompt di scrittura](../../prompts/it/drafting-pass.md).
3. Incolla la scheda controllata, mai la fonte.
4. Chiedi due ordini diversi delle idee se la prima versione sembra ancora troppo vicina.
5. Controlla personalmente ogni fatto.

Se lavori già con agenti, copia la [skill pronta](../../skills/non-anthropic-text-rewrite/SKILL.md). Contiene lo stesso confine sui provider e gli stessi criteri di stop.

## Voglio la CLI locale

Se il Terminale ti sembra una punizione non necessaria, fermati qui e usa uno dei percorsi sopra. La CLI serve per il lavoro ripetuto e per i report leggibili da altri strumenti.

### 1. Scarica il toolkit

Il modo più facile è lo ZIP di GitHub:

1. Apri la [pagina del repository](https://github.com/danilolapegna/claude-watermark-toolkit).
2. Premi il pulsante verde **Code**.
3. Scegli **Download ZIP**.
4. Estrai il file.

Se usi già Git:

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
```

### 2. Apri il Terminale nella cartella

**Windows:** apri la cartella estratta in Esplora file, fai clic sulla barra dell'indirizzo, scrivi `powershell` e premi Invio.

**macOS:** apri Terminale, scrivi `cd ` lasciando uno spazio, trascina la cartella estratta nella finestra e premi Invio.

**Linux:** apri la cartella nel gestore file, fai clic con il tasto destro e scegli **Apri nel terminale**. Il nome può cambiare in base al sistema.

### 3. Controlla Node.js

Esegui:

```bash
node --version
```

Se vedi `v20` o un numero superiore, continua. Altrimenti installa la versione LTS attuale da [nodejs.org](https://nodejs.org/) e riapri il Terminale.

### 4. Controlla il toolkit

```bash
npm test
```

Dovresti vedere test superati e zero errori.

### 5. Aggiungi il testo

Crea `sorgente.txt` nella cartella del toolkit, incolla il testo e salva. Poi esegui:

```bash
node bin/watermark-toolkit.js start sorgente.txt --lang it
```

Crea i due prompt:

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.json
```

### 6. Tieni in locale anche la riscrittura

Installa [Ollama](https://ollama.com/) e scegli un modello locale che non sia di Anthropic. Controlla che funzioni dentro Ollama, poi usa il nome esatto:

```bash
node bin/watermark-toolkit.js rewrite sorgente.txt \
  --lang it \
  --provider ollama \
  --model IL_TUO_MODELLO_LOCALE \
  --out risultato.json
```

La fonte va al processo Ollama sul tuo computer. Non va a questo repository e non va ad Anthropic.

## Voglio i metodi avanzati

La domanda legittima qui è: “Se il metodo semplice è forte, perché ci sono targeting e insieme Pareto?” Perché su lavori lunghi o ripetuti cambia il costo.

- La [microchirurgia guidata dalla confidenza](../../methods/information-targeted/README.md) spende un budget limitato di modifiche su passaggi selezionati, dopo aver protetto i fatti.
- Il [torneo fra candidati](../../methods/adaptive-search/README.md) genera più strutture e mantiene visibili i compromessi non dominati.
- Le [catene indipendenti](../../methods/independent-rewrite-chain/README.it.md) ripartono sempre dalla stessa scheda controllata, mai dalla bozza precedente.

Sono strade sperimentali o costose. Prima di usarle leggi bene il confine dell'evidenza.

## Leggi il risultato della CLI senza tirare a indovinare

- `valid: true` significa che la bozza conserva i valori protetti automaticamente e resta nel margine di lunghezza predefinito.
- `ngramSurvival` misura le sequenze di quattro parole rimaste. Più basso significa più cambiamento della forma, non testo migliore.
- `readability` è un segnale approssimativo di facilità di lettura, non un voto.
- `recommended` è la scelta prodotta dai pesi pubblici sull'insieme Pareto. Puoi leggere e scegliere un altro candidato.

Nessun punteggio locale dimostra un risultato contro il detector privato di Anthropic.

## Se qualcosa non funziona

### `node` non viene riconosciuto o trovato

Installa Node.js LTS, chiudi il Terminale, riaprilo nella cartella e ripeti `node --version`.

### `Source text is empty`

Controlla che `sorgente.txt` contenga testo normale, salva e ripeti il comando.

### `Blocked provider configuration`

L'indirizzo del provider o il nome del modello rimanda ad Anthropic o Claude. Scegli un modello non Anthropic.

### È sparito un nome o un valore esatto

Proteggilo esplicitamente:

```bash
node bin/watermark-toolkit.js prepare sorgente.txt --lang it --protect "Nome Esatto" --out caso.json
```

## Prima di pubblicare

Controlla ogni fatto. Leggi il testo ad alta voce. Togli le frasi che non ti somigliano. Poi prendi tu la decisione editoriale.

[Guarda un esempio completo](../../examples/walkthrough.it.md) · [Confronta tutti i metodi](../../METHODS.it.md) · [Leggi che cosa sappiamo](../../CLAIMS.md)
