# Le idee non dovrebbero portare watermark

<p align="center">
  <strong>Claude ha scritto la prima bozza. Ora falla davvero tua.</strong><br />
  Un prompt builder senza installazione con controlli locali, una guida completa e un toolkit open source per ricostruire i testi assistiti dall'AI partendo dalle idee.
</p>

<table>
  <tr>
    <td><strong>01</strong></td>
    <td><strong>La provenienza non può diventare una caccia alle streghe.</strong><br />Un detector può segnalare un'influenza statistica. Usare quel segnale come prova automatica di paternità, frode o pigrizia intellettuale non è analisi della provenienza. È un giudizio appaltato a un punteggio.</td>
  </tr>
  <tr>
    <td><strong>02</strong></td>
    <td><strong>L'enforcement punisce proprio chi gli strumenti di scrittura aiutano di più.</strong><br />Dislessia, disgrafia, difficoltà motorie e scrittura in una seconda lingua possono separare la qualità di un'idea dalla facilità di metterla su pagina. L'assistenza rilevabile non misura il contributo intellettuale.</td>
  </tr>
  <tr>
    <td><strong>03</strong></td>
    <td><strong>Marchiamo le prove sintetiche. Non le idee.</strong><br />Un'immagine può sembrare la registrazione fotografica di un evento, quindi la provenienza risponde a una domanda concreta su un'apparente prova. Le parole sono simboli che trasportano idee. Un testo può contenere un'affermazione falsa, ma il danno sta nell'affermazione, nella frode o nell'impersonificazione, non nel software che ha aiutato a formulare una frase.</td>
  </tr>
</table>

Questo è il perché del repository. Tutto ciò che segue ne è la conseguenza pratica: che cosa sappiamo davvero, quale strada scegliere in base a tempo e privacy e come usarla senza distruggere il testo.

Parto dalla domanda che con ogni probabilità ti ha portato qui: **come si rimuove un possibile watermark da un testo Claude senza massacrare il testo?**

La risposta breve è che non conviene travestire la vecchia formulazione. Tiri fuori ciò che deve restare, metti la fonte fuori vista e scrivi una versione nuova da una scheda controllata.

Se speravi nel pulsante unico con scritto “watermark sparito”, ti capisco pure. Il problema è che quel pulsante, finché detector, chiave e soglia di Anthropic restano privati, non può esistere onestamente. Quello che possiamo fare è offrirti un percorso molto più solido, dalla pagina bianca allo strumento nel browser fino ai controlli locali, proteggendo i fatti prima di cambiare anche solo una frase.

Questa guida serve per testi nei quali idee, giudizio e responsabilità finale sono tuoi. Cambiare la superficie del lavoro di qualcun altro non lo rende tuo.

<p align="center">
  <a href="https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it"><img src="https://img.shields.io/badge/APRI-REWRITE_ROOM-C9A84C?style=for-the-badge&labelColor=09090F" alt="Apri Rewrite Room nel browser" /></a>
  <a href="start-here/it/README.md"><img src="https://img.shields.io/badge/PARTI_DA-ZERO-F8F6EE?style=for-the-badge&labelColor=09090F" alt="Parti da zero" /></a>
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

Apri [Rewrite Room in italiano](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it).

Rewrite Room è un prompt builder semplice e diretto, con un confronto locale alla fine. Non è un writer AI. Incolli il testo una volta e la pagina prepara un prompt strutturato per un modello non Anthropic, senza account, upload o installazione. Date, cifre, link, citazioni e altri valori esatti diventano segnaposto locali come `[PV-01]`, riducendo il rischio che il modello normalizzi un trattino, un decimale o una virgoletta. Se i segnaposto sopravvivono, la pagina rimette gli originali carattere per carattere quando riporti la bozza.

Copi tutto il prompt, lo incolli nel modello che preferisci e poi riporti qui la sua bozza. La pagina controlla:

- nomi, date, numeri, link, citazioni e valori aggiunti da te che sono spariti;
- la sequenza di parole identica più lunga;
- quante sequenze di tre, quattro e cinque parole sono sopravvissute;
- gli inizi di frase ripetuti;
- una somiglianza approssimativa della forma di paragrafi e frasi.

Preparazione del prompt e confronto avvengono in locale. La pagina non usa un modello e non consuma crediti AI. Tutta la scrittura avviene nel modello esterno, che può usare il suo normale abbonamento, piano gratuito o sistema di crediti. Il risultato riguarda soltanto la superficie. Non è un controllo semantico né il responso del detector Anthropic.

