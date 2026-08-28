# Tutte le strade pratiche, dal “non fare niente” al torneo fra bozze

Sì, i primi metodi sembrano ovvi. Ci sono apposta.

Questa vuole essere la scala completa, non il solito percorso finto in cui ogni risposta porta casualmente a installare il nostro strumento. Una persona ha dodici minuti e un post pubblico. Un'altra ha un report riservato, un modello locale e magari pure un fine settimana. Sarebbe abbastanza ridicolo dare a entrambe la stessa ricetta.

Vale una regola sola per tutti i percorsi: usali su idee e testi tuoi, poi controlla e prenditi la responsabilità della versione finale.

## Il confronto rapido

| Percorso | Fatica | Privacy | Cambiamento atteso della forma | Costo o difetto principale |
|---|---:|---|---|---|
| 0. Non toccarlo o dichiara l'assistenza | nessuna | massima | nessuno | non aiuta dove è la rilevabilità stessa a far scattare l'enforcement |
| 1. Riscrivilo tu da una scheda | 10-60 min | massima | alto | tempo e tentazione di sbirciare la fonte |
| 2. Metodo delle due buste | 15-40 min | dipende da chi scrive | alto | la scheda va controllata bene |
| 3. Rewrite Room | 10-30 min | massima per preparazione e confronto | alto, se segui il metodo | guida e controlla, ma non genera il testo |
| 4. Altro agente non Anthropic con prompt o skill | 10-30 min | dipende dal provider | alto | un modello fluido può comunque inventare o appiattire i fatti |
| 5. CLI e modello locale | preparazione più 10-60 min | locale | alto | installazione e capacità del computer |
| 6. Microchirurgia guidata dalla confidenza | 20-90 min | opzione locale | medio | il targeting può rovinare fatti rari ma importanti |
| 7. Torneo fra candidati | 30-120 min | opzione locale | alto entro il budget di ricerca | più calcolo e rischio di ottimizzare i proxy |
| 8. Catena di riscritture indipendenti | 30-120 min | dipende da chi scrive | potenzialmente molto alto | la deriva di significato si accumula a ogni passaggio |
| 9. Editor umano | tempo pagato | dipende dall'accordo | alto | costo e disponibilità |

Non c'è un vincitore universale. Per quasi tutti partirei dal Percorso 2 o 3.

## 0. Non toccarlo o dichiara l'assistenza

Lo so: “Sono venuto qui per cambiare il testo e tu mi dici di non fare niente.” Però in una guida che vuole contenere davvero tutte le possibilità questa strada deve esserci. Alcuni contesti consentono la scrittura assistita e chiedono soltanto di dichiararla. In quel caso ricostruire un testo già buono è lavoro buttato.

Usala quando la regola è chiara, l'assistenza è permessa e la dichiarazione risponde alla preoccupazione reale. Se invece una policy vaga usa un detector privato come prova automatica di colpa, il problema è di governance. Non di punteggiatura.

## 1. Riscrivilo tu partendo da una scheda

La reazione spontanea probabilmente è: “Ah be', geniale. Basta riscriverlo. Grazie.”

Sì. Duh. Il punto è che non costa nulla, non manda il testo da nessuna parte e, su un testo breve, spesso è il metodo più forte. La parte utile non è l'invito a battere di nuovo le parole. È la separazione:

1. estrai fatti, idee e vincoli;
2. chiudi la fonte;
3. scegli un ordine diverso;
4. scrivi da quello che hai capito;
5. riapri la fonte soltanto per controllare i fatti.

Se tieni il testo davanti, molto spesso ne conservi la logica dei paragrafi anche dopo aver cambiato tutte le parole più visibili. [Apri il metodo manuale completo](methods/human-redraft/README.md).

## 2. Il metodo delle due buste

Sembra un piccolo teatrino finché non vedi che cosa impediscono, concretamente, le due buste.

- Nella Busta 1 metti scopo, idee, prove, nomi, numeri, date, link e citazioni esatte.
- Nella Busta 2 metti la tua voce: ritmo, formalità, connettivi, spigoli e parole che non useresti mai.

Le frasi originali non entrano in nessuna delle due. Una persona o un modello non Anthropic scrive soltanto da quelle.

Perché due buste e non un riassuntone? Perché fatti e voce si rompono in modi diversi. I fatti chiedono esattezza. La voce chiede istruzioni concrete ed esempi. Se li ammucchi in un prompt vago, alla fine rischi di non conservare bene né gli uni né l'altra.

[Segui il metodo italiano](methods/two-envelope-clean-room/README.it.md).

## 3. Rewrite Room, senza installare nulla

Obiezione del tutto sensata: “Quindi è un form. Dov'è l'algoritmo brillante?”

Il form è il guardrail. Il motore nel browser fa la parte meno visibile:

- trova i valori che devono sopravvivere;
- tiene la fonte solo nella scheda aperta;
- nasconde la fonte prima della nuova stesura;
- esporta un prompt con la scheda controllata ma senza il vecchio testo;
- elenca i valori protetti che mancano;
- misura la sequenza identica più lunga e le sequenze di tre, quattro e cinque parole rimaste;
- controlla gli inizi di frase ripetuti e una somiglianza strutturale dichiaratamente approssimativa.

Non scrive al posto tuo perché farlo dentro qualunque browser richiederebbe il download di un modello enorme oppure un provider remoto. Ti dà la parte che può essere davvero universale e locale. Poi scrivi tu o scegli il sistema non Anthropic di cui ti fidi.

[Apri Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/) oppure scarica il repository e apri `docs/index.html`.

