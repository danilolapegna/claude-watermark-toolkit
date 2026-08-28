# Fai scrivere la bozza al tuo computer

[English](README.md) · [Apri Rewrite Room](https://danilolapegna.github.io/claude-watermark-toolkit/?lang=it) · [Torna a tutti i percorsi](../../METHODS.it.md)

> **Usalo quando:** non vuoi consegnare il testo a un servizio di scrittura ospitato  
> **Che cosa ottieni:** una chat locale dove incolli il prompt di Rewrite Room e ricevi una bozza  
> **Costo:** zero crediti AI ospitati; un download, spazio su disco, elettricità e tempo del computer  
> **Punto essenziale:** il modello locale scrive; Rewrite Room prepara e controlla

## Prima cosa: che cos'è un modello locale?

È un modello di scrittura che gira sul tuo computer. Il browser continua a preparare il prompt. Invece di incollarlo dentro una chat AI online, lo incolli in un'app installata sulla stessa macchina.

Risolve un problema preciso: per la fase di scrittura non serve un account AI ospitato. Non dimostra che il testo supererà un detector privato. E se il modello è troppo piccolo può perdere fatti, appiattire il tono o scrivere peggio.

Se il Terminale ti sembra già una seccatura, scegli LM Studio. Se invece usi volentieri i comandi, Ollama è più essenziale. Te ne serve uno, non entrambi.

## Prima di scaricare: il computer ce la fa?

LM Studio consiglia 16 GB di memoria. Il pacchetto attuale di Qwen3.5 9B richiede circa 7 GB di memoria e un download simile. Per questo lavoro è un punto di partenza sensato, non una garanzia di qualità.

- **16 GB o più:** parti da Qwen3.5 9B.
- **8 GB:** puoi provare Qwen3.5 4B, ma aspettati più sfumature perse e controlla la bozza con molta attenzione.
- **Meno di 8 GB o computer non supportato:** usa un modello non Anthropic ospitato oppure il percorso manuale.

Su macOS, LM Studio supporta al momento i Mac Apple Silicon e richiede macOS 14 o successivo. La pagina ufficiale elenca anche i requisiti aggiornati per Windows e Linux.

## Opzione A: LM Studio, quella con pulsanti e chat

Sceglila se vuoi evitare il Terminale.

### Che cosa entra e che cosa esce

- **Input:** tutto il prompt copiato da Rewrite Room.
- **Azione:** lo incolli in una nuova chat di LM Studio e lo invii una volta.
- **Output:** una nuova bozza.
- **Passaggio successivo:** riporti la bozza in Rewrite Room e premi **Ripristina i valori e controlla**.

### Installazione e uso partendo davvero da zero

1. Scarica LM Studio dalla [pagina ufficiale](https://lmstudio.ai/download).
2. Installalo e aprilo.
3. Apri **Discover**. Cerca `qwen3.5-9b`.
4. Apri la pagina di Qwen3.5 9B e scarica la versione locale consigliata. Sono circa 7 GB, quindi il download può richiedere un po'.
5. Apri **Chat**.
6. Dal selettore del modello in alto, carica quello appena scaricato. “Caricare” significa metterlo nella memoria del computer. Non significa inviare il testo online.
7. Torna in Rewrite Room, premi **Copia tutto il prompt** e incollalo nella chat vuota di LM Studio.
8. Invia il prompt come un solo messaggio. Aspetta che il modello finisca.
9. Copia soltanto la bozza. Se contiene segnaposto come `[PV-01]`, non toccarli.
10. Incolla la bozza in Rewrite Room ed esegui il controllo locale.

Per questo percorso non ti servono la scheda Developer, un server locale o un'API.

## Opzione B: Ollama, quella più leggera da Terminale

Sceglila soltanto se aprire un Terminale non ti crea problemi. Ollama scarica il modello al primo avvio e poi apre una chat locale nella stessa finestra.

### Installazione e uso partendo davvero da zero

1. Scarica Ollama dalla [pagina ufficiale](https://ollama.com/download) e installalo.
2. Apri Terminale su macOS o Linux, oppure PowerShell su Windows.
3. Esegui questo comando esatto:

```bash
ollama run qwen3.5:9b
```

4. Al primo avvio scarica circa 6,6 GB. Quando compare il campo della chat, il modello è pronto.
5. Copia tutto il prompt preparato da Rewrite Room, incollalo nel Terminale e premi Invio.
6. Quando la bozza è completa, copiala e riportala in Rewrite Room.
7. Scrivi `/bye` per uscire dalla chat di Ollama.

La parte `:9b` conta. Se vuoi che la generazione resti sul computer, non scegliere una variante che termina con `:cloud`.

## Come capisci se il risultato è abbastanza buono

Scarta la bozza e prova un modello più grande, una scheda migliore o il percorso manuale quando succede una di queste cose:

- sparisce un nome, numero, data, citazione o segnaposto `[PV-XX]`;
- un “può” diventa una certezza, oppure un'affermazione negativa diventa positiva;
- compare un esempio, un argomento o una conclusione che prima non c'era;
- ottieni JSON, una lista o una spiegazione invece della prosa finale;
- il testo è corretto ma non sembra più scritto da te;
- restano quasi identici interi passaggi della fonte.

Rewrite Room intercetta una parte del primo e dell'ultimo problema. Il significato devi comunque leggerlo tu.

## Che cosa non promette questa strada

L'esecuzione locale evita crediti di scrittura ospitati e invio del testo a un provider di scrittura. Non ricrea il detector privato di Anthropic, non garantisce la fedeltà semantica e non stampa un certificato “watermark rimosso”.

Fonti ufficiali: [primi passi con LM Studio](https://lmstudio.ai/docs/app/basics), [requisiti di LM Studio](https://lmstudio.ai/docs/app/system-requirements), [Qwen3.5 9B in LM Studio](https://lmstudio.ai/models/qwen/qwen3.5-9b), [guida rapida di Ollama](https://docs.ollama.com/quickstart), [varianti Qwen3.5 per Ollama](https://ollama.com/library/qwen3.5/tags).
