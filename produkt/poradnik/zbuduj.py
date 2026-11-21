"""Buduje poradnik PDF „Warsztat Grozy” (HTML → PDF przez Chromium). Uruchom: python3 produkt/poradnik/zbuduj.py"""
import json, os, subprocess, html
D = os.path.dirname(os.path.abspath(__file__))
rows = json.load(open(os.path.join(D, 'rozbiorka.json')))

CH = [
 ("Format: groza, która mogła się zdarzyć", """
<p>Najlepiej działają historie, o których widz pomyśli: <b>„to mogło być u mnie”</b>. Pukanie w nocy, telefon od obcego, auto, które gaśnie w lesie. Na tym zbudowaliśmy wszystkie serie, a nasz rekord, odcinek „Kto tam?” z serii BLOK 94, przekroczył 750 tysięcy wyświetleń.</p>
<h3>Trzy formaty, które sprawdzają się u nas</h3>
<ul>
<li><b>Legenda</b> (Polskie legendy grozy): „To jest Baba Jaga.”, potem wygląd, prawdziwe wierzenia i zasady, a na końcu jedna noc, w której ktoś łamie zasadę.</li>
<li><b>Seria z bohaterem</b> (BLOK 94): jedna bohaterka, jedno miejsce, cliffhanger i kolejny odcinek następnego dnia.</li>
<li><b>Dylemat</b> (Co się stanie, gdy…?): mówisz do widza („ty”), dajesz mu jedną minutę i licznik na górze ekranu.</li>
</ul>
<h3>Zasady, których się trzymamy</h3>
<ul><li>Hak w pierwszych 2 sekundach: jeden przedmiot z bliska albo twarz stwora.</li><li>Nowa informacja co 5–8 sekund, a ujęcie co 2–3 sekundy.</li><li>Bez „Poprzednio…”: każdy odcinek zaczyna się od haka.</li><li>Ostatnie 8–12 sekund to zwrot, który patrzy prosto w widza.</li><li>Porady bezpieczeństwa muszą być prawdziwe (np. 112, paraliż senny, nieznana woda).</li></ul>"""),
 ("Scenariusz w 12 krokach", """
<p>Scenariusz piszemy od razu jako listę scen z czasem i jedną kwestią lektora na scenę. Jedna scena to 2,4–3,6 sekundy, czyli 6–12 słów. Cały film ma 110–150 sekund.</p>
<h3>Kręgosłup historii (legenda)</h3>
<ol><li>Karta „To jest…” z nazwą i poziomem zagrożenia.</li><li>2–4 fakty z wierzeń: gdzie mieszka, jak wygląda, czego chce.</li><li>Wejście bohatera: zwyczajna sytuacja (wakacje, grzyby, wynajęty pokój).</li><li>Ostrzeżenie od starszej osoby: zakaz sprzeczny z intuicją.</li><li>Bohater je ignoruje albo nie ma wyboru.</li><li>Pierwszy znak: dźwięk, światło, głos bliskiej osoby.</li><li>Eskalacja: coś widać coraz bliżej.</li><li>Kulminacja: twarz stwora z bliska.</li><li>Ratunek dzięki zasadzie z wierzeń.</li><li>Ulga: rano, dowód, że to się działo (ślady, przedmiot).</li><li>Zwrot: to jeszcze nie koniec.</li><li>Karta z prawdziwą informacją i „Obserwuj, żeby poznać następną legendę”.</li></ol>
<p class="tip">Szablon do wypełnienia znajdziesz w pliku <b>szablon-scenariusza.md</b> w paczce.</p>"""),
 ("Lektor i głosy postaci", """
<p>Lektor prowadzi całą historię. Używamy ElevenLabs (model v3), bo rozumie znaczniki emocji w nawiasach, np. <code>[storytelling, tense, slow]</code>, <code>[whispering]</code>, <code>[sweet, old woman, creepy]</code>.</p>
<ul><li><b>Narrator:</b> spokojny, męski głos opowiadacza, bez przesadnego „horrorowego” filtra.</li><li><b>Stwór:</b> ten sam głos co bliska osoba (babcia, tata), obniżony filtrem i z pogłosem. To bardziej przeraża niż „potwór”.</li><li><b>Dzieci:</b> głos dorosły z lekkim podwyższeniem.</li></ul>
<h3>Filtry, których używamy (ffmpeg)</h3>
<pre>lektor:  highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08
stwór:   asetrate=48000*0.84,aresample=48000,atempo=1.12,aecho=0.7:0.6:50|110:0.35|0.2</pre>
<h3>Jak oszczędzać kredyty</h3>
<ul><li>Najpierw film bez lektora (szacowane napisy), dopiero po akceptacji nagranie.</li><li>Nowe kwestie dopisuj na końcu listy, wtedy wcześniejsze nagrania zostają.</li><li>Nie zmieniaj tekstu nagranych kwestii, przesunięcie w czasie jest darmowe.</li></ul>"""),
 ("Czas: wszystko pod lektora", """
<p>Oś czasu powstaje z długości nagrań. Każda scena ma czas początku i końca, a skrypt <code>narr.py</code> po nagraniu dopasowuje sceny do mowy: wydłuża je, jeśli kwestia jest dłuższa, i skraca puste pauzy.</p>
<ul><li>Kwestia startuje 0,15 s po cięciu, żeby obraz zdążył „wejść”.</li><li>Po najważniejszym zdaniu zostaw 0,5 s ciszy.</li><li>Straszak (twarz, uderzenie) zawsze na końcu zdania, nie w środku.</li></ul>"""),
 ("Postacie i stwory", """
<p>Stawiamy na czystą animację 2D z miękkim cieniowaniem. Postać ma być rozpoznawalna po sylwetce w ułamku sekundy.</p>
<ul><li><b>Bohater:</b> jeden charakterystyczny element (czerwona czapka z pomponem, żółta kurtka), duże oczy, wyraźne brwi, które grają emocję, łzy i rumieńce.</li><li><b>Stwór:</b> jedna przerysowana cecha (haczykowaty nos, żelazne zęby, oko z bielmem), wydłużone proporcje i światło od dołu albo z boku.</li><li><b>Cień na połowie twarzy</b> daje „filmową” głębię za darmo.</li></ul>
<p class="tip">Zbliżenia twarzy w kluczowych momentach robią więcej niż szczegółowe tła.</p>"""),
 ("Dekoracje i światło", """
<p>Każda scena ma rozpoznawalne miejsce i jedno źródło ciepłego światła w zimnej nocy.</p>
<ul><li>Tło budujemy warstwami: niebo, daleki las, mgła, bliski las, ziemia, a na pierwszym planie trawa albo kołdra.</li><li>Statyczne warstwy liczymy raz i trzymamy w pamięci, a ruszają się tylko mgła, ogień, śnieg i oczy.</li><li>Ciemna winieta jak przez okno i czerwona poświata na brzegach przy napięciu.</li></ul>"""),
 ("Zegar, napisy na ekranie i celowniki", """
<ul><li><b>Zegar z flagą</b> w lewym górnym rogu pokazuje godzinę akcji (14:20 → 19:41 → 03:12), więc widz czuje upływ nocy.</li><li><b>Celownik</b> z podpisem („ŻELAZNE ZĘBY”, „ŚLADY”) pokazuje ważny przedmiot.</li><li><b>Podpis mówiącego</b> nad napisami („— BABA JAGA —”), gdy mówi postać.</li></ul>"""),
 ("Kamera i efekty", """
<ul><li><b>Najazd</b> 1,06–1,15× przez całą scenę, bo statyczny kadr wygląda martwo.</li><li><b>Szarpnięcie i błysk</b> przy każdym straszaku, razem z niskim uderzeniem w dźwięku.</li><li><b>Biegnące ujęcie z oczu bohatera:</b> pnie drzew przelatują na pierwszym planie, kamera podskakuje, widać parę z ust.</li><li><b>Korekcja kolorów na końcu:</b> poświata świateł, kontrast, ziarno, winieta. Licz ją w RGB, inaczej obraz zrobi się fioletowy (sprawdziliśmy).</li></ul>"""),
 ("Napisy, które trzymają uwagę", """
<ul><li>Fragmenty po 1–3 słowa, kończone na interpunkcji.</li><li>Jedno słowo wyróżnione kolorem: najpierw z listy kluczowych słów (stwór, przedmiot), w innym wypadku najdłuższe.</li><li>Krótkie „wskoczenie” napisu (skala 0,85 → 1), gruby czarny obrys.</li><li>Napisy nad dolnym marginesem, nigdy na twarzy.</li></ul>"""),
 ("Dźwięk grozy i miks", """
<p>Dźwięk robi połowę strachu. Nasz standard warstw:</p>
<ul><li><b>tension</b> przez cały film: wysoki, dysonansowy pisk z „biciem” i niski pomruk, od −20 dB, a przed kulminacją do −6 dB.</li><li><b>drone</b> i <b>heartbeat</b> w scenach napięcia.</li><li><b>hit_low</b> przy każdej zmianie miejsca i ważnym momencie, co 5–10 s.</li><li><b>Zakończenie:</b> riser przez 4 s, potem hit_low i sting dokładnie na zwrocie, a po nich nagła cisza.</li><li>Głośność końcowa −14 LUFS (standard dla telefonów).</li></ul>
<p class="tip">W paczce dostajesz pięć naszych dźwięków wygenerowanych od zera: tension, hit_low, riser, sting i jolt. Możesz ich używać w swoich filmach.</p>"""),
 ("Render i eksport", """
<pre>Format:    1080×1920, 30 fps, H.264 (yuv420p)
Jakość:    CRF 17 albo ok. 5 Mb/s (plik poniżej 100 MB)
Dźwięk:    AAC 256 kb/s, 48 kHz, loudnorm I=-14 TP=-1.5
Długość:   110–150 s (dłuższe filmy trzymają widza dłużej)</pre>
<p>Renderujemy klatka po klatce w przeglądarce bez okna (canvas + Playwright) na 4 równoległych stronach, a potem składamy obraz z dźwiękiem w ffmpeg.</p>"""),
 ("Publikacja: miniaturka, opis, rytm", """
<ul><li><b>Miniaturka:</b> twarz stwora z bliska, nazwa wielkimi literami i jedna zasada („NIE JEDZ NICZEGO W JEJ CHATCE”).</li><li><b>Opis:</b> pierwsze zdanie jako mini-historia z emoji, cytat stwora i wezwanie do obserwowania.</li><li><b>Rytm:</b> nowy film codziennie o tej samej godzinie (u nas 17:00).</li><li>Na końcu filmu „Obserwuj, żeby poznać następną legendę”.</li></ul>"""),
]

