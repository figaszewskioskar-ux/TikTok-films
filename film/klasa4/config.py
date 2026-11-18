"""GRUPA KLASOWA · ODC. 4 — „Nie zostawaj sam w szatni!”. Przerażający lektor + głosy."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'pani': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=6000,aecho=0.5:0.3:40:0.2', 'kuba': 'highpass=f=100', 'pani': 'highpass=f=100,aecho=0.4:0.3:30:0.12'}
VGAIN = {'obcy': 1.2}
MAXK = 1.6
SCENES = [('hook', 0, 5), ('ctx', 5, 12), ('box', 12, 21), ('msg', 21, 29), ('pan', 29, 43), ('keys', 43, 51), ('face', 51, 60), ('run', 60, 74),
          ('police', 74, 82), ('wall', 82, 92), ('chat', 92, 100), ('end', 100, 130)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Jeśli dorosły w szkole chce, żebyś został z nim sam…'],
    ['hook', 3.0, '[whispering] nie zostawaj.'],
    ['ctx', 0.3, '[low, ominous voice, slowly] Następny dzień. Czternasta trzydzieści pięć.'],
    ['ctx', 3.0, '[low, ominous voice, slowly] Kuba zostaje w szatni ostatni.'],
    ['box', 0.3, '[low, ominous voice, slowly] W pudle na zgubione rzeczy…'],
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
    ['police', 5.8, '[low, ominous voice, slowly] Pan z szatni zniknął.'],
    ['wall', 0.4, '[low, ominous voice, slowly] Na zapleczu… zdjęcia. Drzwi Kuby. Okno Leny. Przystanek.'],
    ['wall', 7.0, '[whispering] I nowe klucze. Z numerem trzy.'],
    ['chat', 0.3, '[low, ominous voice, slowly] Wieczorem na grupie klasowej.'],
    ['chat', 3.2, '[low, ominous voice, slowly] Bartek był niewinny.'],
    ['end', 0.4, '[low, ominous voice, slowly] Za dwanaście północ. Mama jest w domu. Koniec strachu.'],
    ['end', 4.6, '[whispering] Nieznany numer.'],
    ['end', 9.0, '[whispering] Zamek w drzwiach… się przekręca.'],
    ['end', 14.4, '[low, ominous voice, slowly] Ktoś ma zapasowe klucze do mieszkania Kuby. Pan z szatni? Ktoś z klasy, kto mu pomagał? A może sąsiad, który zawsze wszystko widzi?'],
    ['end', 22.6, '[whispering] Typuj w komentarzu. Odpowiedź… już wkrótce.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 129.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 12, 21, 29, 43, 51, 56.6, 60, 74, 82, 92, 100, 104, 108.6, 112.3, 112.45, 114, 129.99],
                     [-60, -12, -12, -22, -16, -12, -12, -10, -8, -4, -10, -18, -12, -10, -26, -18, -8, -4, -70, -26, -34]),
           'tension': ([0, 12, 29, 43, 56.6, 60, 74, 82, 92, 100, 108.6, 112.3, 112.45, 129.99], [-32, -22, -16, -12, -8, -16, -24, -14, -28, -26, -9, -6, -60, -60]),
           'drone': ([0, 20, 51, 60, 82, 100, 112.3, 112.45, 129.99], [-32, -22, -16, -26, -16, -28, -10, -60, -60]),
           'roomtone': ([0, 129.99], [-38, -38])},
    heartbeat=([0, 21, 29, 43, 56.6, 60, 74, 104, 108.6, 112.3, 112.4, 129.99], [-90, -14, -12, -8, -5, -10, -90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'creak': [('creak', -8)], 'buzz': [('vibrate', -6)],
           'notif': [('notif', -10)], 'keys': [('keys', -6)], 'switch': [('poweroff', -4)], 'steps': [('run', -6)], 'lock': [('keyturn', -2)]}
EXTRA = [(112.4, 'hit_low', 0), (112.4, 'sting', -3), (108.4, 'riser', -6), (56.6, 'sting', -5), (45.2, 'sting', -6), (106.6, 'hit_low', -3), (87.0, 'hit_low', -3)] + \
        [(t, 'hit_low', -6) for t in (0.2, 5, 12, 21, 29, 43, 51, 60, 74, 82, 92, 100)]
