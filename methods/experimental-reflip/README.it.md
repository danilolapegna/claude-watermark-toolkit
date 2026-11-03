# Riscrittura locale automatica sperimentale con Reflip

[English](README.md) · [Tutti i metodi](../../METHODS.it.md)

Usa questa strada soltanto se la tua domanda è: “Posso far creare al browser una bozza automatica locale con pochissima preparazione?”

Sì, in via sperimentale. [Reflip](https://nerln.github.io/reflip/app/?lang=it) è un progetto open source separato. Scarica un piccolo modello di scrittura, lo esegue sul tuo dispositivo e mostra un confronto essenziale di nomi, numeri, negazioni e quantificatori. Non usa Anthropic e non può dirti se il watermark privato di Claude sia sparito.

## Che cosa ti serve

- Un browser desktop recente che supporti WebGPU;
- circa 800 MB per il modello di scrittura più piccolo;
- un testo che hai diritto di modificare;
- la pazienza di controllare la risposta riga per riga.

Non servono account o applicazioni da installare. Il download del modello usa la rete. Durante l'elaborazione, il codice di Reflip blocca le richieste di rete. Questo toolkit ha esaminato il codice e riprodotto la suite automatica il 3 novembre 2026; Reflip resta un software di terzi con licenza MIT propria.

## I passaggi esatti

1. Apri [Reflip nel browser](https://nerln.github.io/reflip/app/?lang=it).
2. Scegli **Riscrivi**.
3. Incolla la fonte nel campo **Testo**.
4. Lascia selezionato il modello Qwen più piccolo, così riduci il download.
5. Premi il pulsante per scaricare il modello e riscrivere. Al primo uso sono circa 800 MB.
6. Aspetta che compaia **Testo riscritto**.
7. Leggi il confronto dei fatti subito sotto.
8. Copia il risultato soltanto dopo aver verificato ogni affermazione, numero, nome, negazione e precisazione contro la fonte.
9. Se è cambiato un fatto, correggilo tu. Se ne sono cambiati diversi, fermati e passa a [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) con un writer più capace oppure alla [camera stagna](../two-envelope-clean-room/README.it.md).

## Che cosa dice il test pubblicato

Sul surrogato SynthID aperto di Reflip, il modello più piccolo del browser ha portato 22 testi su 24 sotto la soglia z scelta dallo studio. È un risultato utile su una configurazione pubblica con una chiave nota. Non viene dal detector di Anthropic.

Nello stesso benchmark il modello piccolo ha cambiato circa 14 fatti contati ogni mille parole. Il controllo di Reflip ha intercettato il 60% delle modifiche provate a numeri, nomi, negazioni e quantificatori. Nel 38% delle coppie esaminate c'erano altri cambiamenti di significato che il controllo non vedeva. È un generatore di prima bozza, non un sistema di approvazione.

## Quando merita di essere usato

Ha senso per testi a basso rischio, quando elaborazione locale e comodità di un pulsante contano più della fedeltà al primo tentativo. Non usarlo come unico controllo per contratti, materiale medico o legale, affermazioni accademiche, specifiche tecniche o qualunque testo in cui una precisazione alterata possa fare danni.

Per un testo importante è migliore la strada meno magica: preparare una scheda controllata, usare un writer capace e confrontare la bozza con la fonte.
