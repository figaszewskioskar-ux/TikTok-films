# BLOK 94 – zasady projektu

## Długość odcinków
- **Każdy film (odcinki i specjale) ma mieć minimum 1:40 — ani sekundy mniej.** Cel: ok. 1:55–2:00.
  `film/narr.py` domyślnie wydłuża oś czasu do 118 s (`TARGET`), rozciągając sceny i pauzy, bez nowych nagrań lektora.
  Jeśli narracji jest za mało, dopisz więcej scen lub kwestii w `SEG`, zamiast zostawiać krótszy film.
- **Gotowych filmów nie przerabiamy i nie renderujemy ponownie**, chyba że użytkownik wyraźnie o to poprosi.
  W ich `config.py` jest `TARGET = None`, żeby zostały w długości, w jakiej powstały.

## Styl serii
- Realistyczny, nocny strach, bez humoru w stylu skeczu. Lektor (głos Victor, ElevenLabs) opowiada całą historię.
- Każda część: hak z czerwoną tablicą „NIE …!”, 2 błędy (karty BŁĄD 1/2), 1 zasada bezpieczeństwa (karta ZASADA), niespodziewany cliffhanger i napis „ODC. N ↓”.
- **Zakończenie zawsze przerażające:** ostatnie 8–12 s to straszny zwrot akcji (coś/ktoś się pojawia, szept, światło gaśnie), który zostawia widza z pytaniem i chęcią obejrzenia kolejnego odcinka.
  Pod zakończeniem zawsze **przerażający dźwięk w tle**: narastający niski dron/szum, bicie serca, a na sam koniec mocne uderzenie (stinger) lub nagła cisza po nim.
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

## Wzorzec jakości animacji (na podstawie filmów @nierobcietego — wzorujemy się poziomem, niczego nie kopiujemy)
- **Tła pełne detali:** każda scena ma rozpoznawalne miejsce z wieloma przedmiotami (meblościanka, dywan we wzór, kafelki,
  lampa z kloszem, zegar, obrazki, rośliny, kaloryfer). Na zewnątrz: kamienice z cegły, oświetlone okna, latarnie, drzewa, śnieg, samochody.
- **Światło jako nastrój:** ciepłe plamy światła pod lampami, chłodna noc dookoła, latarnie i okna rzucają poświatę.
- **Postacie z charakterem:** różne fryzury, czapki, szaliki, wzory na swetrach, zamki i guziki kurtek; mocna mimika
  (szeroki, niepokojący uśmiech u „miłego” obcego, łzy, strach). Tłum to też różne postacie, nie identyczne kształty.
- **Drobne animacje życia:** para z ust na mrozie, padający śnieg, migające światło, fale dźwięku przy mówiącej postaci,
  kołysanie, mruganie.
- **Kadrowanie:** zbliżenia na twarze w kluczowych momentach, dzielony ekran (dwa miejsca naraz), ciemna winieta jak przez okno.
- **Każdy przedmiot z fabuły pokazany wyraźnie** (zegar z godziną, ślady butów, telefon, klucze).

## Oszczędzanie kredytów ElevenLabs
- Nowe kwestie dopisuj **na końcu listy `SEG`** (kolejność w liście nie zmienia czasu sceny). Wstawienie w środek przesuwa numery plików i wymusza ponowne nagranie wszystkich dalszych kwestii.
- Nie zmieniaj tekstu nagranych kwestii, jeśli nie trzeba: każda zmiana to nowe nagranie. Przesunięcie czasu (`a`) jest darmowe.
- Rozpoznawanie mowy (sprawdzanie) tylko dla nowych nagrań i raz na gotowy film, nie wielokrotnie.
- Efekty dźwiękowe najpierw z biblioteki `film/cache/sfx` lub generowane lokalnie; ElevenLabs tylko gdy brak odpowiednika.
- Przed większym nagraniem sprawdź stan kredytów i podaj szacunek użytkownikowi.
