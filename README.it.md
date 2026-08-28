# Le idee non hanno filigrana

Claude Watermark Toolkit è una guida open source per ricostruire un testo assistito dall'AI nella propria voce. Parte da un metodo manuale di cinque minuti e arriva a strumenti locali testati per ricostruzione semantica, tutela dei fatti, riscrittura mirata e confronto fra più versioni.

Il runtime non usa modelli, API, SDK o strumenti di coding Anthropic.

[Read in English](README.md) · [Leggi il manifesto](MANIFESTO.it.md) · [Parti da zero](start-here/it/README.md) · [Segui un esempio completo](examples/walkthrough.it.md) · [Apri la guida completa](https://danilolapegna.com/guides/guida-watermark-testi-claude?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide)

## Che cosa trovi qui

Cinque strade, in ordine di impegno:

| Metodo | Tempo | Livello tecnico | Privacy | Quando conviene |
|---|---:|---|---|---|
| Riscrittura umana da zero | 10-30 min | nessuno | resta con te | testi brevi e importanti |
| Nuova bozza da una scaletta | 10 min | nessuno | dipende dallo strumento scelto | scrittura quotidiana |
| Ricostruzione semantica | 5-20 min | base | locale o endpoint scelto | scelta solida per testi lunghi |
| Riscrittura mirata per informazione | 15-45 min | avanzato | locale | ricerca e passaggi ostinati |
| Ricerca adattiva fra candidati | 10-60 min | tecnico | locale o endpoint scelto | più versioni con pro e contro visibili |

Ogni metodo spiega che cosa conserva, che cosa cambia, dove può fallire e come controllare il risultato. [Vai al confronto completo](LIMITS.md).

## Il punto da chiarire su Claude

Il 14 agosto 2026 Anthropic ha annunciato che i futuri modelli Claude avrebbero usato una variante di SynthID Text. Nello stesso annuncio ha scritto che l'estensione ai modelli precedenti sarebbe avvenuta nei mesi successivi. La pagina di assistenza attuale dice che i modelli supportati lanciati dal 2 agosto in poi includono la marcatura al lancio, mentre l'estensione ai modelli esistenti è ancora in corso.

Questo non dimostra che ogni output Claude sia marcato dal 14 agosto. Non dimostra neppure il contrario. Anthropic non pubblica una tabella modello per modello e il detector pubblico non è ancora disponibile. Lo stato corretto è: copertura incerta al livello del singolo modello. [Il registro dei claim separa i fatti dalle inferenze](CLAIMS.md).

## Parti in cinque minuti

Non devi installare nulla.

1. Chiudi il testo originale.
2. Scrivi una scheda con idee, numeri, nomi, URL, citazioni e vincoli.
3. Scegli un ordine diverso.
4. Riscrivi usando la tua voce normale.
5. Confronta i fatti, non le frasi.

Una nuova stesura sostituisce le scelte linguistiche su cui dovrebbe poggiare una filigrana statistica. Produce anche un testo che puoi difendere come lavoro editoriale tuo. [Segui la procedura manuale completa](methods/human-redraft/README.md).

## Installa lo strumento locale

Serve Node.js 20 o successivo. Non ci sono pacchetti runtime obbligatori.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-it.txt --lang it
```

Prepara un caso e proteggi i fatti:

```bash
node bin/watermark-toolkit.js prepare bozza.txt --lang it --out caso.json
```

Crea due prompt separati per un sistema non Anthropic:

```bash
node bin/watermark-toolkit.js prompt bozza.txt --lang it --out prompt.json
```

Confronta più versioni:

```bash
node bin/watermark-toolkit.js compare bozza.txt candidato-a.txt candidato-b.txt --lang it --json
```

Usa un modello locale con Ollama:

```bash
node bin/watermark-toolkit.js rewrite bozza.txt \
  --lang it \
  --provider ollama \
  --model IL_TUO_MODELLO_LOCALE \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out risultato.json
```

Lo strumento blocca gli host Anthropic e i nomi di modello Claude prima di inviare una richiesta.

## Come funziona il percorso più forte

Il testo attraversa due passaggi separati:

1. La fase di ricerca estrae idee, prove, vincoli, valori protetti e indicazioni sulla voce.
2. La fase di scrittura vede quella scheda, non le frasi originali.

Una versione che perde un numero, un URL o un'altra informazione protetta viene respinta. Fra le versioni valide, il selettore mostra quante sequenze restano uguali, quanto cambia la lunghezza e quanto è leggibile il risultato. Non nasconde tutto dietro un numero che sembra un detector.

Questo progetto non è un detector Claude. È un flusso controllato di ricostruzione, costruito intorno al funzionamento probabile delle filigrane statistiche.

## Che cosa sappiamo davvero

- Fatto ufficiale: Anthropic parla di una variante di SynthID Text senza caratteri nascosti.
- Fatto ufficiale: secondo Anthropic, piccoli ritocchi probabilmente non bastano, mentre una riscrittura completa che sostituisce ogni parola rimuove il segnale.
- Risultato osservato nella ricerca pubblica: gli attacchi di parafrasi devono fare i conti con la qualità del testo.
- Inferenza plausibile: i passaggi con molte scelte possibili sono più utili per la marcatura rispetto a fatti fissi e formule obbligate.
- Ignoto: chiave, finestra, copertura dei modelli, soglia del detector e tassi di errore di Claude.

Leggi [il funzionamento probabile](research/probable-mechanics.md), [gli ignoti](research/known-unknowns.md) e [il protocollo sperimentale](research/experiment-protocol.md).

## Perché esiste

L'uso dell'AI non decide la paternità di un testo. Una persona può avere l'idea, controllare le fonti e prendere le decisioni, ma usare un software per compensare dislessia, disgrafia, difficoltà motorie, affaticamento cognitivo o una barriera linguistica. Trasformare un segnale tecnico nascosto in una presunzione di frode può colpire proprio chi aveva bisogno di un supporto alla scrittura.

La provenienza delle immagini può tutelare il pubblico quando un'immagine sintetica rischia di essere scambiata per un fatto o una persona reale. Il testo è diverso. Una marcatura sulle scelte statistiche delle parole non stabilisce chi ha avuto l'idea, verificato i fatti o preso la decisione finale. [Il manifesto sviluppa questa posizione](MANIFESTO.it.md).

## Stato del progetto

Analisi offline, coppia di prompt, blocco Anthropic, protezione dei fatti, targeting informativo e selezione adattiva sono implementati e testati. Il laboratorio basato sul SynthID pubblico è un protocollo di ricerca riproducibile, non un detector di produzione. Controlla [STATUS.md](STATUS.md) prima di usare un metodo avanzato.

## Contribuire

Servono esempi in nuove lingue, casi falliti, revisioni di qualità, fonti primarie e adapter che rispettino il confine non Anthropic. Leggi [CONTRIBUTING.md](CONTRIBUTING.md).

Licenza MIT. Progetto di [Danilo Lapegna](https://danilolapegna.com/?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide).
