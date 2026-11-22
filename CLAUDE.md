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
- **Kolejność pracy: najpierw film bez lektora (sam obraz + efekty) do akceptacji użytkownika. Lektor i głosy nagrywamy dopiero po jego akceptacji.**
- Nowe kwestie dopisuj **na końcu listy `SEG`** (kolejność w liście nie zmienia czasu sceny). Wstawienie w środek przesuwa numery plików i wymusza ponowne nagranie wszystkich dalszych kwestii.
- Nie zmieniaj tekstu nagranych kwestii, jeśli nie trzeba: każda zmiana to nowe nagranie. Przesunięcie czasu (`a`) jest darmowe.
- Rozpoznawanie mowy (sprawdzanie) tylko dla nowych nagrań i raz na gotowy film, nie wielokrotnie.
- Efekty dźwiękowe najpierw z biblioteki `film/cache/sfx` lub generowane lokalnie; ElevenLabs tylko gdy brak odpowiednika.
- Przed większym nagraniem sprawdź stan kredytów i podaj szacunek użytkownikowi.

## Dźwięk grozy (standard, wzorowany charakterem na @nierobcietego — własne dźwięki, nic nie kopiujemy)
- Przez cały film pętla `tension` (cache/sfx/tension.wav): wysoki dysonansowy pisk ok. 740–770 Hz z „biciem”, głęboki pomruk 40–80 Hz, szum wiatru.
  Poziom ok. −20…−15 dB, narasta w drugiej połowie, przed kulminacją −9…−6 dB, po uderzeniu cisza.
- Do tego `drone`, `heartbeat` w scenach napięcia, `roomtone` jako tło.
- Mocne niskie uderzenia `hit_low` przy każdej zmianie sceny i ważnym momencie (co ok. 5–10 s), głośniej przy kartach BŁĄD i zwrotach.
- Zakończenie: `riser` (4 s narastania) → `hit_low` + `sting` (dysonansowy akord) dokładnie na zwrocie → nagła cisza.
- Pliki generowane lokalnie (bez kredytów ElevenLabs), skrypt: patrz historia commitów „własny zestaw dźwięków grozy”.

## Wzór wirala (BLOK 94 odc. 2, 580+ tys.)
- **Bez przypomnień z poprzedniego odcinka** (żadnych scen „Poprzednio…”). Każda część zaczyna się od haka i od razu jest kontynuacją historii.
- **Historia, która mogła się przydarzyć każdemu.** Zwykła, codzienna sytuacja (pukanie w nocy, telefon od obcego, ktoś idzie za tobą),
  a nie wymyślona intryga typu „przynieś klucz, masz przyjść”. Widz ma pomyśleć: „to mogło być u mnie”.
- Każdy nowy film budujemy według `film/WZOR_WIRALA.md`: hak z jednym przedmiotem z bliska i zakazem sprzecznym z intuicją, bez „Poprzednio” na starcie,
  jedna bohaterka i jedno miejsce, ujęcia z oczu bohaterki, nowa informacja co 5–8 s, zakończenie patrzy prosto w widza.

## NOWY FORMAT „CO SIĘ STANIE, GDY…?” (od 21.11.2026 – obowiązuje w nowych filmach z Kubą)
- Pełny opis, postacie i wszystkie serie: `film/PROJEKT_KUBA_I_FORMAT.md`. Wzór: `film/csg2` (plik `wideo/CO_SIE_STANIE_GDY/Prad_gasnie_o_3_v2.mp4`).
- **W tym formacie nie stosujemy starego schematu:** bez tablicy „NIE …!”, bez kart BŁĄD/ZASADA, bez pytania A/B/C, bez napisów słowo po słowie.
- Otwarcie:
  1. twarz złoczyńcy z bliska + „Co zrobisz, gdy…?”,
  2. „Proste.”,
  3. czerwony licznik „1:00 – masz jedną minutę”,
  4. „Jest trzecia w nocy” i ciemny blok z jednym oknem.
- Środek: czysty thriller, ujęcia co ok. 2 s. U góry zegar i licznik „ZOSTAŁO” jak czerwony wyświetlacz, a na ważnych przedmiotach czerwone celowniki.
- Koniec: zwrot, szept złoczyńcy, ciemność, „OBSERWUJ, ŻEBY ZOBACZYĆ CZĘŚĆ 2”.
- Lektor: Ksawery (`bX8ZXtFbQtanSpI1KPZ1`), mroczny, krótkie zdania do widza. Postacie w stylu „toon” (`toon()` w `film/csg2/scenes.js`).
- Wzorujemy się formą i poziomem filmów „What happens when…”. Historia, postacie i teksty są zawsze własne – nie kopiujemy ani nie tłumaczymy cudzych filmów 1:1.

## Pytanie-zagadka na końcu (starsze serie; nie dotyczy formatu „CO SIĘ STANIE, GDY…?”)
- **Każdy film kończy się niepokojącą zagadką do komentarzy, nie prostym quizem.** Po strasznym zwrocie karta „KTO TO JEST?” (albo „CO DALEJ?”):
  jedno pytanie o tajemnicę, która zostaje otwarta (kto stoi za drzwiami, kto ma telefon, kto był w mieszkaniu), i trzy podejrzenia A/B/C,
  każde wiarygodne i wskazujące na kogoś z obsady (np. kolega z klasy, sąsiad, obcy z poprzednich części). Pod spodem „👇 Typuj w komentarzu: A, B czy C”
  i „Odpowiedź w odcinku N…”. Lektor szeptem czyta pytanie i podejrzenia, a na koniec „Typuj w komentarzu. Odpowiedź… w odcinku N.”
- Cel: zaniepokoić i zaciekawić tak, żeby widz czekał na kolejną część i kłócił się w komentarzach. Funkcja `dilemma(...)` w `film/klasa3/scenes.js`.

## Schemat haka (od 22.11.2026, wzorowany formą na @creepydillemas)
- Każdy nowy film budujemy według `film/WZOR_HOOK.md`: klatka 0 = zagrożenie w trakcie i twarz złoczyńcy, zdanie do „ty”, licznik pomocy („policja jest 25 minut stąd”), ograniczenie („drzwi wytrzymają ostatnie pięć”), godzina 3:01, rytm jednosłowowy, karty ZASADA N (prawdziwe porady), HUD z zegarem i licznikiem w dół, zwrot logiczny z czerwonym kółkiem, a na koniec złoczyńca uśmiecha się w kamerę.

## Polskie legendy grozy (uwagi użytkownika, 22.11.2026)
- Wzorem jest odcinek BEBOK: na start karta postaci („TO JEST… NAZWA”, portret w ramce, POZIOM ZAGROŻENIA, gdzie mieszka / czego nie znosi), potem historia.
- **Bez kart ZASADA** w legendach (w Beboku ich nie było).
- **Historia jak przestroga od rodziców/dziadków:** „Nie rób X, bo przyjdzie Y” (np. „wracaj przed zmrokiem, bo bebok cię weźmie”, „nie gwiżdż pod ziemią, bo Skarbnik cię zabierze”). W filmie pokazujemy, jak dziadek/mama to mówi, a bohater łamie zakaz.
