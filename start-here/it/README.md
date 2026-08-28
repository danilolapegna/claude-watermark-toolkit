# Parti da qui: scegli un percorso e portalo fino in fondo

Hai un testo scritto con l'aiuto di Claude e vuoi una versione davvero nuova, senza perdere idee e fatti.

**Se hai fretta, usa il Percorso 1.** Non devi prima leggere tutto il repository. Non ti serve un detector.

[Torna alla pagina principale](../../README.it.md) · [English version](../en/README.md)

---

## Percorso 1: voglio il metodo più semplice

- **Tempo:** 10-30 minuti
- **Software:** nessuno
- **Privacy:** il testo resta con te

### 1. Prepara una scheda

Leggi la fonte una volta. Su una pagina vuota, compila questo piccolo schema:

```text
SCOPO:
Che cosa deve capire o fare chi legge?

DA CONSERVARE:
- Idea principale
- Fatto, numero, nome, data o URL
- Citazione esatta o fonte
- Condizione o eccezione importante

LA MIA VOCE:
- Una frase su come scrivo di solito
- Una cosa che non direi mai
```

Usa appunti brevi. Non copiare frasi intere, salvo le citazioni che devono restare esatte.

### 2. Chiudi la fonte

È il passaggio importante. Non tenerla accanto alla pagina vuota.

### 3. Scegli un ordine nuovo

Chiediti che cosa serve prima a chi leggerà. Metti i punti in quell'ordine, invece di seguire i vecchi paragrafi.

### 4. Scrivi da capo

Parti dalla scheda e usa parole che diresti davvero. Se una frase ti sembra troppo levigata per essere tua, semplificala.

### 5. Controlla i fatti, non lo stile

Riapri la fonte. Verifica ogni numero, nome, link, citazione e precisazione. Poi leggi il nuovo testo ad alta voce.

Hai finito. Apri il [metodo manuale completo](../../methods/human-redraft/README.md) se vuoi vedere anche gli errori più comuni e i controlli finali.

---

## Percorso 2: voglio farmi aiutare da un altro sistema AI

- **Tempo:** 10-20 minuti
- **Software:** un sistema AI non Anthropic
- **Privacy:** dipende dallo strumento che scegli

Servono due conversazioni separate, non due messaggi nella stessa chat.

### Conversazione 1: crea la scheda

1. Apri il [prompt di ricerca](../../prompts/it/research-pass.md).
2. Copia tutto il prompt.
3. Incollalo in un sistema non Anthropic insieme al testo originale.
4. Confronta la scheda ottenuta con la fonte. Correggi fatti mancanti o sbagliati.

### Conversazione 2: scrivi la nuova versione

1. Apri una conversazione completamente nuova.
2. Apri e copia il [prompt di scrittura](../../prompts/it/drafting-pass.md).
3. Incolla la scheda controllata nel punto indicato.
4. Non incollare il testo originale.
5. Chiedi due strutture diverse se la prima versione sembra ancora troppo vicina alla fonte.

Alla fine controlla ogni fatto e leggi il risultato ad alta voce. Una frase scorrevole può comunque essere falsa.

---

## Percorso 3: voglio usare lo strumento locale

- **Tempo:** circa 15 minuti per prepararlo
- **Software:** Node.js 20 o successivo
- **Privacy:** analisi e creazione dei prompt restano sul tuo computer

Se il Terminale ti sembra una complicazione inutile, usa il Percorso 1 o 2. Il metodo centrale non cambia.

### 1. Scarica il toolkit

Il modo più semplice è lo ZIP di GitHub:

