# Parti da qui: non serve essere tecnici

Hai un testo che potrebbe contenere la filigrana statistica di Claude. Vuoi una versione nuova che conservi idee e fatti.

Scegli la situazione più vicina alla tua.

## Ho dieci minuti e non voglio installare nulla

Usa la [riscrittura umana da zero](../../methods/human-redraft/README.md). Prepara una scheda dei fatti, chiudi il testo e riscrivi partendo dalla scheda.

## Voglio farmi aiutare da un altro sistema AI

Usa due conversazioni separate in un sistema non Anthropic.

1. La prima conversazione legge il testo e produce una scheda fattuale.
2. Tu controlli la scheda.
3. La seconda conversazione vede solo la scheda e scrive una nuova versione.

Copia [il prompt di ricerca](../../prompts/it/research-pass.md), poi [il prompt di scrittura](../../prompts/it/drafting-pass.md).

## Voglio usare lo strumento locale

### Passo 1: controlla Node.js

Apri Terminale su macOS o Linux, oppure PowerShell su Windows. Esegui:

```bash
node --version
```

Se il numero inizia con 20 o più, puoi continuare. Altrimenti installa la versione LTS attuale da [nodejs.org](https://nodejs.org/).

### Passo 2: scarica il repository

Se hai Git:

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
```

Se non hai Git, apri il repository su GitHub, scegli Code e poi Download ZIP. Estrai la cartella e apri il Terminale al suo interno.

### Passo 3: prova lo strumento

```bash
npm test
```

Dovresti vedere almeno dodici test superati e zero errori.

### Passo 4: analizza il testo

Salva il testo come `sorgente.txt` nella cartella del repository. Esegui:

```bash
node bin/watermark-toolkit.js start sorgente.txt --lang it
```

Lo strumento consiglia un metodo e conta i valori che devono restare.

### Passo 5: crea i due prompt

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.json
```

Apri `prompt.json` con un editor di testo. Troverai le istruzioni esatte per le due conversazioni separate.

## Voglio che il testo resti sul mio computer

Installa [Ollama](https://ollama.com/), scegli un modello locale non Anthropic e controlla che funzioni. Poi esegui:

```bash
node bin/watermark-toolkit.js rewrite sorgente.txt \
  --lang it \
  --provider ollama \
  --model IL_TUO_MODELLO_LOCALE \
  --out risultato.json
```

Sostituisci `IL_TUO_MODELLO_LOCALE` con il nome esatto mostrato da Ollama.

## Come leggere il risultato

- `valid: true` significa che la versione ha conservato tutti i valori protetti automaticamente ed è rimasta nel margine di lunghezza previsto.
- `ngramSurvival` indica quante sequenze di quattro parole della fonte sono ancora presenti. Un valore basso segnala un cambiamento maggiore della forma.
- `readability` è un indicatore approssimativo da 0 a 100. Non è un voto di qualità.
- `recommended` indica il candidato che bilancia meglio gli obiettivi pubblici. Leggi anche gli altri candidati Pareto.

## Se qualcosa non funziona

### “Source text is empty”

Controlla che il file contenga testo normale e che il percorso sia corretto.

### “Blocked provider configuration”

L'URL o il nome del modello contiene Anthropic o Claude. Scegli un sistema non Anthropic.

### “Provider timed out”

Il modello locale potrebbe essere ancora in caricamento. Riprova una volta. Se continua, usa il comando offline `prompt`.

### È sparito un nome

Proteggilo in modo esplicito:

```bash
node bin/watermark-toolkit.js prepare sorgente.txt --lang it --protect "Nome Esatto" --out caso.json
```

## Controllo finale

Non pubblicare un testo solo perché il punteggio sembra buono. Controlla ogni fatto, leggilo ad alta voce e prenditi la responsabilità delle parole finali.

