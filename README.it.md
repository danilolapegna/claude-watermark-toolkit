# Claude ha scritto la prima bozza. Ora falla davvero tua.

<p align="center">
  <strong>Uno strumento senza installazione, una guida completa e un toolkit open source per ricostruire i testi assistiti dall'AI partendo dalle idee.</strong>
</p>

Parto dalla domanda che con ogni probabilità ti ha portato qui: **come si rimuove un possibile watermark da un testo Claude senza massacrare il testo?**

La risposta breve è che non conviene travestire la vecchia formulazione. Tiri fuori ciò che deve restare, metti la fonte fuori vista e scrivi una versione nuova da una scheda controllata.

Se speravi nel pulsante unico con scritto “watermark sparito”, ti capisco pure. Il problema è che quel pulsante, finché detector, chiave e soglia di Anthropic restano privati, non può esistere onestamente. Quello che possiamo fare è offrirti un percorso molto più solido, dalla pagina bianca allo strumento nel browser fino alla ricerca fra più candidati, proteggendo i fatti prima di cambiare anche solo una frase.

Questa guida serve per testi nei quali idee, giudizio e responsabilità finale sono tuoi. Cambiare la superficie del lavoro di qualcun altro non lo rende tuo.

<p align="center">
  <a href="https://danilolapegna.github.io/claude-watermark-toolkit/"><img src="https://img.shields.io/badge/APRI-REWRITE_ROOM-B63B26?style=for-the-badge" alt="Apri Rewrite Room nel browser" /></a>
  <a href="start-here/it/README.md"><img src="https://img.shields.io/badge/PARTI_DA-ZERO-164C6E?style=for-the-badge" alt="Parti da zero" /></a>
  <a href="README.md"><img src="https://img.shields.io/badge/READ_IN-ENGLISH-C9A84C?style=for-the-badge&labelColor=171714" alt="Read in English" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licenza-MIT-356346?style=for-the-badge" alt="Licenza MIT" /></a>
</p>

<p align="center">
  <a href="https://danilolapegna.com/guides/guida-watermark-testi-claude?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide">Leggi la guida sul sito</a>
  ·
  <a href="METHODS.it.md">Confronta tutti i metodi</a>
  ·
  <a href="examples/walkthrough.it.md">Guarda un esempio completo</a>
</p>

---

## Vuoi la risposta utile in cinque minuti?

Apri [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/).

Funziona nel browser senza account, senza upload e senza installazione. Incolli la fonte, proteggi nomi e valori esatti, prepari due piccole buste per significato e voce, poi sigilli la fonte prima di scrivere.

Puoi fare la nuova stesura tu, oppure copiare il prompt senza fonte in qualunque sistema non Anthropic del quale ti fidi. Quando riporti qui la bozza, la pagina controlla:

- nomi, date, numeri, link, citazioni e valori aggiunti da te che sono spariti;
- la sequenza di parole identica più lunga;
- quante sequenze di tre, quattro e cinque parole sono sopravvissute;
- gli inizi di frase ripetuti;
- una somiglianza approssimativa della forma di paragrafi e frasi.

Succede tutto in locale. Il risultato è un confronto, non il responso del detector Anthropic.

---

## “Ma la soluzione vera non è semplicemente riscriverlo?”

Sì. Duh.

E resta in cima proprio perché qui voglio mettere tutti i metodi utili, non soltanto quelli che fanno sembrare brillante il repository. Per un testo breve, una ricostruzione manuale da una scheda non costa nulla, non invia niente e forse è ancora la strada più forte.

La parte che sembra banale ma viene saltata continuamente è questa:

1. Scrivi fatti, idee e vincoli.
2. Chiudi la fonte.
3. Metti le idee in un ordine diverso.
4. Scrivi da quello che vuoi dire, non dalle frasi che esistono già.
5. Riapri la fonte soltanto per controllare i fatti.

Se la tieni davanti, in realtà è facilissimo conservare la stessa logica dei paragrafi anche dopo aver cambiato tutte le parole più vistose. [Usa il metodo manuale](methods/human-redraft/README.md).

---

## Scegli quanta fatica vuoi davvero spendere

