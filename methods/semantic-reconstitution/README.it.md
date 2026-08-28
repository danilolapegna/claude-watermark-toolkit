# Percorso 5: preparazione e controlli locali ripetibili

[English](README.md) · [Parti da zero](../../start-here/it/README.md#voglio-la-cli-locale) · [Confronta tutti i percorsi](../../METHODS.it.md)

> **Ideale per:** lavoro ripetuto, file locali e controlli leggibili da altri strumenti  
> **Tempo:** preparazione più pochi minuti per testo  
> **Richiede:** Node.js 20 o successivo  
> **Chiama un modello:** mai

## “Perché usare il Terminale se non scrive?”

Perché è nella ripetizione che i passaggi manuali iniziano a cambiare senza volerlo. La CLI protegge gli stessi tipi di valori, esporta lo stesso prompt strutturato e applica gli stessi controlli meccanici ogni volta. Se hai un testo solo, usa direttamente [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it).

La CLI conteneva anche un batch locale automatico. Nei test reali con gpt-oss 20B ha restituito JSON al posto della prosa, copiato troppo da vicino la scheda e talvolta rifiutato una scheda valida già controllata. La preparazione in più non comprava un risultato migliore, quindi quel percorso è stato tolto.

## Parti da un file di testo semplice

Salva la fonte come `sorgente.txt`, poi controlla l'inventario dei valori esatti:

```bash
node bin/watermark-toolkit.js prepare sorgente.txt --lang it --out caso.json
```

Apri `caso.json`. Se manca un nome importante o una formula fissa, ripeti il comando aggiungendo uno o più valori:

```bash
node bin/watermark-toolkit.js prepare sorgente.txt \
  --lang it \
  --protect "Nome Esatto" \
  --protect "Formula tecnica fissa" \
  --out caso.json
```

L'inventario riconosce date, numeri, valute, URL, email, citazioni, sigle e nomi che cominciano con una sigla nei formati più comuni. Non può capire quale frase ordinaria sia decisiva per il tuo ragionamento.

## Esporta il prompt strutturato

```bash
node bin/watermark-toolkit.js prompt sorgente.txt --lang it --out prompt.json
```

Apri `prompt.json`, copia il valore dentro `prompt` e passalo a un sistema di scrittura non Anthropic. I valori esatti compaiono come segnaposto `[PV-01]`. Per la coppia separata dalla fonte, più lenta, aggiungi `--clean-room`.

Salva la risposta come `candidato.txt`, lasciando intatti tutti i segnaposto PV.

## Ripristina i valori esatti e controlla una bozza

```bash
node bin/watermark-toolkit.js check sorgente.txt candidato.txt --lang it
```

L'output ripristina in memoria ogni segnaposto PV riconosciuto e riporta valori protetti, sequenze di quattro parole rimaste, sequenza identica più lunga, attacchi di frase ripetuti, lunghezza e variazione della leggibilità. Nessuno dei due file viene modificato.

Per due o più bozze:

```bash
node bin/watermark-toolkit.js compare sorgente.txt candidato-a.txt candidato-b.txt --lang it --json
```

`compare` mostra le stesse prove per ogni bozza. Non restituisce un vincitore automatico.

## Leggi il risultato senza tirare a indovinare

- `mechanicallyValid: true` significa che i valori protetti sono rimasti e la lunghezza rientra nel margine ampio configurato.
- `semanticStatus: "requires-manual-review"` significa esattamente quello che dice.
- Un `ngramSurvival` più basso indica meno superficie copiata, non prosa migliore.
- `missingInvariants` nomina i valori esatti scomparsi.
- `recommended` resta vuoto perché le misure di superficie non possono scegliere la tua voce.

## Contratto, test e limite

**Contratto:** preparare prompt ed esaminare le bozze ricevute senza chiamare modelli, caricare dati o modificare la fonte.

**Controllo ripetibile:** la suite copre valori inglesi e italiani, annidamento, ripristino carattere per carattere, testi lunghi, tentativi di sovrascrittura, confini dei prompt e inversioni semantiche che le misure superficiali non possono vedere.

**Limite:** la CLI non scrive, non approva il significato e non riproduce il detector Anthropic. Devi ancora scegliere il modello esterno, verificare ogni affermazione e prendere la decisione editoriale finale.
