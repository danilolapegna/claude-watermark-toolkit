# Esempio completo

Testo di partenza: [`examples/fixtures/source-it.txt`](fixtures/source-it.txt).

## Valori da proteggere

- `2026-08-28`
- `120`
- `https://example.com`

## Scheda di ricostruzione

Scopo: descrivere un piccolo test sulla struttura delle informazioni.

Fatti:

1. Il 2026-08-28, 120 lettori hanno usato una breve guida pubblica.
2. Il test verificava se mettere i fatti all'inizio aiutasse a trovare prima l'idea centrale.
3. La domanda era volutamente circoscritta.
4. Il metodo era stato pubblicato prima di osservare l'esito.

Voce: semplice, misurata, senza conclusioni che superino la domanda dello studio.

## Versione A

Il 2026-08-28, 120 persone hanno letto una breve guida su https://example.com. I ricercatori volevano capire se mettere i fatti all'inizio rendesse più rapida l'individuazione dell'idea centrale. Hanno limitato lo studio a questa domanda e pubblicato il metodo prima di esaminare l'esito.

Il file è [`examples/fixtures/candidate-a-it.txt`](fixtures/candidate-a-it.txt).

## Versione B

I lettori trovano prima il punto centrale quando una guida comincia dai fatti? Il 2026-08-28, un test con 120 persone ha esaminato questa domanda su https://example.com. Gli autori avevano pubblicato il metodo prima di controllare che cosa fosse successo.

Il file è [`examples/fixtures/candidate-b-it.txt`](fixtures/candidate-b-it.txt).

## Che cosa restituisce lo strumento

Esegui:

```bash
node bin/watermark-toolkit.js compare \
  examples/fixtures/source-it.txt \
  examples/fixtures/candidate-a-it.txt \
  examples/fixtures/candidate-b-it.txt \
  --lang it \
  --json
```

Entrambe le schede restituiscono `valid: true` e `missingInvariants: []`. Il numero esatto di leggibilità può cambiare se la formula viene aggiornata, quindi non viene fissato in questa pagina. Il confronto utile resta chiaro: la versione B cambia di più la struttura, mentre la versione A conserva meglio il tono iniziale.
