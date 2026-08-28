# Cinque strade che meritano davvero il tuo tempo

[English](METHODS.md) · [Parti da zero](start-here/it/README.md) · [Apri Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it)

Un toolkit gigantesco può fare molta scena e, nel frattempo, consegnarti dieci versioni della stessa idea debole. Questo prima ci cascava. Ora la lista è più corta.

Ogni percorso deve rispondere a quattro domande:

1. Che risultato utile ottengo?
2. Come lo ripeto o lo controllo?
3. Dove smette di essere affidabile?
4. Lo sforzo ha senso per il mio caso?

Se una funzione non sa rispondere a tutte e quattro, non si merita un numero.

## Scegli in trenta secondi

| La tua situazione | Usa questo | Tempo | Che cosa ottieni davvero |
|---|---|---:|---|
| L'assistenza è ammessa e basta dichiararla | Lascia il testo com'è oppure dichiara l'assistenza | nessuno | nessuna riscrittura inutile |
| Testo breve o riservato | [Riscrittura umana](methods/human-redraft/README.it.md) | 10-60 min | una nuova bozza scritta dalla tua scheda dei fatti |
| Vuoi la strada seria più semplice | [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) | 2-5 min più il tempo del modello | un prompt builder guidato e un resoconto locale sulla superficie |
| La separazione delle frasi conta più della velocità | [Camera stagna](methods/two-envelope-clean-room/README.it.md) | 15-40 min | una scheda controllata che arriva alla scrittura senza la fonte |
| Vuoi far scrivere un altro sistema non Anthropic | [Percorso in due conversazioni](methods/independent-draft/README.it.md) | 10-30 min | scheda di ricerca e una o più bozze indipendenti |
| Lo fai spesso oppure vuoi file locali e JSON | [CLI locale](methods/semantic-reconstitution/README.it.md) | preparazione più pochi minuti | prompt, ripristino dei valori e controlli meccanici |
| Il testo è delicato e hai un budget | Editor umano dalla scheda controllata | tempo pagato | giudizio editoriale e revisione responsabile |

Per quasi tutti, Rewrite Room è la prima fermata sensata. Per testi riservati o delicati scegli il percorso manuale o quello a camera stagna. Il terminale non migliora il gusto. Migliora la ripetibilità.

## 0. Non toccarlo, oppure dichiara l'assistenza

“Sono venuto qui per cambiare il testo e il primo metodo è non fare niente?” Sì, perché la guida deve risolvere il tuo problema. Non creare lavoro per giustificare i propri strumenti.

Se la regola ammette chiaramente la scrittura assistita e chiede soltanto una dichiarazione, dichiarala. Riscrivere un testo già corretto costa tempo e apre nuove possibilità di errore.

**Contratto:** la richiesta della policy viene soddisfatta senza rovinare una buona prosa.

**Controllo:** leggi la policy vera, identifica che cosa va dichiarato e conservane una copia.

**Limite:** non serve quando un'istituzione tratta l'assistenza rilevabile come colpa automatica o usa un detector privato come prova definitiva. Quello è un problema di governance, non di punteggiatura.

## 1. Riscrivilo tu partendo da una scheda dei fatti

“Quindi il consiglio premium è: scrivitelo da solo. Duh.” Esatto. Resta perché per un testo breve è gratuito, privato e sorprendentemente forte. Il metodo è la separazione, non la tastiera.

1. Estrai scopo, affermazioni atomiche, prove, precisazioni e valori esatti.
2. Chiudi la fonte.
3. Scegli l'ordine che serve a chi legge.
4. Scrivi da ciò che hai capito.
5. Riapri la fonte soltanto per controllare significato e fatti.

**Contratto:** la nuova bozza nasce da una scheda controllata, non da sinonimi infilati dentro frasi ancora visibili.

**Controllo ripetibile:** la guida include scheda, verifica punto per punto e regola di arresto.

**Limite:** se continui a sbirciare la fonte, la sua struttura tende a sopravvivere. Su testi lunghi o molto tecnici, preparare bene la scheda costa.

[Segui il metodo umano completo](methods/human-redraft/README.it.md).

## 2. Usa Rewrite Room

“Quindi è un prompt builder?” Esatto. Semplice, diretto, con mascheramento dei valori protetti e controlli locali. Ti evita di inventare la procedura e rende visibili i punti deboli. Non scrive.

Il percorso predefinito richiede quattro azioni:

1. Incolla il testo.
2. Copia il prompt di riscrittura già preparato.
3. Usalo in un modello non Anthropic.
4. Riporta qui la bozza per i controlli locali.

Il prompt chiede al modello di costruire un registro interno di fedeltà, conservare affermazioni e precisazioni, proteggere i valori esatti, ricostruire le frasi ordinarie e controllarsi prima di rispondere. La pagina non chiama alcun modello e non consuma crediti AI.

**Contratto:** preparare un prompt copiabile, ripristinare i segnaposto protetti sopravvissuti e restituire un resoconto su valori esatti, frase identica più lunga, sequenze rimaste, inizi ripetuti, struttura e lunghezza. La bozza la scrive il modello esterno.

**Controllo ripetibile:** i test del browser coprono estrazione dei valori, corrispondenza esatta, confini del prompt e confronti avversariali. Il controllo statico rifiuta CSS remoti e risorse locali mancanti.

**Limite:** il resoconto legge la superficie, non il significato. Non può certificare il detector privato di Anthropic. Il modello esterno può avere un costo o un proprio sistema di provenienza.

