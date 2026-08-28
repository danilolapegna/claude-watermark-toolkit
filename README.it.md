# Rendi davvero tuo un testo scritto con l'aiuto dell'AI

<p align="center">
  <strong>Una guida open source per ricostruire un testo assistito da Claude partendo dalle idee, non dai sinonimi.</strong>
</p>

Se stai cercando un modo pratico per rimuovere un possibile watermark dai testi Claude, parti da qui. Probabilmente hai un testo che dice ciò che pensi ma sembra ancora legato al modo in cui Claude l'ha formulato. Le idee sono tue. I fatti sono corretti. Vuoi una versione davvero nuova, senza trucchi cosmetici o detector che promettono certezze che non possono dare.

**Il metodo in una frase:** estrai ciò che deve restare, metti da parte la formulazione originale e scrivi una nuova versione partendo dalla scheda verificata.

Non devi capire come funziona SynthID. Per il primo percorso non devi installare nulla.

Questa guida serve per testi tuoi, dei quali sei disposto a prenderti la responsabilità. Non serve a prendersi la paternità del lavoro di qualcun altro.

<p align="center">
  <a href="start-here/it/README.md"><img src="https://img.shields.io/badge/PARTI_DA_QUI-niente_installazione-2F855A?style=for-the-badge" alt="Parti da qui senza installare nulla" /></a>
  <a href="README.md"><img src="https://img.shields.io/badge/READ_IN-ENGLISH-C9A84C?style=for-the-badge&labelColor=1A1A2E" alt="Read in English" /></a>
  <a href="https://github.com/danilolapegna/claude-watermark-toolkit/actions/workflows/ci.yml"><img src="https://github.com/danilolapegna/claude-watermark-toolkit/actions/workflows/ci.yml/badge.svg" alt="Test e controlli della documentazione" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licenza-MIT-1A1A2E?style=for-the-badge" alt="Licenza MIT" /></a>
</p>

<p align="center">
  <a href="https://danilolapegna.com/guides/guida-watermark-testi-claude?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide">Leggi la guida sul sito</a>
  ·
  <a href="examples/walkthrough.it.md">Guarda un esempio completo</a>
</p>

---

## 🧭 Scegli il percorso adatto a oggi

| Che cosa vuoi | Usa questo percorso | Tempo | Che cosa serve |
|---|---|---:|---|
| La soluzione più semplice | [Nuova stesura manuale](methods/human-redraft/README.md) | 10-30 min | Una pagina vuota |
| L'aiuto di un altro sistema AI | [Due conversazioni separate](methods/independent-draft/README.md) | 10-20 min | Un sistema non Anthropic |
| Un flusso locale e ripetibile | [Nuova stesura da una scheda verificata](methods/semantic-reconstitution/README.md) | 10-30 min | Node.js, Ollama facoltativo |
| Più versioni con pro e contro visibili | [Ricerca adattiva](methods/adaptive-search/README.md) | 10-60 min | Un modello locale o compatibile |

Se sei indeciso, scegli il primo. Una vera nuova stesura è un punto di partenza più forte di una serie di piccoli ritocchi e lascia a te il controllo delle parole finali.

---

## ✍️ Fallo adesso, senza installare nulla

1. Leggi il testo originale una volta.
2. Su una pagina vuota, elenca soltanto idee, fatti, numeri, nomi, link, citazioni e vincoli che devono restare.
3. Chiudi l'originale.
4. Metti i punti nell'ordine utile per chi leggerà, anche se è diverso da quello iniziale.
5. Scrivi il testo da capo senza guardare indietro.
6. Riapri l'originale e confronta i fatti, non le frasi.

Il metodo è tutto qui. Non sostituire una parola alla volta. Non mantenere lo stesso ordine dei paragrafi soltanto perché esiste già.

[Apri il metodo manuale dettagliato](methods/human-redraft/README.md) oppure [segui la guida da zero](start-here/it/README.md).

---

## 📋 Preferisci due prompt da copiare?

Usa due conversazioni separate in un sistema non Anthropic:

