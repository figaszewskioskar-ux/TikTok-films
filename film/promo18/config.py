"""Zapowiedź: dziś 16:00 cała seria na YouTube, 17:00 nowy film na TikToku (bez spoilerów)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12'}
MAXK = 2.0
TARGET = None
SCENES = [('s1', 0, 5.5), ('s2', 5.5, 12.5)]
SEG = [
    ['s1', 0.3, '[low, ominous voice, slowly] Dziś… o szesnastej.'],
    ['s1', 3.2, '[whispering] Cała seria… na YouTube.'],
    ['s2', 1.6, '[low, ominous voice, slowly] A o siedemnastej… nowy film na TikToku.'],
    ['s2', 5.0, '[whispering] Obserwuj… żeby nie przegapić.'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 12.49], [-30, -30]),
             loops={'tension': ([0, 2.9, 3.1, 12.49], [-22, -12, -30, -26]), 'drone': ([0, 5, 12.49], [-26, -18, -24]), 'roomtone': ([0, 12.49], [-38, -38])},
             heartbeat=([0, 1, 2.9, 3.0, 12.49], [-90, -12, -6, -90, -90]))
REALMAP = {'stab': [('boom', -5)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'tick': [('tap', -6)], 'notif': [('notif', -9)]}
EXTRA = [(3.0, 'hit_low', 0), (3.0, 'sting', -4), (0.1, 'hit_low', -4), (7.1, 'hit_low', -3)]
