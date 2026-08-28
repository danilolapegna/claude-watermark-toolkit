# La CLI facoltativa, spiegata partendo da zero

[English](README.md) · [Parti senza Terminale](../../start-here/it/README.md) · [Fai scrivere il modello in locale](../local-model/README.it.md)

> **CLI significa:** uno strumento che usi scrivendo comandi nel Terminale<br>
> **Usala quando:** ripeti spesso il lavoro, hai file lunghi o vuoi conservare un resoconto<br>
> **Saltala quando:** hai un solo testo e vuoi la strada più semplice<br>
> **Chiama un modello di scrittura:** no

## Quale problema risolve?

Per un testo, Rewrite Room è più semplice. La CLI serve quando copiare e controllare nel browser diventa ripetitivo e vuoi eseguire sempre gli stessi passaggi su file locali.

Non scrive meglio. Non trova un watermark. Fa due lavori utili:

1. trasforma un file di testo nello stesso prompt accurato di Rewrite Room;
2. confronta la bozza ricevuta con la fonte e ripristina gli eventuali segnaposto protetti.

Tutto il resto è facoltativo.

## I quattro pezzi del percorso normale

| File | Chi lo crea | Che cosa contiene | Dove va dopo |
|---|---|---|---|
| `sorgente.txt` | tu | il testo originale | lo leggono i comandi `prompt` e `check` |
| `prompt.txt` | la CLI | l'istruzione completa con la fonte protetta | lo incolli per intero nel writer non Anthropic |
| `bozza.txt` | tu | la risposta del writer | la legge il comando `check` |
| risultato nel Terminale | la CLI | bozza ripristinata e resoconto meccanico spiegato | tu controlli e approvi il significato |

Il “writer” è semplicemente chi scrive la nuova bozza. Può essere una chat non Anthropic ospitata, [LM Studio o Ollama sul tuo computer](../local-model/README.it.md), oppure una persona. La CLI non gli invia il file al posto tuo.

## Installazione partendo da zero

### 1. Scarica il repository

Apri [il repository su GitHub](https://github.com/danilolapegna/claude-watermark-toolkit), premi **Code** e poi **Download ZIP**. Estrai lo ZIP.

### 2. Apri un Terminale dentro quella cartella

- **Windows:** apri la cartella, clicca la barra dell'indirizzo di Esplora file, scrivi `powershell` e premi Invio.
- **macOS:** apri Terminale, scrivi `cd ` lasciando uno spazio, trascina la cartella estratta nella finestra e premi Invio.
- **Linux:** clicca con il tasto destro dentro la cartella e scegli **Apri nel Terminale**. La formula cambia secondo il desktop.

### 3. Controlla Node.js

Esegui:

```bash
node --version
```

Se vedi `v20` o un numero più alto, continua. Altrimenti installa la versione LTS corrente da [nodejs.org](https://nodejs.org/) e riapri il Terminale.

### 4. Controlla il toolkit

```bash
npm test
```

Continua soltanto se il comando indica zero test falliti.

## Il percorso normale, un comando alla volta

### Passaggio 1: crea `sorgente.txt`

Dentro la cartella del toolkit crea un file di testo semplice chiamato `sorgente.txt`. Incolla il testo originale e salvalo.

### Passaggio 2: fatti mostrare il percorso col tuo vero nome file

```bash
node bin/watermark-toolkit.js start sorgente.txt --lang it
```

Il comando legge il file e stampa i passaggi successivi. Non modifica nulla.

### Passaggio 3: crea il file col prompt

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.txt
```

Apri `prompt.txt`. Contiene un unico prompt completo, non codice e non un resoconto nascosto. Copialo tutto nel writer non Anthropic che hai scelto.

La CLI sostituisce temporaneamente i valori esatti più comuni con segnaposto come `[PV-01]`. Significa: “conserva questo posto identico; il toolkit rimetterà qui il valore originale”.

### Passaggio 4: salva la risposta del writer

Copia la risposta in un nuovo file di testo chiamato `bozza.txt`. Lascia intatti gli eventuali segnaposto `[PV-XX]`.

### Passaggio 5: ripristina e controlla

```bash
node bin/watermark-toolkit.js check sorgente.txt bozza.txt --lang it
```

Il Terminale stampa:

- la bozza controllata, con i segnaposto riconosciuti sostituiti dai valori esatti della fonte;
- gli eventuali valori esatti ancora mancanti;
- la sequenza ordinaria più lunga rimasta identica;
- quante sequenze di quattro parole sono sopravvissute;
- segnali su lunghezza e inizi di frase ripetuti;
- il promemoria che il significato richiede comunque una rilettura umana.

Né `sorgente.txt` né `bozza.txt` vengono modificati.

## Due comandi facoltativi

### `prepare`: guarda prima che cosa verrà protetto

Usalo soltanto quando il testo contiene nomi, formule legali o termini tecnici che devono restare identici.

```bash
node bin/watermark-toolkit.js prepare sorgente.txt --lang it --json
```

Guarda la sezione `invariants`. È un nome interno per indicare “i valori che lo strumento proteggerà”. Se ne manca uno importante, aggiungilo quando crei il prompt:

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --protect "Nome Prodotto Esatto" --out prompt.txt
```

### `compare`: mostra le stesse prove per due bozze

Usalo soltanto se possiedi già due risposte, per esempio `bozza-a.txt` e `bozza-b.txt`.

```bash
node bin/watermark-toolkit.js compare sorgente.txt bozza-a.txt bozza-b.txt --lang it
```

Non dichiara un vincitore. Una differenza superficiale non può decidere se la bozza conserva il significato o sembra davvero tua.

## Quando smettere di usare la CLI

Fermati e torna alla fonte se la bozza perde un'idea, una negazione, una precisazione o un valore esatto. Un numero di somiglianza più basso non ripara un errore. E se i comandi costano più fatica di quanto meriti il testo, usa Rewrite Room oppure riscrivilo a mano.

## Che cosa la CLI non potrà mai dimostrare

Il resoconto osserva soltanto fonte e bozza. Non possiede chiave, detector o soglia privati di Anthropic. `mechanicallyValid: true` significa soltanto che i valori protetti sono rimasti e la lunghezza rientra in un margine ampio. Non significa “watermark rimosso” e nemmeno “significato approvato”.