Non abbiamo promosso il prompt soltanto perché sembrava intelligente. In un benchmark offline su quattro casi italiani e inglesi con gpt-oss 20B, il prompt strutturato ha conservato tutti i gruppi di valori esatti. La parafrasi banale ci è riuscita in un caso su quattro. Ha anche ridotto la media delle sequenze di quattro parole rimaste dal 27,4% al 23,7% e la sequenza identica media più lunga da 10 a 9 parole. È un solo modello locale su un corpus piccolo, non una garanzia universale. Bozze e punteggi completi sono in [`benchmarks/results/local-gpt-oss-20b.json`](benchmarks/results/local-gpt-oss-20b.json).

Se vuoi una separazione ancora più forte delle vecchie frasi e accetti un po' di lavoro in più, apri il percorso a camera stagna dentro Rewrite Room. È lì che vive il metodo delle due buste. Adesso è un'opzione avanzata, non un esame d'ingresso. Nel suo smoke test bilingue separato ha conservato tutti i valori esatti, restituito prosa in entrambi i casi, mantenuto la leggibilità nel limite configurato e ridotto al 14,6% la media delle sequenze di quattro parole rimaste. Due casi dimostrano che il flusso funziona, non che funzionerà sempre allo stesso modo.

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

Se la tieni davanti, in realtà è facilissimo conservare la stessa logica dei paragrafi anche dopo aver cambiato tutte le parole più vistose. [Usa il metodo manuale](methods/human-redraft/README.it.md).

---

## Scegli quanta fatica vuoi davvero spendere

| La tua situazione | Parti da qui | Fatica | Compromesso principale |
|---|---|---:|---|
| La policy permette la scrittura assistita | Non cambiare nulla o dichiarala | nessuna | non aiuta dove è la rilevabilità stessa a far scattare l'enforcement |
| Testo breve, privacy massima | [Riscrittura manuale](methods/human-redraft/README.it.md) | 10-60 min | il tuo tempo |
| Niente installazione e guida passo passo | [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) | 2-5 min per preparare, più il tempo del modello | il modello esterno può costare o applicare un proprio sistema di provenienza |
| Vuoi l'aiuto di un altro sistema | [Metodo delle due buste](methods/two-envelope-clean-room/README.it.md) | 15-40 min | privacy del provider e qualità della scheda |
| Vuoi un flusso già pronto per un agente | [Copia il prompt](prompts/it/research-pass.md) o [la skill](skills/non-anthropic-text-rewrite/SKILL.md) | 10-30 min | gli errori fattuali vanno comunque controllati |
| Preparazione e controlli locali ripetibili | [CLI locale](methods/semantic-reconstitution/README.it.md) | preparazione più pochi minuti per testo | prepara e misura, ma non scrive |
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

Per il metodo centrale non devi usare il Terminale. Se però vuoi esportare prompt e confrontare bozze in modo ripetibile, la CLI richiede Node.js 20 o successivo e non ha pacchetti runtime obbligatori.

```bash
git clone https://github.com/danilolapegna/claude-watermark-toolkit.git
cd claude-watermark-toolkit
npm test
node bin/watermark-toolkit.js start examples/fixtures/source-it.txt --lang it
```

Prepara lo stesso prompt strutturato partendo da un file locale:

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.json
```

Passa il prompt salvato al sistema non Anthropic che scegli, salva la risposta in `candidato.txt`, poi ripristina i valori esatti e controllala in locale:

```bash
node bin/watermark-toolkit.js check sorgente.txt candidato.txt --lang it
```

La CLI non chiama nessun modello e non sovrascrive la fonte o il candidato. Questo contratto più stretto ha retto i test. Il batch locale automatico no, quindi è stato tolto.

---

## Perché adesso il toolkit è più piccolo

Forse ti aspettavi targeting sulla confidenza, torneo adattivo e varie catene di riscrittura. Li abbiamo studiati, costruiti e poi tolti dal toolkit pratico.

Il proxy di targeting non poteva identificare le posizioni private del segnale Claude e tendeva a premiare proprio il linguaggio fattuale più raro. Il torneo produceva più bozze, ma il suo feedback non guidava davvero le generazioni successive. Chiamare queste cose “avanzate” sarebbe stato teatro.

La parte utile rimasta è più stretta: esportazione del prompt strutturato, ripristino dei valori esatti, controllo di una bozza e confronto fra più bozze senza vincitore automatico. [La guida completa ai metodi](METHODS.it.md) pubblica contratto, test e limite di ogni strumento rimasto. Il [protocollo di ricerca](research/experiment-protocol.md) resta disponibile per esperimenti veri su surrogati, separato chiaramente dalla soluzione pubblica.

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
