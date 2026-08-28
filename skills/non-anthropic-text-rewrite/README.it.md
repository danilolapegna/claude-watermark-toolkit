# Usa la skill pronta per un agente

[English](README.md) · [Apri il file della skill](SKILL.md) · [Usa invece Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it)

> **Ideale per:** chi usa già un agente di scrittura o coding non Anthropic  
> **Preparazione:** copia una cartella oppure allega un file  
> **Risultato atteso:** scheda controllata, valori protetti, bozze indipendenti e compromessi visibili  
> **Non serve per:** il primo tentativo o un agente che non può isolare scrittura e lettura della fonte

## “Che cos'è una skill, e mi serve davvero?”

Una skill è un file di istruzioni riusabile per un agente. Gli dice come eseguire l'intero flusso senza costringerti a incollare ogni volta lo stesso processo.

Se questa frase crea più domande che risposte, la skill non ti serve. Usa [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) oppure i [due prompt da copiare](../../prompts/it/research-pass.md).

## Prima di installarla

L'agente non deve essere Anthropic o Claude. Deve anche poter creare un contesto di scrittura davvero isolato, che non erediti fonte o cronologia della ricerca. Se non può, la skill deve fermarsi dopo aver prodotto la scheda.

Il provider dell'agente può consumare crediti e ricevere la fonte. Per testi riservati, usa un agente locale.

## Opzione A: allega il file per un solo lavoro

1. Scarica [`SKILL.md`](SKILL.md).
2. Apri un nuovo task nel tuo agente non Anthropic.
3. Allega `SKILL.md` e il file con la fonte.
4. Scrivi:

```text
Segui la skill non-anthropic-text-rewrite allegata per questa fonte. Tieni i contesti di ricerca e scrittura davvero isolati. Mostrami la scheda controllata prima di scrivere e fermati se manca una precisazione.
```

5. Controlla la scheda prima di lasciare continuare l'agente.

## Opzione B: installala come skill riusabile in stile Codex

Copia tutta la cartella `non-anthropic-text-rewrite` nella directory delle skill usata dal tuo agente non Anthropic. Il percorso preciso dipende dall'agente, quindi segui la sua documentazione ufficiale invece di indovinare.

Dopo l'installazione, apri un task con:

```text
Usa non-anthropic-text-rewrite sulla fonte allegata. Le mie priorità sono fedeltà fattuale, poi struttura nuova, poi voce. Non inviare e non pubblicare nulla.
```

## Che cosa deve mostrarti un'esecuzione corretta

- la scheda di ricostruzione controllata;
- i valori che devono restare identici;
- almeno due bozze strutturalmente indipendenti;
- il risultato sulla conservazione dei fatti per ciascuna;
- la sequenza più lunga rimasta dalla fonte;
- rischi fattuali e di voce detti in modo normale;
- nessun vincitore automatico, ma il compromesso di ogni bozza sopravvissuta detto in modo normale;
- lo stato esplicito `REQUIRES_MANUAL_SEMANTIC_REVIEW`.

Se ricevi soltanto un paragrafo levigato e un punteggio di confidenza, la skill non è stata seguita.

Il contratto di scrittura separato dalla fonte ha anche uno smoke test bilingue reale con gpt-oss 20B. Entrambi i casi ammessi hanno restituito prosa, conservato ogni valore esatto e rispettato il limite configurato sulla leggibilità. Dimostra che il flusso può funzionare su quelle fixture. Non dimostra che il tuo agente sappia isolare davvero i contesti o conservare ogni significato.

## I tuoi due punti di approvazione

Ferma l'agente due volte:

1. **Dopo la scheda:** controlla idee, precisazioni e valori protetti.
2. **Prima di scegliere la bozza:** scarta fatti inventati e scegli tu la voce.

L'agente non deve mai pubblicare, inviare o sovrascrivere la fonte al posto tuo.

## Se il runtime non può isolare i contesti

Prendi la scheda controllata dal primo giro, apri una conversazione completamente nuova e usa il [prompt di scrittura](../../prompts/it/drafting-pass.md). “Ignora la fonte precedente” non crea isolamento dentro lo stesso contesto.
