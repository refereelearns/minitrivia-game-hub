# Minitrivia Game Hub

Erstelle in einem Durchgang das Grundgerüst für „minitrivia“, eine mobile-first Website, auf der später viele kleine Daily-Trivia-Spiele an einem Ort erreichbar sein sollen. Jetzt geht es ausschließlich um die Struktur.

Orientiere dich bei der Navigation an der Idee einer zentralen Spieleübersicht mit direktem Einstieg in jedes Spiel. Splash dient als strukturelle Referenz. Verwende für minitrivia ein schlichtes, eigenständiges Layout.

Baue genau zwei Ansichten:

1. Spieleübersicht (/)

Zeige im Kopfbereich „minitrivia“ und darunter ein responsives Raster mit drei neutralen Platzhalter-Kacheln („Spiel A“, „Spiel B“, „Spiel C“). Jede Kachel öffnet die zugehörige Spielseite.

2. Gemeinsame Spielvorlage (/spiel/:slug)

Zeige den jeweiligen Spielnamen, einen Link „Zur Spieleübersicht“ und einen leeren Inhaltsbereich, in den später das jeweilige Spiel eingesetzt werden kann. Alle Spiele verwenden dieselbe Seitenvorlage.

Pflege die Spiele in einer zentralen Liste mit Name und URL-Kürzel. Erzeuge daraus die Kacheln und Spielseiten. Ein vierter Listeneintrag muss automatisch als vierte Kachel erscheinen und unter seiner eigenen URL erreichbar sein.

Halte den Build klein. Nutze vorhandene Komponenten und lokale Beispieldaten. Spielmechaniken, Quizfragen, Tageswechsel, Fortschritt, Benutzerkonten und Backend liegen außerhalb dieses Auftrags. Die genannten Trivia-Spiele beschreiben nur den späteren Einsatzzweck.

Fertig ist das Gerüst, sobald jede Kachel auf Mobilgeräten und Desktop ihre Spielseite öffnet, diese auch per Direktlink erreichbar ist und der Rückweg zur Übersicht funktioniert.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f22b151c-a2db-4cbc-a70a-90dc19de120a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
