# Parti da zero

Hai una bozza scritta con l'aiuto di Claude. Idee e fatti sono tuoi, ma vuoi parole nuove che non dipendano dalle frasi di Claude.

Non devi sapere che cosa sia un watermark, né capire di codice o Terminale. Parti da queste quattro caselle.

> **Il tuo testo** → **Rewrite Room prepara un prompt** → **un altro modello scrive** → **Rewrite Room controlla la bozza ricevuta**

La distinzione è fondamentale. Rewrite Room prepara il prompt e controlla il risultato. Non è un writer AI. A scrivere è il modello che scegli nel passaggio centrale.

[Apri Rewrite Room in italiano](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) · [English version](../en/README.md) · [Torna alla pagina principale](../../README.it.md)

## La strada più semplice

### 1. Incolla il testo

Apri [Rewrite Room in italiano](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) e incolla la bozza.

In questo momento non stai caricando nulla. La pagina lavora dentro il browser, costa zero e non usa crediti AI. Trova date, nomi, numeri, link e citazioni che non dovrebbero cambiare. Se manca qualcosa, puoi aggiungerlo tu.

### 2. Copia il prompt preparato

Premi **Prepara il mio prompt di riscrittura**, poi **Copia tutto il prompt**.

Il prompt chiede una vera ricostruzione, non tre sinonimi messi qua e là. Dice al modello di conservare affermazioni, precisazioni e voce, cambiando però la formulazione ordinaria e la struttura delle frasi.

### 3. Scegli dove avviene la scrittura

Adesso ti serve un **writer**, cioè il software che riceve il prompt e restituisce la nuova bozza. Hai due possibilità.

#### Più veloce: un modello online non Anthropic

Apri un modello creato da un'azienda diversa da Anthropic, incolla il prompt e invialo. Non devi installare nulla. Il provider riceve ciò che incolli e può usare il suo piano gratuito, l'abbonamento o i crediti. Potrebbe anche applicare un proprio sistema di provenienza.

#### Più privato: un modello sul tuo computer

“Modello locale” significa soltanto questo: il software che scrive gira sul tuo computer invece che sul server di un provider.

- **LM Studio** è la strada grafica più semplice. Scarichi l'app, scarichi un modello al suo interno, apri una chat e incolli il prompt.
- **Ollama** è la strada più leggera da Terminale. Lo installi, esegui un comando per aprire il modello e incolli il prompt.

Dopo il primo download del modello, entrambi possono scrivere senza crediti AI ospitati. Serve comunque memoria sufficiente e un piccolo modello locale può scrivere peggio di un buon modello online. Segui la [guida al modello locale, dal download alla bozza pronta](../../methods/local-model/README.it.md).

### 4. Riporta qui la nuova bozza

Copia la risposta del writer. Torna in Rewrite Room, incollala sotto **Incolla qui la nuova bozza del modello**, poi premi **Ripristina i valori e controlla**.

La pagina ti restituisce due cose utili:

1. la bozza ricevuta con date, nomi, link e numeri protetti rimessi al loro posto;
2. un resoconto che mostra valori esatti mancanti e vecchie formulazioni ancora troppo vicine.

Rileggi personalmente significato e voce. Il resoconto non può farlo al posto tuo e non può certificare il risultato contro il detector privato di Anthropic.

## “Ma non faccio prima a riscriverlo?”

Per un testo breve, sì. Duh.

Questa guida contiene tutte le strade utili, compresa quella ovvia:

1. Scrivi in forma di appunti idee, fatti e valori esatti.
2. Chiudi il testo di partenza.
3. Metti le idee nell'ordine che serve a chi legge.
4. Scrivi partendo dagli appunti.
5. Riapri il testo soltanto per controllare fatti e sfumature perse.

Costa il tuo tempo, non invia niente e non aggiunge un altro modello. [Leggi il metodo manuale completo](../../methods/human-redraft/README.it.md).

## Vuoi la separazione più forte delle vecchie frasi?

Usa l'opzione **senza la fonte** dentro Rewrite Room. Prima prepari una scheda breve con significato, fatti, pubblico e voce. Il modello riceve quella scheda, non le vecchie frasi.

Richiede più tempo perché devi controllare la scheda prima della scrittura. Ha senso quando la separazione conta più della velocità. La versione autonoma è il [metodo a camera stagna delle due buste](../../methods/two-envelope-clean-room/README.it.md).

## Vuoi un'istruzione riutilizzabile per un agente?

La [skill pronta, spiegata in italiano](../../skills/non-anthropic-text-rewrite/README.it.md) serve a chi usa già agenti di coding o workspace per agenti. Copi la skill nel sistema e gli dai un testo. La skill spiega come proteggere i fatti, tenere la fonte fuori dal passaggio di scrittura e fermarsi quando il significato non è verificabile.

Se la parola “skill” non ti dice nulla, saltala serenamente. Rewrite Room offre lo stesso percorso pratico senza configurare un agente.

## La CLI locale, in italiano normale

CLI significa **interfaccia a riga di comando**. Qui è un piccolo programma facoltativo che controlli scrivendo comandi nel Terminale o in PowerShell.

Non trova posizioni segrete del watermark. Non scrive il testo. Serve soltanto se vuoi ripetere la stessa preparazione e lo stesso controllo su file, oppure conservare un resoconto.

Il percorso completo è questo:

> `sorgente.txt` → la CLI crea `prompt.txt` → il tuo writer crea `bozza.txt` → la CLI controlla `bozza.txt`

### Che cosa sono questi file?

- `sorgente.txt` è un normale file di testo che crei tu. Dentro incolli la bozza di partenza.
- `prompt.txt` viene creato dalla CLI. Lo apri e copi tutto nel writer che hai scelto.
- `bozza.txt` è un altro file di testo che crei tu. Dentro incolli la risposta del writer.

### Che cosa fanno i comandi?

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.txt
```

Legge `sorgente.txt` e crea il prompt da passare al writer.

```bash
node bin/watermark-toolkit.js check sorgente.txt bozza.txt --lang it
```

Legge entrambi i file, ripristina i valori protetti nella bozza ricevuta e stampa il confronto locale. Non modifica nessuno dei due file.

`prepare` è facoltativo. Mostra soltanto nomi, date, numeri e citazioni che il toolkit proteggerà. Anche `compare` è facoltativo. Mostra gli stessi controlli affiancati quando hai già due o più bozze. Non ne sceglie una al posto tuo.

Se ti serve, segui la [guida alla CLI, dal download al testo finale](../../methods/semantic-reconstitution/README.it.md). Se ti sembra lavoro in più, lo è. Usa Rewrite Room.

## Quello che nessuna strada può promettere

Detector, chiave privata e soglia decisionale di Anthropic non sono pubblici. Il toolkit può aiutarti a ricostruire la formulazione, conservare i fatti e controllare la somiglianza visibile. Non può mostrare onestamente un bollino “watermark rimosso”.

Prima di usare il risultato, controlla ogni affermazione, incertezza e citazione. Se la paternità potrebbe essere contestata, conserva anche la cronologia delle bozze.

[Confronta le strade ammesse](../../METHODS.it.md) · [Guarda un esempio completo](../../examples/walkthrough.it.md) · [Leggi il registro delle prove](../../CLAIMS.md)
