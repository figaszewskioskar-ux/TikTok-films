"""SAM W DOMU · ODC. 1 — „Nie wsiadaj do windy!” (Kuba). Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
VFILTER = {'kuba': 'highpass=f=100', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'obcy': 1.3}
MAXK = 1.5
SCENES = [('hook', 0, 5), ('ctx', 5, 11), ('call', 11, 19), ('open', 19, 27), ('cab', 27, 37), ('stop', 37, 47), ('out', 47, 55), ('stairs', 55, 70), ('landing', 70, 85), ('end', 85, 108)]
SEG = [
    ['hook', 0.1, 'Jeśli w nocy drzwi windy się otwierają, a w środku stoi obcy… nie wsiadaj.'],
    ['hook', 3.6, 'Nawet jeśli się uśmiecha.'],
    ['ctx', 0.3, 'Dwudziesta druga pięćdziesiąt. Kuba wraca z treningu.'],
    ['ctx', 3.0, 'Mieszka na dziewiątym piętrze. W domu nikogo nie ma.'],
    ['call', 0.4, 'Kuba wzywa windę.'],
    ['call', 1.8, 'Winda zjeżdża. Z dziewiątego piętra. Z jego piętra.'],
    ['open', 1.6, '[friendly, a bit creepy] Wsiadasz? Na które?', 'obcy'],
    ['open', 5.0, 'Coś jest nie tak. Ale głupio odmówić.'],
    ['cab', 0.6, 'Kuba wsiada.'],
    ['cab', 3.6, '[quiet, unsure] Dziewiąte.', 'kuba'],
    ['cab', 6.0, '[smiling] Dziewiąte. Jak ja.', 'obcy'],
    ['stop', 0.3, 'Winda staje. Między piętrami.'],
    ['stop', 1.4, '[softly] Ups. Ładna torba. KS Sokół, numer siedem?', 'obcy'],
    ['stop', 5.2, 'Kuba wciska alarm.'],
    ['stop', 7.4, 'Winda rusza. Trzecie piętro. Drzwi się otwierają.'],
    ['out', 0.3, 'Kuba wybiega. Drzwi zamykają się za nim. Obcy jedzie dalej.'],
    ['stairs', 0.4, 'Schodami. Czwarte. Piąte. Szóste.'],
    ['stairs', 7.0, 'Światło gaśnie.'],
    ['stairs', 9.6, 'A na wyświetlaczu winda stoi na dziewiątym. Czeka.'],
    ['landing', 0.6, 'Dziewiąte piętro. Drzwi windy otwarte. Kabina pusta.'],
    ['landing', 6.0, 'Kuba szuka kluczy. Ręce się trzęsą.'],
    ['landing', 10.4, 'Klucze wypadają.'],
    ['end', 0.4, 'W lustrze kabiny Kuba widzi coś jeszcze.'],
    ['end', 3.2, 'Ktoś stoi tuż za nim.'],
    ['end', 10.2, 'Światło gaśnie.'],
    ['end', 13.4, '[whispers] Dziewiąte… jak ja.', 'obcy'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 107.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 11, 17, 19, 23, 27, 33, 37, 41, 45, 47, 55, 62, 66, 70, 78, 85, 92, 98, 101.55, 101.7, 103, 107.99],
                     [-60, -12, -12, -22, -20, -14, -10, -12, -12, -10, -8, -9, -10, -18, -14, -10, -8, -14, -10, -12, -10, -7, -4, -70, -22, -30]),
           'tension': ([0, 11, 27, 37, 47, 55, 85, 101.55, 101.7, 107.99], [-32, -26, -20, -14, -22, -16, -14, -10, -60, -60]),
           'drone': ([0, 70, 101.55, 101.7, 107.99], [-30, -22, -14, -60, -60]),
           'roomtone': ([0, 107.99], [-38, -38])},
    heartbeat=([0, 19, 22, 37, 44, 47, 55, 66, 85, 95, 101.5, 101.6, 107.99], [-90, -90, -14, -10, -6, -90, -12, -8, -12, -8, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'click': [('tap', -8)], 'ding': [('elev_ding', -8)],
           'doors': [('elev_doors', -8)], 'door': [('doorclose', -10)], 'alarm': [('buzz', -4)], 'run': [('stairs', -6)], 'keys': [('keys', -4)]}
EXTRA = [(101.6, 'hit_low', 0), (101.6, 'sting', -3), (97.6, 'riser', -6), (29.0, 'hit_low', -2), (34.0, 'sting', -9), (66.0, 'breath', -8), (95.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 5, 11, 19, 27, 37, 47, 55, 70, 85)]
