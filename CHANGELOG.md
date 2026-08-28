# Changelog

## 2026-08-28 21:45 CEST

- Ricostruiti repository, Rewrite Room e guide attorno a un unico percorso spiegato da zero: prompt builder, writer scelto dalla persona, bozza restituita e controllo locale.
- Aggiunte le strade complete LM Studio e Ollama, riscritta la CLI nominando ogni file e rimossi dai percorsi pratici i prototipi che non giustificavano la loro complessità.
- Pubblicati il benchmark bilingue a otto casi, la revisione semantica manuale e anche il tentativo di prompt più severo che ha fallito i gate.
- Delivery Readiness Gate eseguito, profilo locale: `STAGE_READY`. Il verdetto `RELEASE_READY` richiede ancora merge, deploy e Journey Observatory sul runtime pubblico.

## 2026-08-28 19:27 CEST

- Rebuilt Rewrite Room as an explicit local prompt builder with protected-value restoration and surface checks.
- Rewrote the English and Italian entry points for first-time readers.
- Removed provider calls, automatic generation, targeting, tournament and batch features that failed the practical-value gate.
- Added reproducible prompt and clean-room benchmarks, public red-team evidence and regression contracts.
- Delivery Readiness Gate completed: `RELEASE_READY`. PR 4, GitHub Pages, website PR 24 and the Lovable production publish were verified from their public surfaces.
