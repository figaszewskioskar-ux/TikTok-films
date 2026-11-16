"""SAM W DOMU · ODC. 2 — „Nie odbieraj kluczy!” (Kuba). Przerażający lektor + głosy."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'kuba': 'highpass=f=100', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2', 'zdzisiek': 'highpass=f=80,aecho=0.5:0.3:30:0.15'}
VGAIN = {'obcy': 1.3}
MAXK = 1.6
SCENES = [('hook', 0, 5), ('morning', 5, 13), ('search', 13, 19), ('sms', 19, 33), ('mama', 33, 39), ('out', 39, 48), ('bench', 48, 61), ('lit', 61, 69), ('up', 69, 78), ('end', 78, 114)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Jeśli obcy pisze, że znalazł twoje klucze…'],
    ['hook', 3.0, '[whispering] nie idź po nie.'],
    ['morning', 0.3, '[low, ominous voice, slowly] Rano. Siódma dwadzieścia.'],
    ['morning', 3.6, '[low, ominous voice, slowly] Kuba nie może znaleźć kluczy.'],
    ['search', 0.4, '[low, ominous voice, slowly] Przy windzie też nic. Musiały wypaść w nocy.'],
    ['search', 3.0, '[low, ominous voice, slowly] Kuba bierze zapasowe klucze mamy.'],
    ['sms', 0.2, '[friendly, calm] Cześć. Znalazłem klucze z czerwonym breloczkiem dziewięćdziesiąt cztery. Twoje?', 'obcy'],
    ['sms', 3.0, '[excited, relieved] Serio? Tak, moje! Dzięki!', 'kuba'],
    ['sms', 6.0, '[softly] Oddam. Pod blokiem, przy ławce, dziś o dwudziestej pierwszej. Przyjdź sam.', 'obcy'],
    ['sms', 9.0, '[quiet] Okej.', 'kuba'],
    ['mama', 0.3, '[low, ominous voice, slowly] Mama pracuje do jedenastej.'],
    ['mama', 2.6, '[low, ominous voice, slowly] O kluczach Kuba nie mówi jej ani słowa.'],
    ['out', 0.3, '[low, ominous voice, slowly] Za cztery dziewiąta. Kuba zamyka drzwi na zapasowy klucz.'],
    ['out', 3.8, '[low, ominous voice, slowly] Schodami. Nie windą.'],
    ['bench', 0.3, '[low, ominous voice, slowly] Dwudziesta pierwsza. Pod blokiem nikogo.'],
    ['bench', 3.8, '[whispers, amused] Ładna zielona kurtka.', 'obcy'],
    ['bench', 5.2, '[whispering, terrified] On go widzi.'],
    ['lit', 0.3, '[low, ominous voice, slowly] Kuba podnosi wzrok.'],
    ['lit', 2.0, '[low, ominous voice, slowly] W jego oknie pali się światło.'],
    ['lit', 5.0, '[whispering, terrified] A ktoś w nim stoi.'],
    ['up', 0.3, '[low, ominous voice, slowly] Dziewiąte piętro. Mokre ślady prowadzą pod jego drzwi.'],
    ['up', 3.0, '[low, ominous voice, slowly] W zamku wiszą jego klucze.'],
    ['up', 4.4, '[whispers] Kuba…', 'obcy'],
    ['up', 5.6, '[low, ominous voice, slowly] Winda przyjeżdża sama. Pusta.'],
    ['end', 0.4, '[low, ominous voice, slowly] Kto miał jego klucze… całą noc?'],
    ['end', 6.0, '[whispers, amused] Oddałem klucze. Swoje już mam.', 'obcy'],
    ['end', 11.0, '[low, ominous voice, slowly] Światło w środku gaśnie.'],
    ['end', 14.2, '[whispering, terrified] On jest w środku.'],
    ['end', 16.2, '[whispers] Wejdź, Kuba.', 'obcy'],
    ['end', 20.8, '[surprised, friendly] Kuba? Co ty tu robisz o tej porze?', 'zdzisiek'],
    ['end', 25.0, '[low, ominous voice, slowly] Mokre buty. Śnieg na podeszwach.'],
    ['end', 28.2, '[low, ominous voice, slowly] Esemes od mamy. Zapasowe klucze są u pana Zdziśka.'],
    ['end', 31.4, '[warm, slightly creepy] Chodź. Poczekasz u mnie, aż mama wróci.', 'zdzisiek'],
    ['end', 34.4, '[whispering] Komu ufasz?'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 113.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 13, 19, 33, 39, 48, 61, 63, 69, 78, 84, 89, 96.6, 98, 103, 106, 110, 112.35, 112.5, 113.99],
                     [-60, -12, -12, -22, -20, -14, -18, -14, -12, -10, -5, -8, -10, -8, -5, -4, -16, -10, -12, -6, -4, -70, -40]),
           'tension': ([0, 19, 33, 48, 61, 69, 78, 96.6, 103, 112.35, 112.5, 113.99], [-32, -24, -26, -18, -12, -10, -12, -9, -12, -7, -60, -60]),
           'drone': ([0, 48, 69, 89, 96.6, 108, 112.35, 112.5, 113.99], [-32, -22, -16, -12, -12, -10, -8, -60, -60]),
           'roomtone': ([0, 113.99], [-38, -38])},
    heartbeat=([0, 48, 61, 63, 69, 78, 89, 96.5, 103, 110, 112.3, 112.4, 113.99], [-90, -90, -14, -8, -6, -8, -5, -5, -10, -6, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'keys': [('keys', -4)], 'notif': [('notif', -8)], 'tap': [('tap', -8)],
           'lock': [('keyturn', -6)], 'run': [('stairs', -6)], 'off': [('poweroff', -4)], 'eding': [('elev_ding', -8)], 'doors': [('elev_doors', -8)], 'slam': [('slam', 0)], 'creak': [('creak', -6)]}
EXTRA = [(112.4, 'hit_low', 0), (112.4, 'sting', -2), (108.4, 'riser', -6), (96.6, 'hit_low', -1), (96.6, 'sting', -4), (103.2, 'sting', -6), (92.2, 'sting', -5), (51.8, 'sting', -5), (74.4, 'hit_low', -2), (63.0, 'sting', -5), (84.0, 'hit_low', -2)] + [(t, 'hit_low', -6) for t in (0.2, 5, 13, 19, 33, 39, 48, 61, 69, 78)]