1. Nella prima, usa il [prompt di ricerca](prompts/it/research-pass.md) per trasformare il testo in una scheda fattuale.
2. Controlla tu la scheda.
3. Apri una nuova conversazione e usa il [prompt di scrittura](prompts/it/drafting-pass.md). Incolla la scheda, mai il testo originale.

La separazione conta. Se la conversazione che scrive può ancora vedere la fonte, può trascinare nella nuova bozza più frasi e più struttura del necessario.

---

## 💻 Vuoi usare lo strumento locale?

Lo strumento da riga di comando non tocca il file originale, protegge i valori esatti e confronta più versioni. Richiede Node.js 20 o successivo e non ha pacchetti runtime obbligatori.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-it.txt --lang it
```

Per un tuo file:

```bash
node bin/watermark-toolkit.js prepare bozza.txt --lang it --out caso.json
node bin/watermark-toolkit.js prompt bozza.txt --lang it --out prompt.json
```

Se vuoi che tutto resti sul tuo computer, collega un modello locale non Anthropic tramite Ollama:

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

Lo strumento blocca gli host Anthropic e i nomi dei modelli Claude prima di inviare una richiesta. La [guida da zero](start-here/it/README.md) spiega come scaricare lo ZIP, aprire il Terminale e risolvere gli errori più comuni.

---

## 🔎 Che cosa può promettere con onestà

Anthropic descrive il watermark come un pattern statistico nelle scelte delle parole, non come una serie di caratteri nascosti. Afferma inoltre che piccoli ritocchi probabilmente non bastano, mentre una riscrittura completa che sostituisce ogni parola rimuove il segnale.

Nessuno fuori da Anthropic può però promettere oggi un risultato contro il suo detector privato. Non esistono una tabella pubblica modello per modello, una soglia pubblica o un detector capace di certificare il tuo testo.

Per questo il progetto non vende un punteggio magico. Offre metodi di ricostruzione più o meno forti, protegge i fatti prima di cambiare la forma e presenta ogni inferenza di ricerca come tale. Leggi [il registro delle affermazioni](CLAIMS.md) e [i pro e contro reali](LIMITS.md).

---

## 💡 Perché esiste

L'uso rilevabile dell'AI non equivale a una falsa paternità.

Una persona può possedere l'idea, le prove e il giudizio, ma usare un software per superare dislessia, disgrafia, difficoltà motorie, affaticamento cognitivo o una barriera linguistica. Se una scuola, un datore di lavoro o un editore tratta la presenza dell'AI come prova di disonestà, può punire proprio chi aveva bisogno di aiuto per mettere un'idea in forma leggibile.

La provenienza di un'immagine può rispondere a una domanda utile quando una scena sintetica rischia di essere scambiata per la foto di un fatto reale. Il testo è diverso. Un segnale statistico non stabilisce chi ha avuto l'idea, controllato i fatti o accettato la responsabilità del risultato.

[Leggi il manifesto completo](MANIFESTO.it.md).

---

## 🧪 Approfondisci solo se ti serve

- [Funzionamento probabile](research/probable-mechanics.md), che cosa suggerisce la ricerca pubblica su SynthID e dove finisce l'analogia.
- [Riscrittura mirata](methods/information-targeted/README.md), per i passaggi con più scelte linguistiche, dopo aver protetto i fatti.
- [Ricerca adattiva](methods/adaptive-search/README.md), per generare più versioni e vedere l'insieme Pareto.
- [Protocollo sperimentale](research/experiment-protocol.md), per test riproducibili su un surrogato senza fingere che sia il detector Claude.
- [Stato del progetto](STATUS.md), con ciò che è stabile, sperimentale, di sola ricerca o non disponibile.

Sono utili nuovi esempi linguistici, casi falliti, revisioni di qualità e fonti primarie. Leggi [come contribuire](CONTRIBUTING.md).

Il file originale non viene mai sovrascritto. Licenza MIT. Progetto di [Danilo Lapegna](https://danilolapegna.com/?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide).
