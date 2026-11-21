# Świat Kuby i nowy format „CO SIĘ STANIE, GDY…?”

Stan na 21.11.2026. Ten plik streszcza historie z Kubą i format, którego się trzymamy w nowych filmach.

## Postacie (wspólne dla serii z Kubą)
- **Kuba** – 14 lat, kl. 8B, mieszka z mamą przy ul. Kwiatowej 12, m. 3 (1. piętro).
  - Na zewnątrz: żółta czapka z pomponem, zielona kurtka z naszywką „94”, szalik w paski. W domu: niebieska piżama w paski.
  - Trenuje piłkę: pn, śr, pt 20:00–21:45.
- **Mama Kuby** (Anna Kowalska) – pracuje na nocne zmiany. Różowy szlafrok, długie brązowe włosy.
- **Zosia** – młodsza siostra (pojawia się od „CO SIĘ STANIE, GDY…?”). Koszula w gwiazdki, kucyki z różowymi kokardkami, miś.
- **Klasa 8B (GRUPA KLASOWA):**
  - Lena – nowa w klasie, wysyłała głosówki „Nowemu Uczniowi”, telefon skradziony w szatni,
  - Zuzia,
  - Bartek – czerwona czapka, „LOL”, niesłusznie oskarżony,
  - Maja – wyszła z grupy, otwarty wątek,
  - p. Wiśniewska (wychowawczyni),
  - dyrektorka.
- **Złoczyńcy:**
  - obcy z klatki / „Nowy Uczeń” / pan z szatni – ten sam człowiek w GRUPIE KLASOWEJ,
  - kierowca w brązowej kurtce (CO ZROBISZ?),
  - łysy obcy z przekrwionymi oczami (CO SIĘ STANIE, GDY…?).

## Serie i odcinki
| Seria | Odcinki | Katalogi | Pliki |
|---|---|---|---|
| SAM W DOMU | 1–2 (+ wersje robocze) | `film/sam1`, `sam2`, `sam3` | `wideo/` |
| GRUPA KLASOWA | 1–4 | `film/klasa1`–`klasa4` | `wideo/GRUPA_KLASOWA/` (+ cała seria na YT w `wideo/YOUTUBE/`) |
| CO ZROBISZ? | 1 „Obcy w aucie zna twoje imię” | `film/coz1` | `wideo/CO_ZROBISZ/` |
| CO SIĘ STANIE, GDY…? | 1 „Obcy ma klucze do twojego domu” (`film/coz2`), „Prąd gaśnie o 3:00” (`film/csg2`, wersja 2 = obowiązujący wzór) | `film/coz2`, `film/csg2` | `wideo/CO_SIE_STANIE_GDY/` |

Otwarte wątki:
- **GRUPA KLASOWA:** kto ma zapasowe klucze Kuby (pan z szatni / Maja / sąsiad).
- **CO ZROBISZ?:** obcy ma klucze z torby Kuby.
- **„Prąd gaśnie o 3:00”:** mikrofon w misiu, oczy w drzwiach pokoju, „część 2”.

## NOWY FORMAT (obowiązuje w nowych filmach; wzór: `film/csg2`, plik `Prad_gasnie_o_3_v2.mp4`)
Wzorujemy się poziomem i formą filmów „What happens when…” z TikToka. **Historia, postacie i teksty są zawsze nasze – niczego nie kopiujemy ani nie tłumaczymy 1:1.**

1. **Otwarcie (ok. 8 s):**
   1. duże zbliżenie twarzy złoczyńcy (zimne spojrzenie, potem szeroki uśmiech) + pytanie „Co zrobisz, gdy…?”,
   2. „Proste.” na tle drzwi z pasem światła,
   3. wielki czerwony licznik „1:00 MINUTA” + „Masz jedną minutę.”,
   4. „Jest trzecia w nocy.” – najazd na ciemny blok z jednym oświetlonym oknem, w nim rodzina.
2. **U góry przez cały film:** zegar jak czerwony wyświetlacz (np. 3:00) i licznik „ZOSTAŁO 00:58” w dół.
3. **Środek: czysty thriller.**
   - Nie ma zasad, kart BŁĄD/ZASADA, tablicy „NIE …!”, pytania A/B/C ani „lekcji”.
   - Ujęcia co ok. 2 s, dużo zbliżeń (wizjer, zamek, klamka, stopy pod drzwiami, telefon), najazdy kamery, szarpnięcia i błyski przy cięciach.
   - Czerwone celowniki z podpisem na ważnych przedmiotach („ŁAŃCUCH”, „ON”, „MIŚ”).
   - Straszne momenty: oko w wizjerze, cień pod drzwiami, on w tłumie z palcem przy ustach, świecące oczy w drzwiach.
4. **Zakończenie:** mocny zwrot, szept złoczyńcy, ciemność, potem „OBSERWUJ, ŻEBY ZOBACZYĆ CZĘŚĆ 2” i „CZĘŚĆ 2 ↓”.
5. **Bez napisów słowo po słowie** (`captions: false` w `scenes.js`).
6. **Lektor:** Ksawery (`bX8ZXtFbQtanSpI1KPZ1`, chłodny, gardłowy). Tagi `[ominous, low voice, slowly]`, `[whispering, ominous]`, `[tense, urgent, low voice]`. Filtr: `asetrate=48000*0.95, atempo=1.05`, lekki pogłos. Mówi do widza („ty”), krótkimi, napiętymi zdaniami.
7. **Głosy postaci:**

   | Postać | Głos | ID |
   |---|---|---|
   | obcy | Ryszard | `rUOVqZ1ISbf2yl2Vbpwa` |
   | Kuba | – | `mr1ubFaLs5xVrh1EqWtc` |
   | mama | – | `XrExE9yKIg1WjnnlVkGX` |
   | Zosia | – | `d4Z5Fvjohw3zxGpV8XUV` (z podwyższeniem) |
   | strażak | – | `xsSg7GkDPDhaGZpbKOLn` |
   | administracja | – | `Xb7hH8MSUJpSbSDYk0k2` |

   Zapasowy lektor: Bruno `JxVKcxm9wtnCYEs8V00p`.
8. **Postacie w stylu „toon”** (funkcje `toon()`, `toonHead()`, `toonClose()` w `film/csg2/scenes.js`):
   - głowa to zaokrąglony kwadrat bez szyi, oczy to białe kółka z czarną źrenicą, cienkie brwi, kropka nosa, rumieńce,
   - włosy w jednej bryle z połyskiem, ubrania we wzory (paski, gwiazdki), rękawy z dłonią i kciukiem,
   - złoczyńca: blady i łysy, przekrwione oczy z czerwoną obwódką, oczodoły, zmarszczki, zarost.
9. **Długość:** ok. 1:45–2:45 (wyznacza ją lektor). Jakość pliku ok. 5 Mb/s, plik poniżej 100 MB.

## Technika (skrót)
- Nowy odcinek: skopiuj `film/csg2` → `film/<nazwa>`, zmień sceny i `config.py` (SEG, SCENES, AUDIO).
- Najpierw podgląd bez lektora: `PREVIEW_NO_VOICE = True` i `python3 preview_lines.py <nazwa>`, potem `./build.sh <nazwa>`.
- Po akceptacji: `PREVIEW_NO_VOICE = False`, usuń `timeline.js`, `./build.sh <nazwa>` (środowisko „Default” z ElevenLabs).
- TikTok (pobieranie wzorów, statystyki) działa tylko w środowisku „TikTok-films sklep 2”.