[Apri Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it).

## 3. Usa la camera stagna

“Due buste sembra un po' teatrale.” È soltanto un modo semplice per evitare che fatti e voce finiscano dentro lo stesso riassunto vago.

- La Busta 1 contiene scopo, pubblico, affermazioni atomiche, prove, precisazioni e valori protetti.
- La Busta 2 contiene comportamenti concreti della voce, formato e limiti.

La persona o il modello che scrive riceve le buste, mai le frasi originali.

**Contratto:** le vecchie frasi esistono durante la ricerca, spariscono durante la scrittura, mentre ogni valore e ogni affermazione ha un posto nella scheda.

**Controllo ripetibile:** confronta la scheda con la fonte prima di scrivere, poi collega ogni elemento della scheda alla bozza. I prompt copiabili usano confini espliciti e uno schema JSON fisso.

**Limite:** una scheda sbagliata produce una bozza sbagliata ma molto originale. Due messaggi nella stessa conversazione non sono due contesti isolati. Anche la memoria condivisa del provider può rompere la separazione.

[Costruisci le due buste](methods/two-envelope-clean-room/README.it.md) oppure [usale in un altro sistema](methods/independent-draft/README.it.md).

## 4. Prepara e controlla in locale con la CLI

“Il terminale rende tutto più intelligente?” No. Rende ripetibili le parti testate su file lunghi e più candidati.

La CLI può:

- inventariare i valori esatti senza modificare la fonte;
- esportare il prompt principale oppure la coppia avanzata a camera stagna;
- ripristinare i segnaposto protetti dopo la risposta del modello;
- mostrare i fallimenti meccanici e confrontare più bozze senza scegliere al posto tuo.

```bash
node bin/watermark-toolkit.js prompt fonte.txt --lang it --out prompt.json
node bin/watermark-toolkit.js check fonte.txt candidato.txt --lang it
```

**Contratto:** la CLI prepara o misura. Non chiama mai un modello di scrittura. `check` ripristina i segnaposto e restituisce un resoconto meccanico che resta marcato `requires-manual-review`.

**Controllo ripetibile:** i test coprono protezione dalla sovrascrittura, isolamento del prompt, valori esatti, Unicode, testi lunghi e inversioni semantiche avversariali.

**Limite:** la CLI non scrive. Serve comunque un modello non Anthropic o una persona, e devi verificare ogni affermazione prima di scegliere.

[Usa il percorso locale partendo da zero](methods/semantic-reconstitution/README.it.md).

## A cosa serve ogni comando

Questi comandi non sono souvenir. Ognuno ha un lavoro stretto.

| Comando | Contratto utile | Che cosa prova il test | Che cosa non promette mai |
|---|---|---|---|
| `prepare` | inventaria valori esatti e metadati del caso | formati comuni IT/EN, annidamento, precisione, testi lunghi e nessuna sovrascrittura | di aver estratto ogni idea importante |
| `prompt` | esporta il prompt principale; con `--clean-room` crea la coppia separata | confini della fonte, dati inerti e nessuna vecchia frase nel passaggio di scrittura | che il modello destinatario obbedisca perfettamente |
| `check` | ripristina i segnaposto PV ed esamina una sola bozza | ripristino esatto, valori mancanti, sequenze, attacchi e lunghezza | fedeltà semantica o successo sul detector |
| `compare` | ripristina i segnaposto PV e mostra le stesse prove su almeno due bozze | nessun vincitore silenzioso, errori visibili e metriche limitate | quale testo suona davvero tuo |

Il comando `targets` è stato eliminato perché non superava questo standard. Il proxy lessicale non sapeva identificare le posizioni private di Claude e poteva privilegiare proprio i fatti rari. Anche il torneo adattivo è stato rimosso perché non era davvero adattivo. Tenerli avrebbe fatto sembrare il repository più grande senza informare meglio chi legge.

## Il prompt e la skill

I prompt copiabili e la skill per agenti restano perché hanno un contratto pubblico.

- Il [prompt di ricerca](prompts/it/research-pass.md) deve restituire una scheda JSON fissa oppure `BRIEF_ERROR`.
- Il [prompt di scrittura](prompts/it/drafting-pass.md) riceve soltanto la scheda controllata e restituisce una bozza oppure `BRIEF_ERROR`.
- La [skill per agenti](skills/non-anthropic-text-rewrite/README.it.md) deve fermarsi se non può creare un contesto isolato o verificare la mappa semantica.

I test automatici controllano confini e output richiesti. Non possono costringere ogni agente di terze parti a comportarsi bene. Questo limite compare prima dell'installazione, non nascosto dopo.

## Scorciatoie che non si sono meritate un percorso

- I sinonimi leggeri conservano gran parte di contesto e struttura.
- Cambiare la punteggiatura tocca troppo poche scelte di token.
- I pulitori Unicode risolvono un problema diverso. Anthropic descrive uno schema statistico nei token, non caratteri invisibili.
- La retrotraduzione può distruggere le precisazioni senza offrire garanzie oneste.
- Cancellare parole a caso può abbassare la somiglianza rendendo il testo peggiore.
- Il codice pubblico di SynthID non possiede la chiave o la configurazione privata di Anthropic.

La chiusura onesta è semplice: questi metodi possono produrre una bozza controllata nei fatti, con formulazione davvero nuova e prove meccaniche visibili. Nessuno può emettere il verdetto privato di Anthropic. È una promessa più piccola di “watermark rimosso” e un prodotto molto più utile della finzione contraria.
