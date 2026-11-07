#!/bin/bash
# Pełny build odcinka:  ./build.sh odc2
# narracja -> oś czasu -> efekty -> obraz -> dźwięk -> MP4 gotowy na TikToka (+ lekka wersja)
set -e
cd "$(dirname "$0")"
EP=${1:-odc1}
mkdir -p $EP/out
[ -f $EP/timeline.js ] || python3 narr.py $EP
python3 sfx.py $EP
EP=$EP node render.js cues
EP=$EP node render.js video 4
python3 audio.py $EP
ffmpeg -y -v error -i $EP/out/video_noaudio.mp4 -i $EP/out/audio.wav -map 0:v -map 1:a -vf "hqdn3d=3:3:6:6" \
  -c:v libx264 -preset slow -crf 23 -maxrate 2.4M -bufsize 4.8M -pix_fmt yuv420p \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 160k -ar 48000 -shortest -movflags +faststart $EP/out/final.mp4
echo "Gotowe: $(pwd)/$EP/out/final.mp4"
