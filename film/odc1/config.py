"""Konfiguracja BLOK 94 · ODC. 1 — „Nie otwieraj kurierowi!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # Victor - Warm, Engaging Narrator (biblioteka ElevenLabs, najbliższy oryginałowi)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.15, 'use_speaker_boost': True}

# sceny w „starym” czasie (tak jak są zapisane w scenes.js)
SCENES = [('hook', 0, 5), ('ext', 5, 11), ('flat', 11, 21.5), ('lobby1', 21.5, 34), ('door', 34, 45),
          ('lobby2', 45, 66), ('section', 66, 74), ('floor7', 74, 88), ('twist', 88, 98), ('zdz', 98, 102),
          ('reveal', 102, 119), ('end', 119, 124)]
# [scena, moment w scenie (stary czas), tekst]
SEG = [
    ['hook', 0.1, 'Kurier dzwoni do ciebie z paczką dla sąsiada? Nie otwieraj.'],
    ['hook', 2.0, 'Kuba zrobi dziś trzy błędy. Znajdziesz wszystkie?'],
    ['ext', 0.3, 'Dwudziesta pierwsza czterdzieści siedem. Kasztanowa dwanaście. Kuba jest w domu, na dziewiątym piętrze.'],
    ['ext', 3.6, 'Na dole ktoś czeka z paczką.'],
    ['flat', 0.5, 'Dzwoni domofon. Na ekranie: kurier.'],
    ['flat', 1.0, '„Paczka do siedemdziesiąt jeden. Nikt nie otwiera. Wpuści pan?”'],
    ['flat', 5.4, 'Kuba nie myśli długo. Za dwie minuty zaczyna się mecz.'],
    ['flat', 8.0, 'Wciska klucz.'],
    ['lobby1', 0.3, 'Zjeżdża na dół wyrzucić śmieci.'],
    ['lobby1', 1.6, 'Przy windzie stoi ten sam kurier. „Dzięki, szefie. Ciężkie to.”'],
    ['lobby1', 6.6, 'Ale do windy nie wsiada. Idzie schodami. Z ciężką paczką. Na siódme piętro.'],
    ['door', 0.2, 'Kuba wraca od śmietnika, wyciąga klucze.'],
    ['door', 2.8, 'Ktoś idzie tuż za nim. Kaptur, ręce w kieszeniach.'],
    ['door', 4.4, '„Przytrzymasz?”'],
    ['door', 5.9, '„Jasne.” Kuba przytrzymuje drzwi.'],
    ['door', 7.0, 'Obcy nie ma kluczy. Nie mówi nawet „dobry wieczór”.'],
    ['lobby2', 0.4, 'Przy skrzynkach pan Zdzisiek z drugiego piętra.'],
    ['lobby2', 3.2, '„Kuba, a ten w kapturze to do kogo?”'],
    ['lobby2', 6.5, '„Nie wiem. Kurierowi otworzyłem.”'],
    ['lobby2', 9.2, '„Ja tu znam wszystkich. Jego nie znam.”'],
    ['lobby2', 10.7, 'Kurier schodzi. Już bez paczki.'],
    ['lobby2', 12.3, '„Pani z siedemdziesiąt jeden nie otwiera. Kiedy wraca?”'],
    ['lobby2', 14.75, '„Nie ma jej. Wyjechała do córki. Do niedzieli.”'],
    ['lobby2', 17.2, 'Kaptur na schodach słyszy każde słowo.'],
    ['lobby2', 18.4, 'Zdzisiek mruży oczy. Kurier bez paczki? I schodami?'],
    ['section', 0.3, 'Kuba jedzie na dziewiąte. Tamci dwaj idą schodami. Na siódme. Do mieszkania, które przecież jest puste.'],
    ['section', 4.2, 'A Zdzisiek do kogoś dzwoni.'],
    ['floor7', 0.3, 'Siódme piętro. Kurier kopie karton. Pusty.'],
    ['floor7', 2.4, '„Pusto. Dawaj.”'],
    ['floor7', 4.2, 'Kaptur wyciąga wytrych.'],
    ['floor7', 5.4, 'Minuta.'],
    ['floor7', 9.0, 'Dwie.'],
    ['floor7', 11.4, 'Wizjer w drzwiach siedemdziesiąt jeden… ciemnieje.'],
    ['twist', 0.25, 'Drzwi otwierają się od środka.'],
    ['twist', 1.6, 'Pani Halina nigdzie nie wyjechała. „Kawalerze, ja słyszę wszystko przez domofon!”'],
    ['twist', 5.0, 'Uciekają szybciej, niż przyszli.'],
    ['twist', 6.6, '„I nie wracajcie! A ty, Kuba, też dostaniesz!”'],
    ['zdz', 0.6, 'A Zdzisiek macha im na pożegnanie. „Do widzenia panom kurierom!”'],
    ['reveal', 0.4, 'Błąd pierwszy: wpuścił obcego do cudzego mieszkania.'],
    ['reveal', 3.2, 'Drugi: przytrzymał drzwi komuś bez kluczy.'],
    ['reveal', 5.35, 'Trzeci: powiedział na głos, że sąsiadki nie ma.'],
    ['reveal', 8.25, 'A czwarty? Był na samym początku. Napisz w komentarzu.'],
    ['reveal', 11.2, 'Zapamiętaj: kurier dzwoni do adresata. Nie do ciebie.'],
    ['reveal', 14.5, 'A ty… otworzyłbyś?'],
    ['end', 1.3, 'Tej nocy w oknie Kuby gaśnie światło.'],
    ['end', 2.7, 'A kaptur… wciąż stoi pod blokiem.'],
]


# ---------- dźwięk (czasy w starej osi scen) ----------
AUDIO = dict(
    bed=([0, 60, 74, 87.5, 87.85, 88.6, 98, 102, 119, 123.99], [-31, -28, -26, -23.5, -60, -27, -32, -31, -29, -24]),
    outdoor=([0, 4.9, 5, 10.99, 11.1, 33.9, 34, 44.99, 45.1, 118.9, 119, 123.99], [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1]),
    tv=([0, 11, 11.3, 21.2, 21.49, 123.99], [0, 0, 1, 1, 0, 0]),
    heartbeat=([0, 77.5, 79, 87.4, 87.6, 123.99], [-90, -90, -27, -21, -90, -90]),
    clock=(102, 118.99),
)
REALMAP = {  # typ wskazówki -> (plik, szczyt dB)
    'hit': [('boom', -2), ('door_bang', -6)], 'stab': [('boom', -5)], 'whoosh': [('whoosh', -12)],
    'doorbuzz': [('buzz', -13)], 'intercom': [('ring', -10)], 'lock': [('door_lock', -9)],
    'thud': [('box_kick', -7)], 'error': [('boom', -9)],
}
EXTRA = [  # dodatkowe odgłosy jak w oryginale (winda, klucze, schody, wytrych)
    (21.2, 'elev_ding', -11), (21.6, 'elev_doors', -12), (34.0, 'keys', -13), (37.0, 'boom', -8),
    (28.0, 'stairs', -16), (55.6, 'stairs', -17), (63.4, 'stairs', -19), (70.0, 'elev_ding', -14),
    (78.4, 'lockpick', -15), (83.3, 'lockpick', -15), (80.2, 'vibrate', -16), (83.0, 'vibrate', -16),
    (93.0, 'run', -9), (98.1, 'run', -11), (121.6, 'sting', -5),
]
