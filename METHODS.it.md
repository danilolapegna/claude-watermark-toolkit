# Tre modi per scrivere, più gli strumenti che meritano di restare

[English](METHODS.md) · [Parti da zero](start-here/it/README.md) · [Apri Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it)

La scelta utile è più piccola di quanto sembri. Devi capire chi scriverà la nuova bozza, che cosa vedrà e come controllerai il risultato.

## Scegli in trenta secondi

| La tua situazione | Parti da qui | Tempo | Che cosa ricevi davvero |
|---|---|---:|---|
| L'assistenza è ammessa e basta dichiararla | Lascia il testo com'è e dichiara | 2 min | nessuna riscrittura inutile e nessun nuovo errore |
| Il testo è breve o deve restare completamente privato | [Riscrivi da una scheda dei fatti](methods/human-redraft/README.it.md) | 10-60 min | una bozza scritta da te senza invii |
| Vuoi la strada guidata più semplice | [Usa Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) | 2-5 min più il tempo di scrittura | un prompt pronto e controlli locali sulla bozza ricevuta |
| Vuoi far girare il modello sul tuo computer | [Usa LM Studio oppure Ollama](methods/local-model/README.it.md) | installazione più tempo di scrittura | lo stesso prompt eseguito senza un writer ospitato |
| Chi scrive non deve vedere le vecchie frasi | [Usa la camera stagna](methods/two-envelope-clean-room/README.it.md) | 15-40 min | una bozza nata soltanto da fatti e voce controllati |
| Usi già un agente non Anthropic | [Installa la skill](skills/non-anthropic-text-rewrite/README.it.md) | 10-30 min | il percorso separato eseguito dall'agente, con due approvazioni umane |
| Ripeti spesso il lavoro o vuoi file salvati | [Usa la CLI facoltativa](methods/semantic-reconstitution/README.it.md) | preparazione più pochi minuti | file con i prompt e resoconti meccanici ripetibili |

Per quasi tutti la risposta è Rewrite Room più un modello di scrittura già disponibile. Se il problema sono privacy o crediti ospitati, tieni Rewrite Room e cambia soltanto il passaggio di scrittura: usa LM Studio o Ollama.

## Percorso 1: riscrivi da una scheda dei fatti

Qui viene spontaneo pensare: “Grazie, basta scriverlo di nuovo. Duh.” Certo. Resta perché questa vuole essere una guida completa, non un catalogo costruito per far sembrare indispensabile il software.

- **Usalo quando:** il testo è breve, riservato o abbastanza importante da meritare la tua attenzione diretta.
- **Che cosa entra:** una scheda con scopo, idee, prove, precisazioni, valori esatti e note sulla voce.
- **Che cosa succede:** chiudi la fonte e scrivi dalla scheda.
- **Che cosa esce:** una nuova bozza che non passa da un altro modello.
- **Controllo:** riapri la fonte soltanto alla fine e verifica ogni idea e precisazione.
- **Fermati se:** la scheda non riesce a contenere il testo senza perdere relazioni. Passa alla camera stagna.

[Segui il percorso manuale completo](methods/human-redraft/README.it.md).

## Percorso 2: Rewrite Room, poi scegli chi scrive

Rewrite Room è un prompt builder con controlli locali. Non scrive.

Il percorso normale è questo:

1. Incolla la fonte in Rewrite Room.
2. Copia il prompt che prepara.
3. Incolla quel prompt in un writer non Anthropic.
4. Riporta la bozza ricevuta in Rewrite Room.
5. Ripristina i valori esatti e guarda il resoconto.

Al passaggio 3 scegli fra:

- **un modello non Anthropic ospitato:** nessuna installazione, ma il provider riceve il prompt e può usare crediti o applicare un proprio sistema di provenienza;
- **un modello locale con LM Studio o Ollama:** niente crediti di scrittura ospitati e niente invio al writer, ma devi installare un modello pesante e la qualità dipende dalla macchina.

Il browser controlla soltanto ciò che può osservare: valori protetti, lunghe sequenze condivise, gruppi di quattro parole rimasti, inizi delle frasi, struttura e lunghezza. Non approva il significato e non riproduce il detector privato di Anthropic.

[Apri Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) oppure [prepara il modello locale partendo da zero](methods/local-model/README.it.md).

## Percorso 3: la camera stagna

“Due buste per un paragrafo sembrano decisamente troppo.” Lo sono. Per un paragrafo non usarle.

Servono quando il testo conta abbastanza da non voler mostrare le vecchie frasi al contesto che scrive. La Busta 1 contiene fatti, idee e precisazioni. La Busta 2 contiene comportamenti concreti della voce. Chi scrive riceve le buste, non la fonte.

- **Che cosa ottieni:** una separazione più forte dalla vecchia formulazione.
- **Che cosa costa:** una scheda accurata e un secondo controllo dei fatti.
- **Errore principale:** una scheda sbagliata produce una bozza originale e sbagliata.
- **Fermati se:** due bozze ripetono lo stesso errore. Ripara le buste invece di generare ancora.

[Costruisci le due buste](methods/two-envelope-clean-room/README.it.md).

## Strumento 1: la skill per agenti

Una skill è un file di istruzioni riusabile da un agente. Non è un modello più forte e non è un'app. Confeziona il percorso a camera stagna, così l'agente può preparare la scheda, isolare la scrittura e mostrare i compromessi ogni volta.

Usala soltanto se possiedi già un agente non Anthropic capace di creare un contesto di scrittura davvero isolato. Se non sai dove il tuo agente carichi le skill, non ti stai perdendo un metodo segreto. Usa Rewrite Room.

[Guarda esattamente come allegare o installare la skill](skills/non-anthropic-text-rewrite/README.it.md).

## Strumento 2: la CLI locale

CLI significa uno strumento controllato da comandi nel Terminale. Serve per conservare file e ripetere il lavoro, non per produrre prosa migliore.

Il percorso normale è `sorgente.txt -> prompt.txt -> writer -> bozza.txt -> check`. `prepare` mostra in anticipo i valori protetti. `compare` presenta le stesse prove su due bozze. Nessuno dei due è obbligatorio nel percorso normale.

[Segui la CLI dal download al controllo finale](methods/semantic-reconstitution/README.it.md).

## Scorciatoie che non meritano un percorso

Punteggiatura, pulitori di caratteri invisibili e pochi sinonimi colpiscono il livello sbagliato. Retrotraduzione e riscritture ripetute possono aggiungere errori. Il codice pubblico di SynthID non possiede la chiave privata di Anthropic. Ricerche chiamate SIRA, B4 e TSAPA hanno informato i test, ma non sono azioni che chi legge dovrebbe eseguire.

I prototipi di targeting e torneo sono stati eliminati perché i proxy locali non sapevano individuare il segnale privato di Claude e potevano incoraggiare modifiche proprio al linguaggio fattuale più raro. Anche il writer locale automatico è stato tolto dopo esecuzioni reali che restituivano JSON, copiavano troppo e rifiutavano schede valide. La ricerca resta pubblica in [meccanica probabile](research/probable-mechanics.md) e nel [resoconto di red-team](REDTEAM.md), separata dal prodotto.

## La chiusura onesta

Queste strade possono produrre una bozza controllata nei fatti e ricostruita seriamente nelle parole. Nessuna può emettere il verdetto privato di Anthropic. Scegli in base a fedeltà, privacy, tempo e responsabilità che vuoi assumerti sul testo finale.