def esc(s): return html.escape(s)
toc = ''.join(f'<li><span>{i+1:02d}</span>{t}</li>' for i, (t, _) in enumerate(CH))
chap = ''.join(f'<section class="ch"><div class="no">Rozdział {i+1:02d}</div><h2>{t}</h2>{b}</section>' for i, (t, b) in enumerate(CH))
brk = ''.join(f'<tr><td>{i+1}</td><td>{esc(a)}</td><td>{esc(b)}</td><td>{esc(c)}</td><td>{esc(d)}</td></tr>' for i, (a, b, c, d) in enumerate(rows))
imgs = ''.join(f'<img src="k_{t}.jpg">' for t in (4, 10, 30, 52, 88, 132))
H = f"""<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Warsztat Grozy</title>
<style>
@page{{size:A4;margin:18mm 16mm}}@page :first{{margin:0}}
body{{margin:0;font-family:Inter,'DejaVu Sans',sans-serif;color:#15171c;font-size:11pt;line-height:1.55}}
h1{{font-size:40pt;line-height:1.02;margin:0;letter-spacing:-.02em}}h2{{font-size:22pt;margin:4px 0 12px;letter-spacing:-.01em}}h3{{font-size:13pt;margin:18px 0 6px}}
.cover{{height:296mm;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;background:#0d0d10;color:#f2f2f2;margin:0;padding:24mm 18mm;page-break-after:always;overflow:hidden}}
.cover .k{{color:#e5484d;font-weight:700;letter-spacing:.14em;font-size:10pt;text-transform:uppercase}}.cover p{{color:#b9bcc4;font-size:13pt;max-width:140mm}}
.strip{{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}}.strip img{{width:100%;border-radius:6px}}
.toc{{page-break-after:always}}.toc ol{{list-style:none;padding:0}}.toc li{{display:flex;gap:14px;padding:5px 0;border-bottom:1px solid #e6e8ec;font-size:11.5pt}}.toc li span{{color:#e5484d;font-weight:700;width:28px}}
.ch{{page-break-before:always}}.no{{color:#e5484d;font-weight:700;letter-spacing:.12em;font-size:9pt;text-transform:uppercase}}
pre,code{{font-family:'DejaVu Sans Mono',monospace;font-size:9pt}}pre{{background:#f4f5f7;border-radius:8px;padding:10px 12px;white-space:pre-wrap}}
.tip{{background:#fff4e5;border-left:4px solid #f39c12;padding:8px 12px;border-radius:6px}}
table{{width:100%;border-collapse:collapse;font-size:8.5pt}}td,th{{border-bottom:1px solid #e6e8ec;padding:5px 6px;text-align:left;vertical-align:top}}th{{background:#f4f5f7}}
.num{{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}}.num div{{background:#f4f5f7;border-radius:8px;padding:10px}}.num b{{display:block;font-size:18pt}}
</style></head><body>
<div class="cover"><div><div class="k">Protokół Ocaleni · poradnik</div><h1 style="margin-top:14px">Warsztat Grozy</h1><p style="margin-top:14px">Jak robimy animowane historie grozy na TikToka: od haka w pierwszej sekundzie do gotowego filmu 1080×1920 z lektorem i dźwiękiem grozy.</p></div><div class="strip">{imgs}</div><p style="font-size:10pt">Wersja 1.0 · 2026 · Wszystkie kadry pochodzą z naszych filmów.</p></div>
<div class="toc"><h2>Spis treści</h2><ol>{toc}<li><span>+</span>Rozbiórka odcinka „Baba Jaga” ujęcie po ujęciu</li><li><span>+</span>Prompty do Claude Code</li></ol>
<h3>Co jest w paczce</h3><ul><li>Ten poradnik (PDF)</li><li>Szablony scenariusza: legenda i dylemat (Markdown)</li><li>5 dźwięków grozy wygenerowanych od zera (WAV)</li><li>Zestaw startowy: nasz silnik animacji, skrypty renderu i dźwięku, przykładowy odcinek „Baba Jaga”</li><li>Prompty do Claude Code</li></ul>
<p class="tip">Potrzebujesz własnego konta ElevenLabs (lektor) i Claude z Claude Code. Nie są w cenie.</p></div>
{chap}
<section class="ch"><div class="no">Dodatek A</div><h2>Rozbiórka odcinka „Baba Jaga”</h2>
<div class="num"><div><b>148,5 s</b>długość</div><div><b>4 455</b>klatek</div><div><b>36</b>ujęć</div><div><b>35</b>kwestii lektora i postaci</div><div><b>109</b>fragmentów napisów</div><div><b>41</b>zdarzeń dźwiękowych + 6 pętli</div></div>
<table><tr><th>#</th><th>Scena</th><th>Czas</th><th>Kto mówi</th><th>Tekst</th></tr>{brk}</table></section>
<section class="ch"><div class="no">Dodatek B</div><h2>Prompty do Claude Code</h2>
<p>Tak prosimy Claude Code o kolejne etapy. Wklej, zmieniając nazwy na swoje.</p>
<pre>1. Napisz scenariusz legendy o [STWÓR] według kręgosłupa z rozdziału 2: 34–38 scen po 2,4–3,6 s, jedna kwestia lektora na scenę, znaczniki emocji ElevenLabs v3, zakończenie ze zwrotem w ostatnich 10 s.</pre>
<pre>2. W katalogu film/[NAZWA] przygotuj scenes.js i config.py na wzór film/leg7. Najpierw postać [STWÓR] w zbliżeniu (funkcja jak jagaFace) i pokaż mi kadr testowy.</pre>
<pre>3. Zrób podgląd bez lektora (PREVIEW_NO_VOICE = True), wyrenderuj i pokaż arkusz kadrów co 3 s. Sprawdź ciągłość miejsca, czy napisy nie zasłaniają twarzy i zgodność tekstu z obrazem.</pre>
<pre>4. Nagraj lektora (PREVIEW_NO_VOICE = False), zbuduj film, nałóż korekcję kolorów w RGB i zrób miniaturkę z twarzą stwora oraz opis z hasztagami.</pre>
<p style="margin-top:24px;color:#5b6270;font-size:9pt">Zastrzeżenie: poradnik uczy tworzenia filmów. Nie gwarantuje wyświetleń, obserwujących ani zarobków. Wyniki zależą od Twojej pracy, treści i zasad platform. Nie jesteśmy powiązani z TikTokiem, ElevenLabs ani Anthropic.</p></section>
</body></html>"""
open(os.path.join(D, 'poradnik.html'), 'w').write(H)
js = f"""const {{ chromium }} = require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://{D}/poradnik.html');await p.waitForTimeout(800);await p.pdf({{path:'{D}/Warsztat_Grozy_poradnik.pdf',format:'A4',printBackground:true}});await b.close();}})();"""
open(os.path.join(D, '_pdf.js'), 'w').write(js)
subprocess.run(['node', os.path.join(D, '_pdf.js')], check=True)
print('PDF gotowy')
