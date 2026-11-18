"""GRUPA KLASOWA · ODC. 4 — „Nie zostawaj sam w szatni!”. Przerażający lektor + głosy."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'pani': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3),
    'zuzia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'lena': ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'bartek': ('TX3LPaxmHKxFdv7VOQHJ', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=6000,aecho=0.5:0.3:40:0.2', 'kuba': 'highpass=f=100', 'pani': 'highpass=f=100,aecho=0.4:0.3:30:0.12'}
VGAIN = {'obcy': 1.2}
MAXK = 1.6
SCENES = [('hook', 0, 5), ('answer', 5, 12), ('klasa', 12, 21), ('lena', 21, 29), ('zuzia', 29, 36), ('box', 36, 45), ('msg', 45, 52), ('pan', 52, 64), ('keys', 64, 71), ('face', 71, 80),
          ('run', 80, 94), ('police', 94, 106), ('wall', 106, 115), ('chat', 115, 123), ('end', 123, 152)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Jeśli dorosły w szkole chce, żebyś został z nim sam…'],
    ['hook', 3.0, '[whispering] nie zostawaj.'],
    ['klasa', 0.2, '[low, ominous voice, slowly] Rano cała klasa patrzy na Bartka.'],
    ['klasa', 2.6, '[accusing] Bartek, na zdjęciu była twoja czerwona czapka!', 'zuzia'],
    ['klasa', 5.6, '[angry, defensive] Zgubiłem ją miesiąc temu! To nie ja!', 'bartek'],
    ['lena', 0.2, '[low, ominous voice, slowly] Na przerwie Lena mówi Kubie prawdę.'],
    ['lena', 2.0, '[ashamed, quietly] Wysyłałam mu głosówki… Myślałam, że to ktoś z klasy.', 'lena'],
    ['lena', 6.4, '[whispering] Z jej głosówek skleił nagranie.'],
    ['zuzia', 0.8, '[worried, whispering] Ten nowy z szatni robił zdjęcia waszym kurtkom.', 'zuzia'],
    ['zuzia', 4.4, '[low, ominous voice, slowly] I kluczom w kieszeniach.'],
    ['box', 0.1, '[low, ominous voice, slowly] Kuba zostaje w szatni ostatni.'],
    ['box', 3.4, '[shocked] Telefon Leny?!', 'kuba'],
    ['box', 5.8, '[low, ominous voice, slowly] I czerwona czapka Bartka.'],
    ['msg', 0.3, '[whispering] Telefon Leny się świeci.'],
    ['msg', 2.0, '[low, ominous voice, slowly] Wiadomość od Nowego Ucznia.'],
    ['msg', 5.2, '[whispering] Skąd on wie, że Kuba tu jest?'],
    ['pan', 0.3, '[low, ominous voice, slowly] Pan z szatni. Nowy. Pracuje od tygodnia.'],
    ['pan', 2.8, '[friendly, creepy, smiling] Zgubiłeś coś, Kuba? Chodź na zaplecze, tam jest więcej rzeczy.', 'obcy'],
    ['pan', 8.2, '[scared] Skąd pan zna moje imię?', 'kuba'],
    ['keys', 0.4, '[low, ominous voice, slowly] Ten sam brelok. Te same klucze.'],
    ['keys', 4.0, '[whispering] To był on.'],
    ['face', 0.4, '[angry, scared] To pan zabrał telefon Leny!', 'kuba'],
    ['face', 3.2, '[low, ominous voice, slowly] Uśmiech znika.'],
    ['face', 6.4, '[whispering, menacing] Nikt cię tu nie usłyszy, Kuba.', 'obcy'],
    ['run', 0.3, '[low, ominous voice, slowly] Kuba ucieka. Tam, gdzie są ludzie.'],
    ['run', 2.6, '[panicked, out of breath] Proszę pani! Pan z szatni!', 'kuba'],
    ['run', 5.4, '[serious, firm] Do pokoju nauczycielskiego. Dzwonię na policję.', 'pani'],
    ['police', 0.3, '[low, ominous voice, slowly] Policja jest po kilku minutach.'],
    ['police', 4.0, '[whispering] Szatnia jest pusta.'],
    ['police', 5.4, '[low, ominous voice, slowly] Pan z szatni zniknął.'],
    ['police', 7.2, '[low, ominous voice, slowly] Monitoring z klatki Kuby. Ten sam człowiek.'],
    ['police', 10.0, '[whispering] Obcy z klatki… to pan z szatni.'],
    ['wall', 0.4, '[low, ominous voice, slowly] Na zapleczu… zdjęcia. Drzwi Kuby. Okno Leny.'],
    ['wall', 4.6, '[whispering] Jedno zdjęcie… zrobiono w pokoju Kuby.'],
    ['wall', 7.0, '[whispering] I nowe klucze. Z numerem trzy.'],
    ['chat', 0.3, '[low, ominous voice, slowly] Wieczorem na grupie klasowej.'],
    ['chat', 3.4, '[low, ominous voice, slowly] Bartek był niewinny.'],
    ['chat', 6.2, '[whispering] A Maja… wyszła z grupy.'],
    ['end', 0.4, '[low, ominous voice, slowly] Za dwanaście północ. Mama jest w domu. Koniec strachu.'],
    ['end', 4.6, '[whispering] Nieznany numer.'],
    ['end', 9.0, '[whispering] Zamek w drzwiach… się przekręca.'],
    ['end', 12.2, '[whispers, deep] Dobranoc, Kuba.', 'obcy'],
    ['end', 15.4, '[low, ominous voice, slowly] Ktoś ma zapasowe klucze do mieszkania Kuby. Pan z szatni? Maja, która wyszła z grupy? A może sąsiad, który zawsze wszystko widzi?'],
    ['end', 23.6, '[whispering] Typuj w komentarzu. Odpowiedź… już wkrótce.'],
    ['answer', 0.2, '[low, ominous voice, slowly] Odpowiedź z poprzedniego odcinka.'],
    ['answer', 2.4, '[whispering] B. Obcy z klatki.'],
    ['answer', 4.2, '[low, ominous voice, slowly] Kamera nagrała tylko kaptur… i klucze.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 7, 151.99], [-34, -34, -34]),
    loops={'groza': ([0, 7, 7.3, 11.5, 12.5, 21, 29, 36, 45, 52, 64, 71, 76.6, 80, 94, 102, 106, 115, 123, 127, 131.6, 136.9, 137.05, 138.6, 151.99],
                     [-18, -14, -12, -12, -20, -18, -14, -14, -12, -12, -10, -8, -4, -10, -18, -10, -12, -22, -26, -18, -8, -4, -70, -26, -34]),
           'tension': ([0, 7, 21, 36, 52, 64, 76.6, 80, 94, 106, 115, 123, 131.6, 136.9, 137.05, 151.99], [-22, -22, -26, -22, -16, -12, -8, -16, -24, -14, -28, -26, -9, -6, -60, -60]),
           'drone': ([0, 7, 29, 71, 80, 106, 123, 136.9, 137.05, 151.99], [-32, -32, -24, -16, -26, -16, -28, -10, -60, -60]),
           'roomtone': ([0, 7, 151.99], [-38, -38, -38])},
    heartbeat=([0, 7, 36, 45, 64, 76.6, 80, 94, 127, 131.6, 136.9, 137, 151.99], [-12, -12, -90, -14, -8, -5, -10, -90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'creak': [('creak', -8)], 'buzz': [('vibrate', -6)],
           'notif': [('notif', -10)], 'keys': [('keys', -6)], 'switch': [('poweroff', -4)], 'steps': [('run', -6)], 'lock': [('keyturn', -2)], 'bell': [('timer', -14)], 'siren': [('siren', -14)], 'chain': [('chain', -4)]}
EXTRA = [(137, 'hit_low', 0), (137, 'sting', -3), (133, 'riser', -6), (134.6, 'hit_low', -2), (78.6, 'sting', -3), (110.6, 'sting', -4), (76.6, 'sting', -5), (66.2, 'sting', -6), (129.6, 'hit_low', -3), (102.4, 'sting', -5), (113, 'hit_low', -3), (32.6, 'sting', -7), (7.4, 'sting', -5), (5, 'hit_low', -5)] + [(t, 'hit_low', -6) for t in (0.2, 7.2, 12, 21, 29, 36, 45, 52, 64, 71, 80, 94, 106, 115, 123)]