1. Apri la [pagina del repository](https://github.com/danilolapegna/claude-watermark-toolkit).
2. Premi il pulsante verde **Code**.
3. Scegli **Download ZIP**.
4. Estrai il file scaricato.

Se usi già Git, puoi invece clonarlo:

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
```

### 2. Apri il Terminale dentro quella cartella

**Windows:** apri la cartella estratta in Esplora file, fai clic sulla barra dell'indirizzo, scrivi `powershell` e premi Invio.

**macOS:** apri Terminale, scrivi `cd ` lasciando uno spazio, trascina la cartella estratta dentro la finestra del Terminale e premi Invio.

**Linux:** apri la cartella estratta nel gestore file, fai clic con il tasto destro e scegli **Apri nel terminale**. Il nome può cambiare in base al sistema.

### 3. Controlla Node.js

Esegui:

```bash
node --version
```

Se vedi `v20` o un numero superiore, continua. Se il sistema non trova il comando o il numero è più basso, installa la versione LTS attuale da [nodejs.org](https://nodejs.org/), poi riapri il Terminale.

### 4. Controlla il toolkit

```bash
npm test
```

Dovresti vedere un elenco di test superati e zero errori.

### 5. Aggiungi il tuo testo

Crea nella cartella del toolkit un file di testo normale chiamato `sorgente.txt`. Incolla il testo e salva.

Poi esegui:

```bash
node bin/watermark-toolkit.js start sorgente.txt --lang it
```

Lo strumento consiglia un percorso e conta i valori che devono restare.

### 6. Crea i due prompt

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.json
```

Apri `prompt.json` con un qualsiasi editor di testo. Contiene le istruzioni di ricerca e scrittura per il metodo a due conversazioni.

---

## Percorso 4: voglio tenere in locale anche la riscrittura

Installa [Ollama](https://ollama.com/) e scegli un modello locale non Anthropic. Prima controlla che il modello funzioni dentro Ollama.

Poi usa il nome esatto del modello in questo comando:

```bash
node bin/watermark-toolkit.js rewrite sorgente.txt \
  --lang it \
  --provider ollama \
  --model IL_TUO_MODELLO_LOCALE \
  --out risultato.json
```

Sostituisci `IL_TUO_MODELLO_LOCALE` con il nome mostrato da Ollama. Il processo Ollama sul tuo computer riceve il testo. Questo repository e Anthropic no.

---

## Leggi il risultato senza andare a intuito

- `valid: true` significa che la versione ha conservato tutti i valori protetti automaticamente ed è rimasta nel margine di lunghezza previsto.
- `ngramSurvival` mostra quante sequenze di quattro parole coincidono ancora con la fonte. Un numero basso indica un cambiamento maggiore della forma, non una qualità migliore.
- `readability` è un indicatore approssimativo di facilità di lettura da 0 a 100. Non è un voto.
- `recommended` è la versione che bilancia meglio gli obiettivi pubblici. Leggi anche gli altri candidati dell'insieme Pareto, cioè le bozze con compromessi diversi e senza un unico vincitore netto.

Nessun punteggio dimostra che il detector privato di Anthropic accetterebbe il testo. Questi valori servono a confrontare le versioni senza perdere i fatti.

---

## Se qualcosa non funziona

### `node` non viene riconosciuto o trovato

Installa Node.js LTS da [nodejs.org](https://nodejs.org/), chiudi il Terminale, riaprilo nella cartella del toolkit e ripeti `node --version`.

### `Source text is empty`

Apri `sorgente.txt` e controlla che contenga testo normale. Salva e ripeti il comando.

### `Blocked provider configuration`

L'indirizzo del provider o il nome del modello rimanda ad Anthropic o Claude. Scegli un modello non Anthropic.

### `Provider timed out`

Il modello locale potrebbe essere ancora in caricamento. Riprova una volta. Se continua, usa il comando offline `prompt` del Percorso 3.

### È sparito un nome o un valore esatto

Proteggilo in modo esplicito:

```bash
node bin/watermark-toolkit.js prepare sorgente.txt --lang it --protect "Nome Esatto" --out caso.json
```

---

## Prima di pubblicare

Controlla ogni fatto. Leggi il testo ad alta voce. Elimina le frasi che non diresti mai. Prenditi la responsabilità delle parole finali.

[Guarda un esempio completo](../../examples/walkthrough.it.md) · [Confronta tutti i metodi](../../LIMITS.md) · [Leggi che cosa sappiamo davvero](../../CLAIMS.md)
