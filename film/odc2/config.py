"""Konfiguracja BLOK 94 · ODC. 2 — „Nie pytaj »kto tam?«”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (najbliższy oryginałowi)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {   # kwestie postaci (model v3 rozumie [whispers], [crying])
    'ola':     ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),   # Maria - Quiet and Gentle
    'kobieta': ('8EWWaNTDrqObI22Gvo1q', 'eleven_v3', V3),   # Aleksandra - Urgent and Inviting
    'kaptur':  ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # Ryszard - Sinister Storyteller
}
SQUEEZE = 0.8

SCENES = [('hook', 0, 5), ('ext', 5, 11), ('bed', 11, 19), ('hall', 19, 27), ('peep1', 27, 33), ('ask', 33, 41),
          ('cry', 41, 53), ('chain', 53, 63), ('bait', 63, 73), ('call', 73, 83), ('zdz', 83, 91), ('wait', 91, 101),
          ('note', 101, 105), ('peep2', 105, 112), ('end', 112, 117)]
SEG = [
    ['hook', 0.1, 'Jeśli w nocy ktoś puka, a wizjer jest czarny… nie pytaj: kto tam?'],
    ['hook', 2.6, 'On właśnie sprawdza, czy ktoś jest w domu.'],
    ['ext', 0.3, 'Druga czterdzieści siedem. Dziewiąte piętro.'],
    ['ext', 2.6, 'Ola jest sama. Rodzice mają nocną zmianę.'],
    ['bed', 0.4, 'Ktoś puka do drzwi. Trzy razy.'],
    ['bed', 2.6, 'Potem cisza.'],
    ['bed', 4.5, 'Nikt nie dzwonił domofonem. Czyli ten ktoś… jest już w klatce.'],
    ['hall', 0.3, 'Ola idzie do drzwi. Na palcach. Z telefonem w ręce.'],
    ['hall', 4.6, 'Zagląda przez wizjer.'],
    ['peep1', 0.3, 'Czarno.'],
    ['peep1', 1.4, 'A na klatce światło pali się całą noc.'],
    ['peep1', 3.6, 'Ktoś zakleił wizjer. Od zewnątrz.'],
    ['ask', 0.6, '[whispers] Kto tam?', 'ola'],
    ['ask', 2.5, 'Błąd pierwszy. Teraz ten ktoś wie, że w środku ktoś jest.'],
    ['ask', 6.0, 'I że to dziewczyna.'],
    ['cry', 0.4, 'Cisza. A potem… płacz.'],
    ['cry', 2.6, '[crying] Proszę… otwórz… On za mną idzie… proszę…', 'kobieta'],
    ['cry', 7.2, 'Kobieta. Przerażona. Ola nie zna tego głosu.'],
    ['cry', 9.4, 'Ale ręka sama sięga do zamka.'],
    ['chain', 0.2, 'Ola otwiera. Tylko na łańcuch.'],
    ['chain', 1.5, 'Błąd drugi.'],
    ['chain', 3.0, 'W szparze… nikogo nie ma. Płacz ucichł.'],
    ['chain', 5.9, 'Tylko ręka w czarnej rękawiczce powoli sięga do łańcucha.'],
    ['chain', 9.2, 'Ola zatrzaskuje drzwi.'],
    ['bait', 0.3, 'Kobieta stała przy ścianie. Tuż obok drzwi. Tam, gdzie wizjer nie sięga.'],
    ['bait', 4.6, 'A piętro wyżej… czekał on.'],
    ['bait', 7.2, 'Płacz był przynętą.'],
    ['call', 0.3, 'Ola robi to, co powinna zrobić od początku. Dzwoni na sto dwanaście.'],
    ['call', 4.2, 'Szeptem podaje adres.'],
    ['call', 6.2, 'Policja jest w drodze. Osiem minut.'],
    ['zdz', 0.3, 'Na drugim piętrze nie śpi pan Zdzisiek. On już kiedyś słyszał ten płacz.'],
    ['zdz', 4.0, 'Tydzień temu. Pod siódemką. Rano pani z siódmego nie miała już telewizora. Ani obrączki.'],
    ['wait', 0.3, 'Pięć minut. Sześć.'],
    ['wait', 2.8, 'Pod drzwiami pada pasek światła z klatki.'],
    ['wait', 5.6, 'I nagle… dwa cienie. Ktoś stoi tuż pod drzwiami.'],
    ['wait', 8.3, 'Pod drzwi wsuwa się kartka.'],
    ['peep2', 0.3, 'Wizjer nagle jaśnieje.'],
    ['peep2', 1.6, 'Ktoś po drugiej stronie… odkleja taśmę.'],
    ['peep2', 5.4, 'Teraz to on patrzy na nią.'],
    ['end', 1.3, '[whispers] Wiem, że patrzysz.', 'kaptur'],
]

# ---------- dźwięk ----------
VFILTER = {
    'kobieta': 'highpass=f=220,lowpass=f=2400,aecho=0.6:0.5:35:0.3',   # zza drzwi
    'kaptur': 'lowpass=f=3800,aecho=0.5:0.4:25:0.25',
    'ola': 'highpass=f=110',
}
VGAIN = {'kaptur': 1.4, 'ola': 0.9, 'kobieta': 1.1}
SFX = {
    'knock':    (3,  False, 'three slow heavy knocks on a wooden apartment door at night, close, silence after'),
    'cry':      (10, False, 'woman sobbing quietly behind a closed door, muffled, apartment stairwell'),
    'chain':    (2,  False, 'door chain lock rattling as an apartment door opens on the chain'),
    'slam':     (2,  False, 'apartment door slammed shut and quickly locked, key turning, chain rattle'),
    'tape':     (3,  False, 'tape being slowly peeled off a door, close up, sticky ripping'),
    'paper':    (2,  False, 'sheet of paper sliding slowly under a door on a wooden floor'),
    'dial':     (3,  False, 'smartphone dialing three digits then a single ringing tone, quiet'),
    'roomtone': (20, True,  'quiet apartment at night, refrigerator hum, very distant city traffic, room tone'),
    'creak':    (2,  False, 'single slow wooden floor creak, footstep in dark apartment'),
    'breath':   (5,  False, 'slow heavy breathing very close behind a door, muffled, creepy'),
}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 27, 41, 53, 62, 62.3, 73, 91, 99, 105, 109.2, 109.4, 109.8, 116.99],
         [-30, -28, -26, -24, -22, -31, -31, -27, -23, -26, -21, -60, -24, -30]),
    outdoor=([0, 4.99, 5.0, 10.99, 11.0, 116.99], [0, 0, 1, 1, 0, 0]),
    wind_db=-35,
    loops={'roomtone': ([0, 116.99], [-38, -38])},
    heartbeat=([0, 95, 97, 104.5, 105, 109.2, 109.3, 116.99], [-90, -90, -26, -22, -24, -19, -90, -90]),
)
REALMAP = {
    'knock': [('knock', -3)], 'chain': [('chain', -8)], 'slam': [('slam', -3), ('boom', -9)], 'tape': [('tape', -7)],
    'paper': [('paper', -8)], 'dial': [('dial', -12)], 'glove': [('creak', -13)], 'hit': [('boom', -1)],
    'boom': [('boom', -7)], 'stab': [('boom', -5)], 'whoosh': [('whoosh', -18)], 'error': [('boom', -7)],
}
EXTRA = [
    (20.0, 'creak', -17), (23.0, 'creak', -19), (41.5, 'cry', -15), (47.5, 'cry', -19),
    (59.0, 'breath', -16), (107.0, 'breath', -14),
]
