"""GRUPA KLASOWA · ODC. 1 — „Nie odpisuj Nowemu Uczniowi!” (Kuba, Zuzia, Bartek, Lena, p. Wiśniewska). Przerażający lektor + głosy."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),        # Nowy Uczeń — ten sam głos co obcy z SAM W DOMU (trop)
    'zuzia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),       # Maria
    'lena': ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),        # Jessica
    'bartek': ('TX3LPaxmHKxFdv7VOQHJ', 'eleven_v3', V3),      # Liam — energiczny
    'mama': ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'pani': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3),        # Alice — wychowawczyni
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2', 'kuba': 'highpass=f=100'}
VGAIN = {'obcy': 1.3}
MAXK = 1.6
SCENES = [('hook', 0, 5), ('rooms', 5, 12), ('join', 12, 22), ('zuzia', 22, 31), ('bartek', 31, 40), ('lena', 40, 50), ('kuba', 50, 60), ('mama', 60, 70), ('teacher', 70, 78), ('end', 78, 106)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Jeśli na grupie klasowej pojawia się ktoś, kogo nikt nie zna…'],
    ['hook', 2.6, '[whispering] nie odpisuj mu.'],
    ['rooms', 0.3, '[low, ominous voice, slowly] Dwudziesta czternaście. Grupa klasy ósmej be.'],
    ['rooms', 3.4, '[low, ominous voice, slowly] Kuba, Zuzia, Bartek. Zwykły wieczór.'],
    ['join', 0.2, '[laughing] Patrzcie na wuefistę!', 'bartek'],
    ['join', 1.4, '[low, ominous voice, slowly] Nowy Uczeń dołączył do grupy.'],
    ['join', 2.8, '[friendly, slow] Hej, ósma be. Znam was lepiej, niż myślicie.', 'obcy'],
    ['join', 4.6, '[laughing] Kto to?', 'bartek'],
    ['join', 5.8, '[unsure] Pani go dodała?', 'zuzia'],
    ['join', 8.6, '[whispering] Nikt go nie dodał.'],
    ['zuzia', 0.3, '[softly] Zuzia, ładnie ci dziś było w czerwonej kurtce. Przystanek siedemnaście.', 'obcy'],
    ['zuzia', 4.8, '[low, ominous voice, slowly] Ktoś ją dziś śledził.'],
    ['bartek', 0.2, '[upset, almost crying] To nie jest śmieszne!', 'zuzia'],
    ['bartek', 1.4, '[cocky, laughing] Ja się nie boję! Kwiatowa dwanaście, mieszkanie trzy. Wpadaj!', 'bartek'],
    ['bartek', 5.2, '[whispers] Wpadnę.', 'obcy'],
    ['bartek', 7.6, '[low, ominous voice, slowly] Bartkowi już nie jest do śmiechu.'],
    ['lena', 0.1, '[mocking] To na sto procent Lena. Jest nowa i dziwna.', 'bartek'],
    ['lena', 2.3, 'Lena, to ty?', 'zuzia'],
    ['lena', 3.4, '[crying] To nie ja! Ja nawet nie wiem, kto to jest!', 'lena'],
    ['lena', 5.6, '[low, ominous voice, slowly] Lena jest w klasie od tygodnia.'],
    ['lena', 7.6, '[whispering] A co, jeśli to nie ona?'],
    ['kuba', 0.2, '[low, ominous voice, slowly] Kuba pisze do niego prywatnie.'],
    ['kuba', 1.8, '[quiet] Kim jesteś?', 'kuba'],
    ['kuba', 5.6, '[whispers, amused] Kuba z dziewięćdziesiątki czwórki. Klucze już masz?', 'obcy'],
    ['mama', 0.6, '[scared] Mamo, zobacz. On wie o kluczach.', 'kuba'],
    ['mama', 3.2, '[firm, calm] Nie odpisuj mu. Piszę do wychowawczyni.', 'mama'],
    ['teacher', 0.2, '[low, ominous voice, slowly] Wychowawczyni usuwa Nowego Ucznia.'],
    ['teacher', 1.6, '[firm, teacher] Nikt mu nie odpisuje. Zrzuty ekranu wysłałam na policję. Jutro rozmowa.', 'pani'],
    ['teacher', 3.4, '[softly] Dziękuję pani.', 'lena'],
    ['teacher', 4.8, '[ashamed, quiet] Lena… sorki.', 'bartek'],
    ['teacher', 6.4, '[low, ominous voice, slowly] Koniec?'],
    ['end', 0.2, '[low, ominous voice, slowly] Dwudziesta trzecia czterdzieści jeden. Bartek zakłada grupę bez pani.'],
    ['end', 2.4, '[whispering] Nowy Uczeń dołącza.'],
    ['end', 4.6, '[whispers] Bartek, otwórz. Przecież zapraszałeś.', 'obcy'],
    ['end', 8.0, '[shouting, scared] Bartek, nie otwieraj!', 'kuba'],
    ['end', 9.8, '[low, ominous voice, slowly] Bartek nie odpisuje.'],
    ['end', 12.0, '[scared] Bartek? Odpisz!', 'zuzia'],
    ['end', 15.6, '[whispers] Kuba… ty następny.', 'obcy'],
    ['end', 20.8, '[whispering] Kto jest Nowym Uczniem?'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 105.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 12, 22, 31, 40, 50, 55.6, 60, 70, 78, 87.6, 93.6, 98.55, 98.7, 100, 105.99],
                     [-60, -12, -12, -24, -20, -14, -14, -16, -12, -6, -16, -26, -14, -8, -6, -4, -70, -26, -34]),
           'tension': ([0, 12, 22, 31, 50, 60, 70, 78, 98.55, 98.7, 105.99], [-32, -26, -18, -18, -14, -22, -30, -16, -9, -60, -60]),
           'drone': ([0, 22, 60, 78, 98.55, 98.7, 105.99], [-34, -24, -32, -18, -10, -60, -60]),
           'roomtone': ([0, 105.99], [-38, -38])},
    heartbeat=([0, 50, 55.6, 60, 78, 87.6, 98.5, 98.6, 105.99], [-90, -90, -8, -90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'tap': [('tap', -6)], 'notif': [('notif', -9)]}
EXTRA = [(98.6, 'hit_low', 0), (98.6, 'sting', -3), (94.6, 'riser', -6), (55.6, 'sting', -5), (23.2, 'sting', -7)] + [(t, 'hit_low', -6) for t in (0.2, 5, 12, 22, 31, 40, 50, 60, 78)]
