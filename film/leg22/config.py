"""LEGENDY GROZY · PAN BEZ TWARZY — własny stwór i historia (jesienny las, dom na skraju lasu, poddasze)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'dziadek': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08'}
TEMPO = {'lektor': 1.08, 'dziadek': 1.05}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('las0', 4.4, 8.0), ('zdjecia', 8.0, 11.4), ('dziadek', 11.4, 15.8), ('kuba0', 15.8, 18.4), ('wycieczka', 18.4, 22.0), ('mgla', 22.0, 25.2), ('zdjecie1', 25.2, 28.8), ('galeria1', 28.8, 32.6), ('galeria2', 32.6, 36.0), ('galeria3', 36.0, 39.6), ('zoom', 39.6, 43.2), ('nikt', 43.2, 46.4), ('okno', 46.4, 50.0), ('latarnia', 50.0, 53.8), ('mruga', 53.8, 57.2), ('szyba', 57.2, 61.0), ('dzwonie', 61.0, 64.0), ('dziadek2', 64.0, 68.0), ('gasi', 68.0, 71.0), ('klik', 71.0, 74.2), ('selfie', 74.2, 78.2), ('patrzy', 78.2, 81.6), ('ciemnosc', 81.6, 84.0), ('epilog', 84.0, 89.2), ('end', 89.2, 94.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Pan Bez Twarzy.'],
    ['las0', 0.15, '[storytelling, tense] Mówi się, że w lasach stoi ktoś za wysoki. I nie ma twarzy.'],
    ['zdjecia', 0.15, '[whispering] Kto zrobi mu zdjęcie, tego on już nie zgubi.'],
    ['dziadek', 0.15, '[old man, serious, warning] Kuba, jak w lesie zobaczysz kogoś za wysokiego, nie patrz na niego. I nie rób zdjęć.', 'dziadek'],
    ['kuba0', 0.15, '[boy, laughing] Dziadku, to bajki.', 'kuba'],
    ['wycieczka', 0.15, '[storytelling] W piątek pojechaliśmy z klasą na ścieżkę przyrodniczą.'],
    ['mgla', 0.15, '[storytelling, tense] W lesie była mgła. Gęsta jak mleko.'],
    ['zdjecie1', 0.15, '[storytelling] Pani zrobiła nam wspólne zdjęcie na polanie.'],
    ['galeria1', 0.15, '[storytelling, tense, slow] Wieczorem obejrzałem zdjęcia. Między drzewami ktoś stał.'],
    ['galeria2', 0.15, '[whispering] Na następnym był bliżej.'],
    ['galeria3', 0.15, '[whispering] Na kolejnym stał tuż za naszą klasą.'],
    ['nikt', 0.15, '[storytelling, tense] Nikt go tam nie widział. Nikt.'],
    ['okno', 0.15, '[storytelling, tense] Mieszkamy w domu na skraju lasu. Wyjrzałem przez okno.'],
    ['latarnia', 0.15, '[storytelling, tense, slow] Pod latarnią, przy furtce, stał ktoś bardzo wysoki.'],
    ['dzwonie', 0.15, '[storytelling, urgent] Zadzwoniłem do dziadka.'],
    ['dziadek2', 0.15, '[old man, scared, whispering] Nie patrz w okno. Zgaś światło. I nie odwracaj się.', 'dziadek'],
    ['gasi', 0.15, '[storytelling, tense] Zgasiłem światło. Zrobiło się cicho.'],
    ['klik', 0.15, '[whispering] Wtedy mój telefon sam zrobił zdjęcie. Przednim aparatem.'],
    ['selfie', 0.15, '[storytelling, tense, slow] Na zdjęciu byłem ja. A tuż za mną… on.'],
    ['patrzy', 0.15, '[whispering, slow] Nie miał twarzy. Ale wiedziałem, że patrzy.'],
    ['epilog', 0.15, '[storytelling] Mówi się, że on nigdy nie chodzi. Po prostu za każdym razem, gdy mrugniesz, jest bliżej.'],
    ['end', 0.15, '[whispering, eerie] Nie mrugaj.'],
    ['zoom', 0.15, '[whispering, slow] Przybliżyłem zdjęcie. Tam, gdzie powinna być twarz, nie było nic.'],
    ['mruga', 0.15, '[storytelling, tense] Latarnia zamrugała. Kiedy znów się zapaliła, przy furtce nikogo nie było.'],
    ['szyba', 0.15, '[whispering, slow] Na szybie, tuż przed moją twarzą, zostały odciski długich palców.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 94.19], [-34, -34]),
    loops={'groza': ([0, .2, 11.4, 18.4, 28.8, 50.0, 68.0, 74.2, 84.0, 94.19], [-60, -10, -28, -20, -8, -5, -12, -3, -16, -40]),
           'tension': ([0, 11.4, 22.0, 28.8, 50.0, 74.2, 84.0, 94.19], [-18, -32, -20, -8, -5, -3, -24, -40]),
           'drone': ([0, 22.0, 28.8, 50.0, 74.2, 84.0, 89.2], [-40, -22, -10, -6, -4, -26, -30]),
           'wind': ([0, 11.4, 18.4, 28.8, 50.0, 61.0, 94.19], [-26, -60, -20, -60, -22, -60, -60]),
           'roomtone': ([0, 94.19], [-36, -36])},
    heartbeat=([0, 32.6, 50.0, 74.2, 84.0, 94.19], [-90, -12, -6, -4, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'click': [('tap', -6)], 'ring': [('dial', -8)], 'switch': [('poweroff', -4)], 'buzz': [('buzz', -8)], 'squeak': [('scrape', -10)]}
EXTRA = [(0.1, 'hit_low', -4), (8.5, 'hit_low', -3), (30.6, 'hit_low', -1), (32.9, 'hit_low', -2), (36.3, 'hit_low', 0), (36.3, 'sting', -4), (41.8, 'hit_low', -1), (48.5, 'riser', -7), (51.4, 'hit_low', 0), (51.4, 'sting', -3), (56.0, 'hit_low', -1), (59.2, 'hit_low', 0), (59.2, 'sting', -2), (69.0, 'hit_low', -3), (72.2, 'riser', -5), (75.4, 'hit_low', 0), (75.4, 'sting', 0), (81.65, 'hit_low', 0), (89.2, 'hit_low', -2), (11.4, 'hit_low', -9), (18.4, 'hit_low', -9), (46.4, 'hit_low', -9), (61.0, 'hit_low', -9)]
