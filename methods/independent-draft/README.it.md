# Percorso 4: bozza indipendente in un altro sistema non Anthropic

[English](README.md) · [Copia i prompt](../../prompts/it/research-pass.md) · [Confronta tutti i percorsi](../../METHODS.it.md)

> **Ideale per:** chi vuole l'aiuto di un modello senza installare la CLI  
> **Tempo:** circa 10-30 minuti  
> **Difficoltà:** due chat e un controllo attento dei fatti  
> **Privacy:** la prima chat vede la fonte, la seconda vede la scheda

## “Perché non apro una nuova chat e chiedo una parafrasi?”

Perché la finestra nuova non è la parte importante. Il contesto che scrive non deve ricevere le vecchie frasi.

Questo percorso usa due conversazioni davvero separate:

1. Una conversazione di ricerca trasforma la fonte in una scheda controllata.
2. Una conversazione di scrittura riceve soltanto la scheda e crea una nuova bozza.

Due messaggi nella stessa chat non valgono. La cronologia può conservare la fonte anche se il secondo messaggio dice di ignorarla.

## Che cosa ti serve

- un sistema di scrittura non Anthropic;
- il [prompt di ricerca](../../prompts/it/research-pass.md);
- il [prompt di scrittura](../../prompts/it/drafting-pass.md);
- il permesso di inviare fonte e scheda al provider scelto.

Il provider può usare il suo piano o i suoi crediti AI. Può anche applicare un proprio watermark o sistema di provenienza. Per testi riservati o zero crediti ospitati, usa un modello open locale.

## Passaggio 1: esegui la ricerca

Apri una conversazione senza cronologia rilevante. Copia tutto il prompt di ricerca, sostituisci il segnaposto con la fonte e invialo.

Il risultato atteso è una scheda JSON con scopo, pubblico, idee atomiche, prove, precisazioni, valori protetti, vincoli e indicazioni sulla voce. Se ricevi prosa, chiedi una volta soltanto JSON valido. Se fallisce ancora, cambia modello o prepara la scheda a mano.

## Passaggio 2: controlla la scheda

Non fidarti soltanto perché sembra ordinata. Confronta fonte e JSON:

- ogni idea della fonte ha una voce atomica corrispondente;
- “può”, “probabile”, “soltanto”, “salvo” e altre precisazioni sopravvivono;
- nomi, numeri, date, link, fonti e citazioni sono esatti;
- non sono stati inventati idee, pubblico o conclusioni;
- le note sulla voce descrivono comportamenti, non aggettivi generici.

Correggi tu il JSON prima di continuare.

## Passaggio 3: apri un contesto di scrittura pulito

Apri una conversazione completamente nuova in un sistema non Anthropic. Non incollare la fonte. Copia il prompt di scrittura, inserisci soltanto il JSON controllato e invialo.

Se il servizio condivide automaticamente la memoria fra chat, disattivala per questo lavoro oppure usa una sessione locale separata.

## Passaggio 4: chiedi alternative visibili

Una bozza può essere fluida e conservare comunque una struttura prevedibile. Chiedi un secondo candidato dalla stessa scheda, con un ordine delle idee o un piano dei paragrafi diverso. Non dare la Versione A in input per creare la Versione B.

## Passaggio 5: scegli prima in base al significato

Scarta subito una bozza se perde un valore protetto, cambia una precisazione o aggiunge un'idea. Fra i candidati validi, scegli quello più adatto alla tua voce e al pubblico. La bassa somiglianza delle frasi è un segnale utile, non il voto decisivo.

Puoi incollare la bozza scelta in [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) per i controlli superficiali locali.

## Mappa dei problemi

| Problema | Che cosa è probabilmente successo | Recupero |
|---|---|---|
| Le due bozze suonano uguali | La scheda è troppo prescrittiva o generica | Accorcia le idee e aggiungi comportamenti concreti della voce |
| La bozza ripete frasi della fonte | La fonte è entrata nel contesto di scrittura o nella scheda ci sono frasi rifinite | Riparti da un contesto davvero pulito con note atomiche |
| I fatti slittano | La scheda di ricerca non è stata controllata | Riparala prima di generare ancora |
| Il provider ignora o rifiuta il JSON | Il modello non è adatto alla fase di ricerca | Prepara le due buste a mano o cambia modello non Anthropic |

## Quando fermarti

Dopo due candidati con lo stesso difetto, smetti di generare. Il collo di bottiglia è la scheda. Correggila oppure usa un editor umano.
