"""SAM W DOMU · ODC. 1 — „Nie przytrzymuj drzwi!” (Kuba, v2). Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_v3'   # przerażający lektor: niski, złowrogi, powolny (v3 + tagi), do tego filtr: niżej + pogłos klatki
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12', 'kuba': 'highpass=f=100', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'obcy': 1.3}
MAXK = 1.5
SCENES = [('hook', 0, 5), ('ctx', 5, 12), ('code', 12, 20), ('ask', 20, 30), ('lobby', 30, 39), ('cab', 39, 49), ('ride', 49, 58), ('exit', 58, 67), ('stairs', 67, 80), ('landing', 80, 88), ('end', 88, 110)]
SEG = [
    ['hook', 0.1, 'Jeśli w nocy ktoś prosi, żebyś przytrzymał drzwi do klatki…'],
    ['hook', 3.1, 'nie przytrzymuj.'],
    ['ctx', 0.3, 'Dwudziesta druga pięćdziesiąt. Kuba wraca z treningu.'],
    ['ctx', 2.8, 'Okno na dziewiątym piętrze jest ciemne. W domu nikogo.'],
    ['ctx', 5.0, 'Pod drzewem przy klatce ktoś stoi.'],
    ['code', 0.4, 'Kuba wpisuje kod.'],
    ['code', 4.3, 'Drzwi się otwierają.'],
    ['code', 5.6, 'A w szybie… ktoś tuż za nim.'],
    ['ask', 0.3, 'Ktoś idzie od strony drzewa.'],
    ['ask', 2.2, '[friendly, warm] Przytrzymasz? Zapomniałem kluczy.', 'obcy'],
    ['ask', 5.8, '[unsure] Eee… jasne.', 'kuba'],
    ['ask', 7.6, 'Na jego kurtce ani płatka śniegu. Czekał.'],
    ['lobby', 0.3, 'Obcy wchodzi za nim.'],
    ['lobby', 1.8, 'Winda zjeżdża.'],
    ['lobby', 3.2, 'On nie sprawdza skrzynki. Nie idzie schodami. Czeka.'],
    ['lobby', 6.6, '[smiling] Ty pierwszy.', 'obcy'],
    ['cab', 1.2, 'Kuba wciska dziewiątkę.'],
    ['cab', 3.0, 'Obcy nie wciska nic.'],
    ['cab', 5.4, '[smiling] Dziewiąte. Pasuje.', 'obcy'],
    ['ride', 0.6, '[casual] Sam dziś wracasz?', 'obcy'],
    ['ride', 3.2, '[nervous] Nie… tata czeka.', 'kuba'],
    ['ride', 5.4, '[softly, slowly] W dziewięćdziesiątce czwórce światło się nie pali.', 'obcy'],
    ['ride', 8.3, 'Skąd on to wie?'],
    ['exit', 0.3, 'Kuba wciska piątkę.'],
    ['exit', 2.2, 'Drzwi się otwierają. Kuba wyskakuje.'],
    ['exit', 5.4, 'Obcy jedzie dalej. Na dziewiąte.'],
    ['stairs', 0.3, 'Schodami. Szóste. Siódme.'],
    ['stairs', 3.2, 'Kuba dzwoni do mamy.'],
    ['stairs', 6.0, 'Nie odbiera.'],
    ['stairs', 8.4, 'Światło gaśnie.'],
    ['stairs', 11.0, 'I zapala się samo. Ktoś wyżej wcisnął włącznik.'],
    ['landing', 0.4, 'Dziewiąte piętro. Pusto.'],
    ['landing', 3.4, 'Klucz. Ręce się trzęsą.'],
    ['landing', 6.8, 'W środku.'],
    ['end', 0.4, 'Zamek. Łańcuch.'],
    ['end', 2.8, 'Bezpieczny.'],
    ['end', 5.2, 'Kuba patrzy przez wizjer. Korytarz pusty.'],
    ['end', 8.0, 'Światło gaśnie.'],
    ['end', 11.4, '[whispers] Dzięki, że przytrzymałeś.', 'obcy'],
    ['end', 16.6, 'Klamka powoli idzie w dół.'],
    ['end', 18.7, '[whispers] Otwórz.', 'obcy'],
]
SEG = [x if len(x) > 3 else [x[0], x[1], ('[whispering, terrified] ' if x[0] == 'end' and x[1] > 5 else '[low, ominous voice, slowly] ') + x[2]] for x in SEG]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 109.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 12, 17, 20, 25, 30, 36, 39, 45, 49, 56, 58, 62, 67, 75, 78, 80, 88, 96, 99, 104, 106.55, 106.7, 108, 109.99],
                     [-60, -12, -12, -22, -20, -14, -12, -12, -14, -11, -10, -9, -10, -7, -10, -16, -14, -10, -8, -12, -14, -12, -8, -6, -4, -70, -24, -32]),
           'tension': ([0, 12, 30, 49, 58, 67, 88, 106.55, 106.7, 109.99], [-32, -26, -20, -14, -20, -16, -14, -9, -60, -60]),
           'drone': ([0, 67, 96, 106.55, 106.7, 109.99], [-30, -22, -16, -12, -60, -60]),
           'roomtone': ([0, 109.99], [-38, -38])},
    heartbeat=([0, 30, 36, 49, 57, 58, 67, 78, 88, 99, 106.5, 106.6, 109.99], [-90, -90, -14, -12, -6, -12, -12, -8, -14, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'click': [('tap', -8)], 'eding': [('elev_ding', -8)],
           'doors': [('elev_doors', -8)], 'door': [('doorclose', -10)], 'alarm': [('buzz', -8)], 'run': [('stairs', -6)], 'keys': [('keys', -4)], 'beep': [('tap', -10)],
           'creak': [('creak', -10)], 'dial': [('dial', -12)], 'timer': [('timer', -6)], 'lock': [('keyturn', -6)], 'chain': [('chain', -6)], 'knock': [('knock', -1)], 'handle': [('handle', -3)]}
EXTRA = [(106.6, 'hit_low', 0), (106.6, 'sting', -3), (102.6, 'riser', -6), (99.0, 'sting', -6), (78.0, 'hit_low', -3), (94.0, 'breath', -8), (72.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 5, 12, 20, 30, 39, 49, 58, 67, 80, 88)]
