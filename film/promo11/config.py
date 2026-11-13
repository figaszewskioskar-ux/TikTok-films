"""Rolka: dziś w nocy 2 nowe filmy o 1:28 + zaproszenie na stronę"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
TARGET = None
SQUEEZE = 0.85
SCENES = [('noc', 0, 5), ('strona', 5, 11.5), ('cta', 11.5, 15)]
SEG = [
    ['noc', 0.2, 'Dziś w nocy aż dwa nowe filmy. Premiera o pierwszej dwadzieścia osiem.'],
    ['strona', 0.3, 'Zanim wyjdą, wejdź na stronę. Odliczanie, gra i ukryty easter egg w oknie sto cztery.'],
    ['cta', 0.2, 'Link w bio. Widzimy się o pierwszej dwadzieścia osiem.'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 5, 11.5, 14.99], [-30, -27, -29, -30]),
             loops={'roomtone': ([0, 14.99], [-40, -40]), 'tension': ([0, 5, 11.5, 14.99], [-28, -22, -26, -32])},
             heartbeat=([0, 4.5, 5, 11, 11.5, 14.99], [-90, -90, -16, -12, -90, -90]))
REALMAP = {'stab': [('boom', -5)], 'notif': [('notif', -9)], 'knock': [('knock', -5)], 'hit': [('boom', -4)], 'whoosh': [('whoosh', -16)]}
EXTRA = [(0.15, 'hit_low', -4), (5.0, 'hit_low', -6), (11.5, 'hit_low', -4)]
