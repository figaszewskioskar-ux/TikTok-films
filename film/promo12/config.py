"""Story: nowa seria SAM W DOMU · odc. 1 „Nie przytrzymuj drzwi!” — dziś 17:00, codziennie o 17:00. Przerażający lektor."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3)}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'obcy': 1.3}
MAXK = 2.0
TARGET = None
SCENES = [('s1', 0, 5), ('s2', 5, 10), ('s3', 10, 16)]
SEG = [
    ['s1', 0.2, '[low, ominous voice, slowly] Nowa seria. Sam w domu.'],
    ['s1', 2.9, '[low, ominous voice, slowly] Jeśli ktoś prosi, żebyś przytrzymał drzwi… nie przytrzymuj.'],
    ['s2', 0.3, '[friendly, warm] Przytrzymasz? Zapomniałem kluczy.', 'obcy'],
    ['s2', 2.7, '[whispering, terrified] Kuba przytrzymał.'],
    ['s3', 0.3, '[low, ominous voice, slowly] Pierwszy odcinek… dziś o siedemnastej.'],
    ['s3', 1.8, '[low, ominous voice, slowly] A od teraz nowe filmy codziennie. O siedemnastej.'],
    ['s3', 3.8, '[whispering] Obserwuj… żeby nie przegapić.'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 15.99], [-30, -30]),
             loops={'tension': ([0, 9.9, 10.1, 15.99], [-22, -12, -40, -30]), 'drone': ([0, 10, 15.99], [-26, -18, -26]), 'roomtone': ([0, 15.99], [-38, -38])},
             heartbeat=([0, 5, 9.9, 10, 15.99], [-90, -12, -6, -90, -90]))
REALMAP = {'stab': [('boom', -5)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'door': [('doorclose', -10)], 'knock': [('knock', -3)], 'notif': [('notif', -9)]}
EXTRA = [(10.0, 'hit_low', 0), (10.0, 'sting', -4), (7.6, 'sting', -6), (0.1, 'hit_low', -4)]
