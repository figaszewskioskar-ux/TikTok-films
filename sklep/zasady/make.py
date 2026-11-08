"""Ściąga „Zasady z bloku 94” (A4, PDF). Tylko części, które już wyszły.
Użycie: python3 make.py 4   -> blok94-zasady.pdf (wgrać jako assets/blok94-zasady.pdf)"""
import sys, os, subprocess, html
N = int(sys.argv[1]) if len(sys.argv) > 1 else 4
HERE = os.path.dirname(os.path.abspath(__file__)); IMG = os.path.join(HERE, '..', '..', 'film', 'promo', 'out')
# (część, sytuacja, co robisz) – prawdziwe zasady z kart ZASADA i BŁĄD
R = [
 (1, 'Ktoś puka w nocy, a wizjer jest czarny?', 'Nie pytaj „kto tam?” i nie zdradzaj, że jesteś w domu. Dzwoń na 112.'),
 (1, 'Ktoś prosi o pomoc zza drzwi?', 'Nie otwieraj, nawet na łańcuch: łańcuch nie zatrzyma dorosłego. Wezwij pomoc przez 112 i mów przez drzwi.'),
 (2, 'Ktoś krzyczy: „Policja, otwierać!”?', 'Zanim otworzysz, zapytaj dyspozytora 112, czy patrol naprawdę stoi pod twoimi drzwiami.'),
 (2, 'Jesteś sam w domu?', 'Nie pisz o tym w relacji i nie dodawaj lokalizacji. Relację mogą oglądać obcy.'),
 (3, 'Pisze do ciebie obce konto?', 'Nie odpisuj. Zrób zrzuty ekranu, zablokuj, zgłoś i powiedz dorosłemu.'),
 (3, 'Prąd w nocy zgasł tylko u ciebie?', 'Nie wychodź na korytarz do licznika. Zamknij drzwi i dzwoń na 112.'),
 (4, 'Ktoś ma twoje klucze?', 'Zamek wymień tej samej nocy, a do tego czasu dzwoń na 112. Nie noś numeru mieszkania na breloczku.'),
 (4, 'Obcy ucieka po klatce?', 'Nie goń go. Zostań za zamkniętymi drzwiami i przekaż policji, co widziałeś.'),
 (5, 'Nowy sąsiad zagaduje?', 'Bądź miły przez drzwi, ale nie mów, kiedy jesteś sam, i nie wpuszczaj do środka.'),
 (6, 'Sąsiad w niebezpieczeństwie?', 'Dzwoń na 112. Nie wybiegaj w nocy i zawsze zamykaj za sobą drzwi. Na noc zamknij balkon.'),
 (7, 'Ktoś może być w domu?', 'Nie sprawdzaj sam. Wyjdź i dzwoń na 112 z bezpiecznego miejsca.'),
 (7, 'Jedno hasło do wszystkiego?', 'Każde konto: inne hasło i weryfikacja dwuetapowa.'),
]
rows = [r for r in R if r[0] <= N]
li = ''.join(f'<li><span class="n">{i+1}</span><div><b>{html.escape(a)}</b><p>{html.escape(b)}</p><i>odc. {c + 1}</i></div></li>' for i, (c, a, b) in enumerate(rows))
doc = f'''<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Public+Sans:wght@400;600;800&display=swap" rel="stylesheet">
<style>@page{{size:A4;margin:0}}*{{box-sizing:border-box}}body{{margin:0;font-family:'Public Sans';color:#14161b;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.p{{width:210mm;height:297mm;padding:13mm 14mm 10mm;position:relative;overflow:hidden;background:#fff}}
.top{{background:#0a0c14;color:#f3efe6;border-radius:6mm;padding:7mm 8mm;position:relative;overflow:hidden}}
.e{{display:inline-block;background:#f39c12;color:#14161b;font-weight:800;font-size:9pt;letter-spacing:.14em;padding:1.5mm 3mm;border-radius:9mm}}
h1{{font-family:'Big Shoulders Display';font-weight:900;font-size:42pt;line-height:.95;margin:3mm 0 0}}h1 span{{display:inline-block;background:#d7263d;color:#fff;padding:0 3mm 1mm;border-radius:2mm;transform:rotate(-1.5deg)}}
.top p{{margin:3mm 0 0;font-size:10.5pt;color:#c9c6bb;max-width:118mm}}.top img{{position:absolute;right:4mm;bottom:-3mm;height:50mm}}
.big{{display:flex;gap:4mm;margin:5mm 0}}.big div{{flex:1;border:.6mm solid #d7263d;border-radius:4mm;padding:3mm 4mm;font-size:10pt}}.big b{{display:block;font-family:'Big Shoulders Display';font-size:24pt;color:#d7263d;line-height:1}}
ol{{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:3.2mm}}
li{{display:flex;gap:3mm;background:#f4f1ea;border-radius:3.5mm;padding:3.2mm 3.6mm;break-inside:avoid}}
.n{{flex:0 0 9mm;height:9mm;border-radius:50%;background:#14161b;color:#f39c12;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:11pt;box-shadow:0 0 0 1mm #c9a15a}}
li b{{font-size:10.5pt;display:block}}li p{{margin:1mm 0 0;font-size:9.6pt;line-height:1.35}}li i{{display:block;font-style:normal;font-size:7.5pt;color:#8a8577;margin-top:1mm;text-transform:uppercase;letter-spacing:.1em}}
.f{{position:absolute;left:14mm;right:14mm;bottom:9mm;display:flex;justify-content:space-between;align-items:end;font-size:8.5pt;color:#6b675d;border-top:.3mm solid #ddd;padding-top:3mm}}.f b{{color:#14161b;font-size:10pt}}</style>
<div class="p"><div class="top"><span class="e">BLOK 94 · „KTO TAM?”</span><h1>ZASADY Z <span>BLOKU 94</span></h1>
<p>Z każdego odcinka serii jedna lekcja. Wydrukuj, powieś na lodówce albo w klasie. Ola i Kuba nauczyli się tego na własnych błędach, ty nie musisz.</p>
<img src="file://{IMG}/blok94-ola.png"></div>
<div class="big"><div><b>112</b>Numer alarmowy. Bezpłatny, działa też bez środków na koncie i z zablokowanego ekranu telefonu.</div><div><b>NIE OTWIERAJ</b>W nocy, obcym, „policji” bez sprawdzenia w 112, „sąsiadom”.</div><div><b>NIE ZDRADZAJ</b>Że jesteś sam: przez drzwi, w relacji, w wiadomościach.</div></div>
<ol>{li}</ol>
<div class="f"><div><b>protokolocaleni.online</b><br>Seria na TikToku: @protokolocaleni · gra „Kto tam?” na stronie</div><div>Stan: odcinki 2–{N + 1}. Nowe zasady po każdym odcinku.</div></div></div>'''
open(os.path.join(HERE, 'zasady.html'), 'w').write(doc)
js = "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage();await p.goto('file://%s/zasady.html',{waitUntil:'networkidle'});await p.waitForTimeout(500);await p.pdf({path:'%s/blok94-zasady.pdf',format:'A4',printBackground:true,pageRanges:'1'});await p.setViewportSize({width:794,height:1123});await p.screenshot({path:'%s/podglad.png'});await b.close();})();" % (HERE, HERE, HERE)
subprocess.run(['node', '-e', js], check=True)
print('ok', N, len(rows), 'zasad')
