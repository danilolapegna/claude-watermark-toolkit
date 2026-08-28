# Percorso 3: il metodo delle due buste

[English](README.md) · [Confronta tutti i percorsi](../../METHODS.it.md) · [Usa la versione guidata](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it)

> **Ideale per:** separazione forte dalle vecchie frasi senza installare la CLI<br>
> **Tempo:** circa 15-40 minuti<br>
> **Difficoltà:** richiede pazienza, non competenze tecniche<br>
> **Testo inviato altrove:** soltanto se scegli un writer o modello esterno

## “Due buste? Sembra già un teatrino da ufficio.”

Obiezione legittima. Possono essere due note su una pagina bianca. Il nome serve a imporre una separazione utile:

- la Busta 1 protegge **ciò che deve restare vero**;
- la Busta 2 descrive **come scrivi davvero**.

Le vecchie frasi non entrano in nessuna delle due. Una volta controllate le buste, chiudi la fonte e scrivi soltanto da quelle.

## Sceglilo al posto del prompt rapido quando

- la fonte è riservata e il contesto di scrittura non dovrebbe vederla;
- una prima parafrasi è rimasta decisamente troppo vicina;
- la tua voce conta abbastanza da essere descritta in modo esplicito;
- puoi spendere dieci minuti in più per controllare la scheda.

Se vuoi soltanto la strada seria più breve, usa il prompt rapido predefinito in [Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it). Questa è l'opzione più lenta, con un confine più netto rispetto alla fonte.

## Passaggio 1: costruisci la Busta 1

Copia questo schema e compilalo con appunti brevi:

```text
BUSTA 1: FATTI E SIGNIFICATO

Scopo:
Che cosa deve capire o fare chi legge?

Pubblico:
Chi legge e che cosa sa già?

Idee:
- Un'idea autonoma per riga

Prove e precisazioni:
- Esempi, cause, confronti, incertezze, eccezioni

Valori protetti:
- Nomi, numeri, date, URL, fonti, citazioni dirette

Formato:
- Lunghezza indicativa, sezioni, risultato richiesto
```

Non copiare frasi intere, salvo quando la formula deve restare identica. Se un'idea contiene “e”, controlla se in realtà sono due idee.

## Passaggio 2: costruisci la Busta 2

“Scrivi nel mio stile” non è un'istruzione. Dai al writer comportamenti che possa seguire:

```text
BUSTA 2: VOCE

Ritmo delle frasi:
- Breve, lungo, misto, affollato, brusco?

Registro:
- Formale, parlato, tecnico, secco?

Abitudini da conservare:
- Connettivi, incisi, domande, grado di incertezza

Abitudini da evitare:
- Parole, aperture, cliché e formati che non userei mai

Esempi reali:
- Due brevi passaggi scritti da me, se la privacy lo permette
```

“Naturale, professionale e coinvolgente” produce prosa generica perché può voler dire qualunque cosa. “Aperture brevi, seconda frase più lunga, incertezza detta chiaramente, mai la parola ‘sbloccare’” dà indicazioni vere.

## Passaggio 3: controlla le due buste

Riapri la fonte e verifica un punto alla volta:

1. Ogni idea ha una nota corrispondente.
2. Ogni precisazione ed eccezione è sopravvissuta.
3. I valori protetti sono esatti.
4. Nelle buste non è stato inventato nulla.
5. Gli esempi di voce sono tuoi, non copiati dalla fonte da ricostruire.

Non scrivere ancora la bozza. Prima sistema le buste.

## Passaggio 4: sigilla la fonte

Chiudi la fonte. Un writer umano o un sistema non Anthropic riceve entrambe le buste, mai le vecchie frasi.

Con un modello esterno, apri una conversazione completamente nuova e incolla soltanto le buste controllate con questa istruzione:

```text
Scrivi una nuova bozza partendo da queste buste controllate. Conserva ogni valore protetto e ogni precisazione. Scegli costruzioni di frase e passaggi fra paragrafi nuovi. Non aggiungere fatti. Restituisci soltanto la bozza.
```

Il modello può consumare crediti e riceverà tutti i fatti sensibili presenti nelle buste. Per testi riservati, usa un modello locale non Anthropic oppure una persona con un accordo di riservatezza adeguato.

## Passaggio 5: controlla la nuova bozza

Confronta il significato prima delle frasi:

- idee e precisazioni;
- valori protetti;
- aggiunte non supportate;
- pubblico e azione desiderata;
- indicazioni sulla voce.

Soltanto dopo controlla se sono rimasti lunghi pezzi della fonte o lo stesso scheletro dei paragrafi. Ricostruisci passaggi interi, non singoli sinonimi.

## Se qualcosa va storto

| Problema | Causa probabile | Recupero |
|---|---|---|
| La bozza è corretta ma generica | La Busta 2 contiene aggettivi, non comportamenti | Aggiungi ritmo, connettivi e parole vietate concrete |
| È sparita una precisazione | La Busta 1 l'ha fusa in un'idea più grande | Dalle una riga autonoma |
| La nuova bozza somiglia ancora alla fonte | Le buste contengono frasi già rifinite | Riducile ad appunti atomici e apri un contesto nuovo |
| Il modello inventa dettagli che sembrano utili | L'istruzione ha premiato la completezza | Elimina le aggiunte e rafforza “non aggiungere fatti” |

## Quando fermarti

Se due bozze ripetono lo stesso problema fattuale o di tono, fermati e ripara le buste. Generare ancora da una scheda rotta rende soltanto l'errore più fluido.

La versione nel browser vive dentro Rewrite Room sotto **Vuoi separare ancora di più le formulazioni?**. Protegge i valori e confronta la bozza finale in locale, lasciando a te la scelta del sistema di scrittura.