| La tua situazione | Parti da qui | Fatica | Compromesso principale |
|---|---|---:|---|
| La policy permette la scrittura assistita | Non cambiare nulla o dichiarala | nessuna | non aiuta dove è la rilevabilità stessa a far scattare l'enforcement |
| Testo breve, privacy massima | [Riscrittura manuale](methods/human-redraft/README.md) | 10-60 min | il tuo tempo |
| Niente installazione e guida passo passo | [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) | 10-30 min | guida e controlla, ma non genera il testo |
| Vuoi l'aiuto di un altro sistema | [Metodo delle due buste](methods/two-envelope-clean-room/README.it.md) | 15-40 min | privacy del provider e qualità della scheda |
| Vuoi un flusso già pronto per un agente | [Copia il prompt](prompts/it/research-pass.md) o [la skill](skills/non-anthropic-text-rewrite/SKILL.md) | 10-30 min | gli errori fattuali vanno comunque controllati |
| Lavoro ripetuto o riservato | [CLI locale](start-here/it/README.md#voglio-la-cli-locale) | preparazione più 10-60 min | installazione e capacità del computer |
| Riscrivere tutto è impraticabile | [Microchirurgia guidata](methods/information-targeted/README.md) | 20-90 min | può prendere di mira per errore proprio i fatti rari |
| Vuoi più compromessi visibili | [Torneo fra candidati](methods/adaptive-search/README.md) | 30-120 min | più calcolo e rischio di ottimizzare i proxy |
| Un solo passaggio resta troppo vicino | [Catena indipendente](methods/independent-rewrite-chain/README.it.md) | 30-120 min | la deriva del significato si accumula |
| Testo ad alta posta e un budget | Editor umano dalla scheda controllata | tempo pagato | soldi, disponibilità e riservatezza |

Questa è la versione rapida. [La guida completa ai metodi](METHODS.it.md) dice che cosa compra davvero ogni percorso, dove si rompe e perché doppia traduzione, trucchi Unicode e sinonimi leggeri non meritano lo stesso peso delle soluzioni forti.

---

## “Va bene, ma Claude sta già watermarkando tutto?”

La situazione ufficiale attuale è più precisa di entrambe le risposte estreme.

Anthropic dice che i modelli supportati lanciati nell'Unione europea dal 2 agosto 2026 includono il watermark al lancio e che gli usi supportati nei prodotti Claude e via API vengono marcati a livello mondiale. Dice anche che il rollout sui modelli precedenti è ancora in corso. Una lista pubblica modello per modello non c'è.

Quindi io non scriverei che ogni output Claude è watermarkato dal 14 agosto. Ma non scriverei nemmeno che i modelli precedenti sono puliti. Semplicemente, quel livello di certezza non è pubblico.

Anthropic descrive il watermark come un pattern statistico nelle scelte dei token, non come una manciata di caratteri nascosti. Dice che i ritocchi leggeri difficilmente bastano e che una riscrittura completa, nella quale ogni parola viene sostituita, rimuove il segnale. Una traduzione fatta da Claude riceve un watermark proprio.

[Nel registro delle affermazioni](CLAIMS.md) trovi separati fatti, inferenze e cose che non sappiamo. Che sembra una distinzione scontata, ma tant'è.

---

## Vuoi lo strumento locale?

Per il metodo centrale non devi usare il Terminale. Se però vuoi esportare prompt in modo ripetibile, usare un modello locale e confrontare più candidati, la CLI richiede Node.js 20 o successivo e non ha pacchetti runtime obbligatori.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-it.txt --lang it
```

Per fare tutto con un modello locale non Anthropic tramite Ollama:

```bash
node bin/watermark-toolkit.js rewrite sorgente.txt \
  --lang it \
  --provider ollama \
  --model IL_TUO_MODELLO_LOCALE \
  --method adaptive \
  --count 4 \
  --generations 2 \
  --out risultato.json
```

Il toolkit rifiuta gli host Anthropic e i nomi dei modelli Claude prima che una richiesta parta. E non sovrascrive mai la fonte.

---

## I metodi avanzati non sono lì per fare scena

Se “usiamo un algoritmo genetico” ti sembra un modo meraviglioso per produrre dodici paragrafi brutti, l'obiezione è più che sensata.

Per questo i percorsi avanzati non si fidano della sola bassa somiglianza. Proteggono i fatti, scartano le bozze rotte e tengono visibili obiettivi che possono entrare in conflitto:

- [riscrittura mirata](methods/information-targeted/README.md), informata da SIRA e Watermark Smoothing;
- [ricerca adattiva fra candidati](methods/adaptive-search/README.md), informata da B4 e TSAPA;
- [catene di riscritture indipendenti](methods/independent-rewrite-chain/README.it.md), lasciate sperimentali perché Chainwash studia una famiglia di modelli più stretta;
- [esperimenti su surrogati](research/experiment-protocol.md), nei quali SynthID pubblico viene chiamato surrogato e mai spacciato per detector Claude.

La ricerca serve a rendere migliore il metodo. Non ad attaccare parole scientifiche a un parafrasatore semplice.

---

## Perché esiste questo progetto

L'uso rilevabile dell'AI non equivale a una falsa paternità.

Una persona può possedere idea, prove e giudizio e usare un software per superare dislessia, disgrafia, limitazioni motorie, affaticamento cognitivo o una barriera linguistica. Il watermark in sé non peggiora la leggibilità del testo. Il danno arriva quando una scuola, un datore di lavoro o un editore trasforma l'assistenza rilevabile in una caccia alle streghe e la tratta come prova che quella persona non avesse niente di proprio da dire.

La provenienza delle immagini può rispondere a una domanda utile quando un'immagine sintetica rischia di essere scambiata per la fotografia di un evento reale. Il testo è un'altra cosa. Un segnale statistico non può dirci chi ha avuto l'idea, controllato le prove o accettato la responsabilità del risultato.

[Leggi il manifesto: Le idee non dovrebbero portare watermark](MANIFESTO.it.md).

---

## Che cosa questo progetto non fingerà mai

- Non può certificare il risultato sul detector privato di Anthropic.
- Un'implementazione pubblica di SynthID non possiede la chiave di Anthropic.
- Una bassa sovrapposizione di frasi non dimostra che il testo sia buono.
- Una bozza fluida può essere comunque falsa.
- Riscrivere il lavoro di qualcun altro non crea paternità.

Leggi [i limiti reali](LIMITS.md), [il funzionamento probabile](research/probable-mechanics.md) e [lo stato dell'implementazione](STATUS.md).

Licenza MIT. Progetto di [Danilo Lapegna](https://danilolapegna.com/?utm_source=github&utm_medium=opensource&utm_campaign=claude-watermark-guide).
