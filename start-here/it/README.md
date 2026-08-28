# Parti da zero: per adesso non installare niente

Hai un testo scritto con l'aiuto di Claude. Idee e fatti sono tuoi, però vuoi una versione che non dipenda più dal modo in cui Claude li ha messi in frase.

Se non sei una persona tecnica, questa pagina è per te. Parti dal browser. Il Terminale arriva molto più avanti e soltanto se lo vuoi.

[Torna alla pagina principale](../../README.it.md) · [English version](../en/README.md) · [Guarda tutti i metodi](../../METHODS.it.md)

## La strada guidata più semplice

Apri [Rewrite Room in italiano](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it).

Rewrite Room non è un writer AI. È un prompt builder semplice e diretto, con un confronto locale alla fine. Tutta la scrittura avviene nel modello non Anthropic che scegli tu.

La prima obiezione è probabilmente: “Non so chi ospita quella pagina, dove finisce il mio testo e che cosa dovrei fare una volta aperta.” Giusto. Ecco tutto il percorso prima ancora del clic:

1. Incolla il testo.
2. Premi **Prepara il mio prompt di riscrittura**.
3. Copia il prompt in un modello di scrittura non Anthropic.
4. Riporta qui la bozza e premi **Controlla la nuova bozza**.

La pagina non usa AI e non consuma crediti AI. Il suo JavaScript prepara il prompt, protegge i valori esatti e confronta proprietà visibili della superficie dentro la scheda del browser. Non controlla il significato. Il modello di scrittura esterno può usare il suo piano gratuito, abbonamento o sistema di crediti. Se vuoi togliere di mezzo pure il dubbio sull'hosting, scarica questo repository e apri `docs/index.html` mentre sei offline.

### Passaggio 1: incolla la fonte

Usa un testo del quale idee e responsabilità finale sono tuoi. La pagina trova valori esatti comuni come date, numeri, URL, indirizzi email, citazioni e acronimi.

Se manca un nome o un termine che deve restare identico, aggiungilo tu. L'estrazione automatica è una lista di partenza, non l'oracolo.

### Passaggio 2: prepara e copia il prompt

Premi **Prepara il mio prompt di riscrittura**. La pagina produce un solo prompt completo, con testo e valori protetti già inseriti.

È più serio di “parafrasa questo”. Chiede all'altro modello di conservare affermazioni, precisazioni, tono e lunghezza approssimativa, ricostruendo però formulazione ordinaria, inizi di frase e passaggi. Copia tutto il prompt. Non copiare soltanto la parte con il testo.

### Passaggio 3: usa un modello non Anthropic

Apri il modello che preferisci, incolla il prompt come un solo messaggio e invialo. Un altro provider ospitato potrebbe applicare un proprio watermark o sistema di provenienza. Se vuoi zero crediti ospitati e nessun watermark del provider, usa un modello open locale. Richiede installazione e lo trovi spiegato più sotto.

### Passaggio 4: confronta la nuova bozza

Riporta la nuova bozza in Rewrite Room. Vedrai controlli separati per fatti protetti, frasi condivise, inizi delle frasi, struttura e lunghezza.

Se manca un fatto, sistema quello per primo. Se è rimasta una lunga sequenza identica, riscrivi tutto il passaggio invece di cambiare tre parole. Se la struttura è troppo vicina, rimetti le idee in un ordine diverso.

La pagina non può dirti che il detector privato di Anthropic accetterà il risultato. Ti dice quello che può misurare davvero.

### Vuoi una separazione più forte?

Apri la sezione avanzata a camera stagna dentro Rewrite Room. Ti chiede due buste, una per fatti e significato, una per voce e limiti. Il modello di scrittura riceve quelle buste senza le vecchie frasi. Richiede più tempo, che è esattamente il motivo per cui non è più il percorso predefinito.

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

Crea il prompt principale:

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.json
```

Se invece vuoi la coppia avanzata separata dalla fonte:

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --clean-room --out prompts.json
```

### 6. Controlla in locale la bozza ricevuta

Passa il prompt esportato al sistema non Anthropic che scegli. Salva la risposta come `candidato.txt`, poi esegui:

```bash
node bin/watermark-toolkit.js check sorgente.txt candidato.txt --lang it
```

Per due o più alternative, usa `compare`. La CLI non chiama modelli, non carica nulla e non sceglie un vincitore. Il batch locale automatico è stato testato e tolto perché i risultati non giustificavano la preparazione.

## Leggi il risultato della CLI senza tirare a indovinare

- `mechanicallyValid: true` significa che la bozza conserva i valori protetti automaticamente e resta nel margine di lunghezza predefinito. Non dice nulla su causalità, precisazioni o tono.
- `semanticStatus: "requires-manual-review"` resta in ogni resoconto perché una metrica locale non può approvare il significato.
- `ngramSurvival` misura le sequenze di quattro parole rimaste. Più basso significa più cambiamento della forma, non testo migliore.
- `longestSharedPhrase` mostra la sequenza ordinaria più lunga condivisa con la fonte.
- `mechanicalShortlist` conserva le bozze che superano i controlli configurati. `recommended` resta vuoto. Scegli tu dopo aver letto.

Nessun punteggio locale dimostra un risultato contro il detector privato di Anthropic.

Se ti aspettavi targeting o un torneo adattivo, li abbiamo tolti dopo il red-team. Il proxy poteva privilegiare fatti rari senza localizzare il segnale privato di Claude. Il torneo non adattava davvero la generazione. [La guida ai metodi](../../METHODS.it.md) spiega la decisione e i contratti più stretti rimasti.

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
