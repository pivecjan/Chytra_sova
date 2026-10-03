# Chtra_sova

Modulární webová aplikace pro školní kvízy.

## Struktura

- `/index.html` – vstupní stránka aplikace
- `/src/data` – datové konfigurace (ročníky, předměty, otázky)
- `/src/core` – router a quiz engine
- `/src/ui` – vykreslovací funkce UI
- `/src/state` – lokální perzistence do `localStorage`
- `/tests` – základní testy logiky kvízu

## Spuštění

Aplikace je statická, stačí otevřít `/home/runner/work/Chtra_sova/Chtra_sova/index.html` v prohlížeči.

## Testy

```bash
npm test
```
