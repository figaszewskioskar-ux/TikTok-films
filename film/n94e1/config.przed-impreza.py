"""NOCNY N94 · ODC. 1 — „Nie siadaj z tyłu!”. Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':      ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kierowca': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'pasazer':  ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'kasjerka': ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),
}
VFILTER = {'ola': 'highpass=f=110', 'kierowca': 'highpass=f=100', 'kasjerka': 'highpass=f=120', 'pasazer': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'pasazer': 1.3}
SCENES = [('hook', 0, 6), ('stop', 6, 18), ('board', 18, 30), ('ride1', 30, 44), ('ride2', 44, 58), ('getoff', 58, 70),
          ('street', 70, 86), ('shop', 86, 102), ('end', 102, 120)]
SEG = [
    ['hook', 0.2, 'Pusty nocny autobus. A on zawsze siada bliżej.'],
    ['stop', 0.4, 'Za piętnaście pierwsza. Ola wraca sama.'],
    ['stop', 4.2, '[tired] Mamo, jestem na przystanku. N94 za dwie minuty.', 'ola'],
    ['stop', 8.4, 'Telefon: trzy procent.'],
    ['board', 0.4, 'Nocny N94. Prawie pusty.'],
    ['board', 5.4, 'Dobry wieczór.', 'kierowca'],
    ['board', 6.8, 'Dobry wieczór.', 'ola'],
    ['board', 8.2, 'Ola idzie na sam koniec.'],
    ['ride1', 0.4, 'Przystanek Łąkowa. Wsiada jeden pasażer.'],
    ['ride1', 5.0, 'Cały autobus jest pusty. A on siada… tutaj.'],
    ['ride2', 0.4, 'Ogrodowa. Pasażer wstaje. I przesiada się bliżej.'],
    ['ride2', 4.4, '[softly, creepy] Zimno dziś, prawda?', 'pasazer'],
    ['ride2', 6.6, '[scared, quiet] …Tak.', 'ola'],
    ['ride2', 9.2, 'W szybie widać, że patrzy tylko na nią.'],
    ['ride2', 12.6, 'Telefon gaśnie.'],
    ['getoff', 0.4, 'Następny: Kasztanowa. Ola wciska stop.'],
    ['getoff', 3.4, 'On też wstaje.'],
    ['getoff', 7.0, 'Autobus odjeżdża. Zostają sami.'],
    ['street', 0.4, 'Ola idzie w stronę domu. Kroki za nią nie cichną.'],
    ['street', 8.6, '[whispers] Nie do domu… nie do domu.', 'ola'],
    ['street', 11.2, 'Całodobowy sklep. Jedyne światło na ulicy.'],
    ['shop', 1.4, '[scared] Przepraszam… ktoś za mną idzie. Mogę tu zostać?', 'ola'],
    ['shop', 4.6, 'Siadaj tu, kochanie. Dzwonię na policję.', 'kasjerka'],
    ['shop', 10.4, 'Za szybą, pod latarnią, on stoi i patrzy.'],
    ['shop', 12.8, 'A potem… znika.'],
    ['end', 0.6, 'Poszedł sobie. Już dobrze.', 'kasjerka'],
    ['end', 3.4, 'Monitor kamer. Kamera pierwsza: ulica. Pusto.'],
    ['end', 5.6, 'Kamera druga: sklep.'],
    ['end', 9.0, '[whispers] Wysiadamy razem… Ola.', 'pasazer'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 119.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 18, 22, 28, 30, 34, 37, 44, 48, 50, 53, 56, 58, 62, 66, 70, 75, 80, 86, 90, 98, 102, 106, 110, 114.35, 114.5, 116, 119.99],
                     [-60, -12, -12, -24, -22, -20, -16, -18, -14, -10, -16, -12, -9, -7, -9, -12, -9, -7, -14, -10, -8, -12, -16, -22, -24, -16, -10, -4, -70, -22, -30]),
           'tension': ([0, 30, 58, 102, 114.35, 114.5, 119.99], [-32, -26, -22, -20, -14, -60, -60]),
           'drone': ([0, 104, 114.35, 114.5, 119.99], [-30, -24, -14, -60, -60]),
           'wind': ([0, 6, 18, 18.1, 58, 58.1, 86, 86.1, 119.99], [-90, -30, -30, -90, -90, -30, -30, -90, -90]),
           'roomtone': ([0, 119.99], [-40, -40])},
    heartbeat=([0, 30, 34, 44, 48, 58, 70, 86, 102, 108, 114.35, 114.45, 119.99], [-90, -90, -18, -16, -12, -12, -14, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -8)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -8)], 'door': [('doorclose', -10)]}
EXTRA = [(114.4, 'hit_low', 0), (114.4, 'sting', -3), (110.4, 'riser', -6), (36.0, 'hit_low', -2), (53.0, 'hit_low', -2), (66.0, 'hit_low', -2),
         (48.0, 'breath', -12), (75.0, 'breath', -12), (108.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 6, 18, 30, 44, 58, 70, 86, 102)]
MAXK = 1.5
