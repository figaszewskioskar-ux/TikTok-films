"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 6 — „Zamknij balkon na noc!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.25, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),   # Tomasz Z
    'kaptur':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # Ryszard
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 11), ('zdz', 11, 20), ('knock', 20, 28), ('curtain', 28, 38), ('call', 38, 46),
          ('run', 46, 54), ('police', 54, 62), ('note', 62, 66), ('back', 66, 76), ('end', 76, 86)]
SEG = [
    ['hook', 0.1, 'Mieszkasz nisko? Na noc zamknij balkon.'],
    ['hook', 2.6, 'Drugie piętro to nie dziewiąte. Na balkon da się wejść.'],
    ['recap', 0.2, 'Część szósta. Na ścianie w pustym mieszkaniu wisiało zdjęcie drzwi pana Zdziśka. Podpis: sam.'],
    ['zdz', 0.3, 'Pan Zdzisiek wie o zdjęciu. Nie śpi. Siedzi w fotelu i czeka.'],
    ['zdz', 3.2, 'Tylko balkon uchylił. Bo duszno.'],
    ['zdz', 7.2, 'Błąd pierwszy.'],
    ['knock', 0.4, 'Za dwie dwunasta. Pukanie.'],
    ['knock', 2.4, 'Pan Zdzisiek nie wstaje. Nie odzywa się. Dobrze.'],
    ['knock', 5.4, 'Pukanie milknie.'],
    ['curtain', 0.4, 'Cisza. A potem… firanka się porusza.'],
    ['curtain', 3.6, 'Ktoś stoi na balkonie.'],
    ['curtain', 6.2, 'Tuż za szybą.'],
    ['call', 0.2, 'Pan Zdzisiek zamyka się w łazience. Dzwoni na sto dwanaście.'],
    ['call', 2.4, '[whispering, scared] Halo, sto dwanaście? Ktoś jest na moim balkonie!', 'zdzisiek'],
    ['call', 6.4, 'A potem dzwoni do Oli.'],
    ['run', 0.3, 'Ola i Kuba wybiegają na pomoc.'],
    ['run', 3.2, 'Drzwi mieszkania zostają otwarte.'],
    ['run', 4.6, 'Błąd drugi.'],
    ['police', 0.4, 'Policja jest po czterech minutach. Balkon jest pusty.'],
    ['police', 2.8, 'Na parapecie leży kartka.'],
    ['police', 4.6, 'Sąsiad w niebezpieczeństwie? Dzwoń na sto dwanaście. Nie wybiegaj w nocy. I zawsze zamykaj drzwi.'],
    ['note', 0.6, 'Nie ciebie szukałem.'],
    ['back', 0.3, 'Ola i Kuba wracają na dziewiąte. Drzwi są tak, jak je zostawili. Otwarte.'],
    ['back', 4.6, 'W pokoju Oli, na szybie, od środka… karteczka.'],
    ['end', 0.4, 'A szafa… jest uchylona.'],
    ['end', 5.4, '[whispers] Cześć, Ola.', 'kaptur'],
]
VFILTER = {'zdzisiek': 'highpass=f=120,lowpass=f=6000,aecho=0.6:0.4:20:0.3', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.5}
SFX = {'tap': (2, False, 'fingernail slowly tapping on a window glass at night, three taps, close')}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 11, 20, 28, 31.2, 31.4, 32, 38, 46, 54, 62, 66, 76, 80.4, 80.6, 85.99],
         [-27, -30, -33, -30, -26, -60, -22, -24, -26, -24, -30, -26, -25, -24, -60, -22, -24]),
    loops={'roomtone': ([0, 85.99], [-39, -39]), 'wind': ([0, 27.9, 28, 37.9, 38, 85.99], [-90, -90, -36, -36, -90, -90])},
    heartbeat=([0, 28, 30, 38, 46, 54, 66, 76, 80.4, 80.5, 85.99], [-90, -90, -27, -22, -22, -90, -26, -21, -18, -90, -22]),
)
REALMAP = {'knock': [('knock', -4)], 'tap': [('tap', -6)], 'doorlock': [('doorlock', -8)], 'dial': [('dial', -12)], 'run': [('run', -9)],
           'siren': [('siren', -10)], 'paper': [('paper', -9)], 'creak': [('creak', -10)], 'boom': [('boom', -6)], 'stab': [('boom', -5)],
           'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)]}
EXTRA = [(34.0, 'breath', -15), (78.5, 'breath', -13)]

TARGET = 118
MAXK = 1.4
