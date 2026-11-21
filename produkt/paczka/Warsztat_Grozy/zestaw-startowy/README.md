# Zestaw startowy „Warsztat Grozy”

Silnik animacji, którego używamy do naszych filmów: rysowanie w canvas (1080×1920, 30 fps), render klatek w przeglądarce bez okna (Playwright) i dźwięk w ffmpeg.

## Wymagania
- Node.js 18+ i `npm i playwright` (z przeglądarką Chromium), Python 3.10+, ffmpeg
- Konto ElevenLabs (lektor) – klucz w zmiennej/ustawieniach zgodnie z `narr.py`
- Zalecane: Claude Code do pisania scen (patrz prompty w poradniku, dodatek B)

## Szybki start
1. Skopiuj `odcinek-przyklad/` do katalogu obok silnika, np. `mojodc/`.
2. Podgląd bez lektora: w `config.py` ustaw `PREVIEW_NO_VOICE = True`, uruchom `python3 preview_lines.py mojodc`, potem `./build.sh mojodc`.
3. Wersja z lektorem: `PREVIEW_NO_VOICE = False`, usuń `mojodc/timeline.js`, `./build.sh mojodc`.
4. Gotowy plik: `mojodc/out/final.mp4`.

Efekty dźwiękowe z katalogu `dzwieki/` wstaw do `cache/sfx/`. Pozostałe dźwięki z konfiguracji przykładu (np. pukanie, skrzypienie) dodaj z własnej biblioteki albo wygeneruj.

## Licencja
Kod i dźwięki z paczki możesz używać i zmieniać we własnych filmach, także zarabiających. Nie wolno odsprzedawać ani udostępniać paczki dalej.
Postacie i historie z przykładu („Baba Jaga”, Ola) są nasze – używaj ich do nauki, a w swoich filmach twórz własne.
