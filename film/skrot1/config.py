"""SKRÓTEM · ODC. 1 — „Nie idź na skróty!” (nowa seria). Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'maja':     ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'zuzia':    ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'obcy':     ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'kasjerka': ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),
    'mama':     ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
}
VFILTER = {'maja': 'highpass=f=110', 'zuzia': 'highpass=f=110', 'kasjerka': 'highpass=f=120', 'mama': 'highpass=f=120',
           'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'obcy': 1.3}
SCENES = [('hook', 0, 6), ('gym', 6, 18), ('choice', 18, 28), ('garages', 28, 44), ('chase', 44, 58), ('shop', 58, 72), ('mama', 72, 84), ('end', 84, 104)]
SEG = [
    ['hook', 0.2, 'Nowa seria. Najkrótsza droga do domu… nie zawsze jest bezpieczna.'],
    ['gym', 0.3, 'Dwudziesta pierwsza czterdzieści siedem. Maja kończy trening.'],
    ['gym', 2.2, '[worried] Idziesz garażami? Tam nie ma świateł.', 'zuzia'],
    ['gym', 5.2, '[confident] Tak szybciej. Pięć minut i jestem w domu.', 'maja'],
    ['gym', 8.4, 'Bateria: cztery procent.'],
    ['choice', 0.3, 'Ulicą: piętnaście minut. Światło, ludzie, sklep.'],
    ['choice', 3.0, 'Garażami: pięć minut. I ani jednej działającej latarni.'],
    ['garages', 0.3, 'Garaże. Jedenaście, dwanaście… trzynastka jest uchylona.'],
    ['garages', 4.2, '[friendly, creepy] Zgubiłaś się, mała?', 'obcy'],
    ['garages', 7.0, '[nervous] Nie… idę do domu.', 'maja'],
    ['garages', 9.2, '[smiling] Do dwunastki? Odprowadzę cię… Maja.', 'obcy'],
    ['chase', 0.4, 'Kroki. Za nią. Szybsze niż jej.'],
    ['chase', 5.2, 'Telefon gaśnie.'],
    ['chase', 8.4, 'Brama na końcu garaży. Zamknięta na kłódkę.'],
    ['chase', 10.6, 'Maja zawraca. Biegnie z powrotem, do świateł ulicy.'],
    ['shop', 1.6, '[out of breath, scared] Ktoś szedł za mną przez garaże!', 'maja'],
    ['shop', 4.6, '[calm] Siadaj tu, przy ladzie. Dzwonię na sto dwanaście.', 'kasjerka'],
    ['shop', 7.6, 'I podłącz telefon.', 'kasjerka'],
    ['mama', 1.2, '[worried, warm] Następnym razem napisz, którędy wracasz.', 'mama'],
    ['mama', 4.4, 'I żadnych skrótów przez garaże.', 'mama'],
    ['mama', 7.0, '[quiet] Obiecuję, mamo.', 'maja'],
    ['end', 0.4, 'W nocy Maja rozpakowuje torbę.'],
    ['end', 3.4, 'W bocznej kieszeni: klucz. Z numerem trzynaście. Nie jej.'],
    ['end', 9.4, 'Za oknem garaż trzynaście powoli się otwiera.'],
    ['end', 13.6, '[whispers] Oddasz mi klucz… Maja?', 'obcy'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 103.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 18, 22, 28, 32, 36, 40, 44, 48, 52, 54, 58, 64, 72, 80, 84, 90, 96, 99.55, 99.7, 101, 103.99],
                     [-60, -12, -12, -24, -22, -16, -16, -12, -10, -12, -10, -8, -6, -7, -18, -22, -24, -20, -16, -12, -8, -4, -70, -22, -30]),
           'tension': ([0, 18, 28, 44, 58, 84, 99.55, 99.7, 103.99], [-32, -28, -22, -16, -24, -20, -14, -60, -60]),
           'drone': ([0, 84, 99.55, 99.7, 103.99], [-30, -24, -14, -60, -60]),
           'wind': ([0, 28, 28.1, 58, 58.1, 72, 72.1, 84, 103.99], [-90, -90, -28, -26, -90, -90, -30, -90, -90]),
           'roomtone': ([0, 103.99], [-40, -40])},
    heartbeat=([0, 28, 34, 44, 50, 58, 84, 90, 99.5, 99.6, 103.99], [-90, -90, -14, -10, -6, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'notif': [('notif', -9)], 'error': [('boom', -8)],
           'door': [('doorclose', -10)], 'creak': [('creak', -6)], 'slam': [('slam', -4)], 'dial': [('dial', -12)], 'keys': [('keys', -6)]}
EXTRA = [(99.6, 'hit_low', 0), (99.6, 'sting', -3), (95.6, 'riser', -6), (36.0, 'hit_low', -2), (41.0, 'sting', -9), (50.0, 'hit_low', -1), (53.0, 'sting', -6),
         (90.0, 'sting', -10), (95.0, 'breath', -8), (46.0, 'breath', -10)] + [(t, 'hit_low', -6) for t in (0.2, 6, 18, 28, 44, 58, 72, 84)]
MAXK = 1.5
