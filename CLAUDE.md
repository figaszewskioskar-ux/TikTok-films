# BLOK 94 – zasady projektu

## Długość odcinków
- **Każda nowa część serii „Kto tam?” ma mieć ok. 2 minut (ok. 1:55–2:00).**
  `film/narr.py` domyślnie wydłuża oś czasu do 118 s (`TARGET`), rozciągając sceny i pauzy, bez nowych nagrań lektora.
  Jeśli narracji jest za mało, dopisz więcej scen lub kwestii w `SEG`, zamiast zostawiać krótszy film.
- **Gotowych filmów nie przerabiamy i nie renderujemy ponownie**, chyba że użytkownik wyraźnie o to poprosi.
  W ich `config.py` jest `TARGET = None`, żeby zostały w długości, w jakiej powstały.

## Styl serii
- Realistyczny, nocny strach, bez humoru w stylu skeczu. Lektor (głos Victor, ElevenLabs) opowiada całą historię.
- Każda część: hak z czerwoną tablicą „NIE …!”, 2 błędy (karty BŁĄD 1/2), 1 zasada bezpieczeństwa (karta ZASADA), niespodziewany cliffhanger i napis „CZĘŚĆ N ↓”.
- Porady bezpieczeństwa muszą być prawdziwe.

## Produkcja
- Nowa część: katalog `film/odcN/` z `scenes.js` i `config.py`, potem `./build.sh odcN`. Gotowy plik kopiujemy do `wideo/`.
- Głosy i efekty: ElevenLabs (klucz w środowisku „Default”). Sklep Shopify: środowisko „TikTok-films sklep”.
- Na stronie i w grze nie pokazujemy spoilerów części, które jeszcze nie wyszły (suwaki „Ile części”).

## Reżyseria i jakość (uwagi użytkownika)
- **Miejsce akcji pokazujemy wprost.** Jeśli coś dzieje się na klatce schodowej, pokazujemy widok z klatki (korytarz, schody, drzwi z zewnątrz).
  Nie skracamy tego ujęciem uchylonych drzwi, po którym postacie są nagle w mieszkaniu Oli. Każde przejście między miejscami musi być widoczne lub jasno opisane.
- **Szczegóły przed oddaniem.** Przed wysłaniem filmu sprawdzić klatki co 2–3 s (arkusz kadrów):
  ciągłość miejsca i pozycji postaci między scenami, napisy niezasłaniające twarzy i rekwizytów,
  rekwizyty w rękach i przy postaciach (klamki, łańcuch, wieszak nie nachodzą na głowy), zgodność tekstu lektora z obrazem,
  numer odcinka w napisie u góry, poprawne nazwy i godziny. Dopiero potem wysyłać.
