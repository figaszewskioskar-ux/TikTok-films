"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 2"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':          ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),   # Maria
    'dyspozytorka': ('H3IcxEgdFxIEJAqMc0Bc', 'eleven_v3', V3),   # Joanna
    'falszywy':     ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # Ryszard — ten sam głos co Kaptur (trop!)
    'kaptur':       ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'policjant':    ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),   # Tomasz
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('call', 12, 20), ('bang', 20, 30), ('unlock', 30, 38), ('verify', 38, 48),
          ('handle', 48, 56), ('sirens', 56, 64), ('stairs', 64, 74), ('morning', 74, 82), ('story', 82, 94), ('end', 94, 101)]
SEG = [
    ['hook', 0.1, 'Jeśli ktoś za drzwiami krzyczy: policja… nie otwieraj od razu.'],
    ['hook', 2.8, 'Najpierw zapytaj sto dwanaście.'],
    ['recap', 0.2, 'Część druga. Ktoś zakleił Oli wizjer. Płacz był przynętą.'],
    ['recap', 3.4, 'A teraz ktoś patrzy na nią przez szkło. Ola odskakuje od drzwi.'],
    ['call', 0.3, 'Dyspozytorka wciąż jest na linii.'],
    ['call', 2.2, 'Proszę się nie rozłączać. Patrol już jedzie.', 'dyspozytorka'],
    ['call', 5.6, 'Ola siada pod ścianą. Liczy sekundy.'],
    ['bang', 0.2, 'Trzy minuty później.'],
    ['bang', 1.6, '[shouting] Policja! Proszę otworzyć drzwi!', 'falszywy'],
    ['bang', 5.0, 'Ola zrywa się z podłogi. Są. Przyjechali.'],
    ['unlock', 0.3, 'Oddycha z ulgą. Podchodzi do drzwi. Przekręca pierwszy zamek.'],
    ['unlock', 3.6, 'Błąd pierwszy. Nie sprawdziła, kto stoi za drzwiami.'],
    ['verify', 0.3, '[whispers] Czy policja jest już pod moimi drzwiami?', 'ola'],
    ['verify', 3.0, 'Nie. Patrol jest cztery minuty od pani. Proszę nie otwierać.', 'dyspozytorka'],
    ['verify', 7.4, 'Cztery minuty. Czyli to… nie jest policja.'],
    ['handle', 0.2, 'Ola przekręca zamek z powrotem. Cicho. Powoli.'],
    ['handle', 2.6, 'Klamka idzie w dół. Ktoś sprawdza, czy drzwi puściły.'],
    ['sirens', 0.3, 'I wtedy pod blok wjeżdża radiowóz. Prawdziwy.'],
    ['sirens', 3.5, 'Na klatce ktoś biegnie. W dół. Dwie osoby.'],
    ['stairs', 0.3, 'Kobieta nie zdążyła. Zatrzymali ją na trzecim piętrze.'],
    ['stairs', 4.0, 'Kaptur zniknął. Jakby znał ten blok lepiej niż ktokolwiek.'],
    ['morning', 0.3, 'Rano policjant zadaje Oli tylko jedno pytanie.'],
    ['morning', 2.6, 'Skąd oni wiedzieli, że jesteś sama?', 'policjant'],
    ['story', 0.3, 'Ola otwiera swoją wczorajszą relację. Dwudziesta druga trzynaście.'],
    ['story', 3.4, 'Sama na chacie do rana. Z widokiem z okna. I z lokalizacją.'],
    ['story', 6.0, 'Błąd drugi.'],
    ['story', 7.6, 'Relację obejrzało czterdzieści osób. Trzydzieści dziewięć z nich Ola zna.'],
    ['end', 0.3, 'Czterdzieste konto nie ma zdjęcia. I właśnie przyszła od niego wiadomość.'],
    ['end', 4.2, '[whispers] Dobranoc, Ola.', 'kaptur'],
]
VFILTER = {
    'dyspozytorka': 'highpass=f=350,lowpass=f=3400,acompressor',
    'falszywy': 'highpass=f=150,lowpass=f=2600,aecho=0.6:0.5:35:0.3',
    'kaptur': 'lowpass=f=3800',
    'ola': 'highpass=f=110',
}
VGAIN = {'kaptur': 1.4, 'ola': 0.9, 'falszywy': 1.2}
SFX = {
    'bang':    (3,  False, 'heavy fist pounding on an apartment door at night, three loud bangs'),
    'handle':  (3,  False, 'metal door handle slowly pushed down and released, locked door, creak'),
    'siren':   (6,  False, 'police car siren arriving and stopping outside apartment block at night, european siren'),
    'unlock':  (1.5, False, 'single deadbolt door lock turning, quiet click'),
    'notif':   (1.5, False, 'smartphone message notification sound, short soft ping'),
    'radio':   (4,  False, 'police radio static and chatter in stairwell, echo'),
    'morning': (20, True,  'calm morning city ambience through closed window, distant traffic, a few birds'),
}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 12, 20, 30, 38, 44, 48, 55.8, 56.2, 64, 74, 74.2, 82, 94, 100.99],
         [-28, -29, -26, -27, -25, -23, -22, -21, -30, -29, -33, -40, -34, -26, -24]),
    outdoor=([0, 55.99, 56, 63.99, 64, 100.99], [0, 0, 1, 1, 0, 0]),
    wind_db=-36,
    loops={'roomtone': ([0, 73.9, 74, 100.99], [-38, -38, -90, -90]), 'morning': ([0, 73.9, 74, 81.9, 82, 100.99], [-90, -90, -34, -34, -90, -90])},
    heartbeat=([0, 20, 22, 44, 47.5, 55.5, 56, 100.99], [-90, -90, -28, -24, -20, -20, -90, -90]),
)
REALMAP = {
    'bang': [('bang', -2)], 'unlock': [('unlock', -8)], 'handle': [('handle', -6)], 'siren': [('siren', -8)],
    'run': [('run', -10)], 'radio': [('radio', -14)], 'notif': [('notif', -8)],
    'boom': [('boom', -7)], 'stab': [('boom', -5)], 'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)],
}
EXTRA = [(50.0, 'breath', -17)]