## 4. Dai la scheda pulita a un altro agente non Anthropic

“Perché non apro una nuova chat, incollo il testo e chiedo di parafrasarlo?” Perché il punto non è avere una finestra nuova. È avere un contesto di scrittura che non riceva mai le vecchie frasi.

Puoi usare:

- [i due prompt da copiare](prompts/it/research-pass.md);
- [la skill copiabile](skills/non-anthropic-text-rewrite/SKILL.md);
- il prompt senza fonte esportato da Rewrite Room.

Il contesto di ricerca può vedere la fonte e costruire la scheda. Tu la controlli. Il contesto che scrive riceve soltanto quella. Se il testo è riservato, usa un modello locale non Anthropic in entrambi i passaggi.

## 5. Usa la CLI e un modello locale

“Io il Terminale non lo apro.” Perfetto, salta questa strada. Non perdi il metodo centrale.

La CLI serve per lavori ripetuti, file lunghi e persone che vogliono report leggibili anche da altri strumenti. Protegge i valori, esporta prompt, chiama Ollama o un endpoint compatibile non Anthropic e lascia visibili più compromessi.

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

Costa preparazione e calcolo. Il vantaggio è la ripetibilità, non il gusto superiore della macchina.

## 6. Microchirurgia guidata dalla confidenza

“Ora stiamo overingegnerizzando un paragrafo.” Ogni tanto sì. Usala soltanto quando una ricostruzione completa è impraticabile o se stai studiando il meccanismo.

SIRA prende di mira token ad alta self-information. Watermark Smoothing Attacks trova segnale più forte in posizioni a bassa confidenza e le ricampiona selettivamente. Sono due viste tecniche diverse di dove potrebbe valere la pena spendere le modifiche. Nessuna delle due rivela la configurazione segreta di Claude.

L'ordine sicuro è:

1. proteggi fatti e formule esatte;
2. usa un modello locale adatto per trovare posizioni incerte o ad alta informazione;
3. togli dalla lista ogni span protetto;
4. riscrivi clausole o passaggi interi intorno ai target rimasti;
5. ricontrolla significato, fatti e transizioni.

Il rischio, una volta detto, è quasi banale: le parole rare sono spesso proprio nomi, termini e prove che non puoi permetterti di cambiare. [Leggi il confine tecnico](methods/information-targeted/README.md).

## 7. Fai un torneo fra candidati

“Un algoritmo genetico applicato alla scrittura sembra un ottimo modo per produrre dodici paragrafi brutti.” Può succedere. Per questo il torneo butta via le bozze rotte prima ancora di classificarle.

Ispirato a B4 e TSAPA, tratta la riscrittura come un insieme di obiettivi in conflitto:

- conservare ogni fatto protetto;
- ridurre la sopravvivenza delle frasi della fonte;
- evitare una differenza assurda di lunghezza;
- mantenere un testo leggibile e utile;
- conservare più candidati non dominati invece di nascondere tutto dietro un numero.

L'algoritmo può farti vedere i compromessi. Non può sapere quale frase suona davvero tua. [Usa la ricerca adattiva](methods/adaptive-search/README.md).

## 8. Usa una catena di riscritture indipendenti

È la strada che viene in mente quando un solo giro sembra ancora troppo vicino. Ed è anche quella col fallimento più facile: ogni passaggio può limare via un'altra precisazione.

Non passare la Bozza 1 alla Bozza 2 e poi la Bozza 2 alla Bozza 3. Diventa il telefono senza fili. Dai la stessa scheda controllata a contesti indipendenti, oppure ripeti il passaggio dalla scheda con un vincolo strutturale nuovo. Controlla i fatti a ogni candidato.

Chainwash riporta un'erosione maggiore del segnale con riscritture indipendenti ripetute su watermark di diffusion language model. È un'evidenza più stretta rispetto a Claude, quindi qui il percorso resta sperimentale. [Leggi la versione prudente](methods/independent-rewrite-chain/README.it.md).

## 9. Paga un editor umano

Forse la soluzione plug-and-play più radicale è proprio questa: paga un bravo editor, dagli fatti e scopo e non mostrargli la formulazione originale fino al controllo finale.

Il vantaggio è il giudizio. Gli svantaggi sono soldi, tempo e fiducia. Concorda la riservatezza e chiarisci che serve una ricostruzione pulita, non un cambio di sinonimi.

## Scorciatoie invitanti che non meritano un numero

- **Sinonimi leggeri:** sopravvivono quasi tutti i contesti e la struttura. Anthropic stessa dice che piccoli ritocchi probabilmente non bastano.
- **Cambio della punteggiatura:** modifica pochissime scelte di campionamento.
- **Pulitori Unicode e caratteri invisibili:** utili per altra igiene, irrilevanti per un watermark statistico sui token.
- **Doppia traduzione:** cambio imprevedibile della forma con alto rischio di deriva del significato.
- **Traduzione o parafrasi fatta da Claude:** Anthropic dice che le traduzioni prodotte da Claude portano un watermark, e questo progetto esclude comunque strumenti Anthropic per la trasformazione.
- **Detector SynthID pubblico:** non possiede la chiave e la configurazione di Anthropic.
- **Cancellazione casuale di parole:** può ridurre la somiglianza peggiorando il testo. Non è un successo.

## La conclusione onesta

Oggi nessun percorso pubblico può certificare un risultato contro il detector privato di Anthropic. I metodi forti di questa guida fanno qualcosa di più stretto ma reale: sostituiscono una parte molto più ampia del percorso di campionamento originale, proteggono i fatti prima di cambiare la forma e rimettono una persona al comando del testo finale.
