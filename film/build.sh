#!/bin/bash
# Pełny build odcinka: obraz -> dźwięk -> MP4 gotowy na TikToka
set -e
cd "$(dirname "$0")"
node render.js cues
node render.js video 4
python3 audio.py
ffmpeg -y -v error -i out/video_noaudio.mp4 -i out/audio.wav -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart BLOK94_ODC1.mp4
echo "Gotowe: $(pwd)/BLOK94_ODC1.mp4"
