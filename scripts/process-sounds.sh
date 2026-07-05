#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="assets/sounds"
OUT_DIR="public/sounds"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

I=-20
TP=-1.5
LRA=11
EDGE_DB=1.0

trim_fades() {
  local src="$1" out="$2" dur q1 qlen body bodyn thr
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  q1=$(awk -v d="$dur" 'BEGIN{printf "%.3f", d*0.25}')
  qlen=$(awk -v d="$dur" 'BEGIN{printf "%.3f", d*0.5}')
  body=$(ffmpeg -ss "$q1" -t "$qlen" -i "$src" -af volumedetect -f null - 2>&1 \
    | awk -F'mean_volume: ' '/mean_volume/{print $2}')
  bodyn=${body% dB}
  thr=$(awk -v b="$bodyn" -v m="$EDGE_DB" 'BEGIN{printf "%.1f", b-m}')
  ffmpeg -hide_banner -y -i "$src" -af \
"silenceremove=start_periods=1:start_silence=0:start_threshold=${thr}dB:detection=rms,\
areverse,\
silenceremove=start_periods=1:start_silence=0:start_threshold=${thr}dB:detection=rms,\
areverse" \
    -c:a pcm_s24le "$out"
}

FILES=(
  "fire:2:128k"
  "rain:2:128k"
  "rainy-birds:2:128k"
  "restaurant:2:128k"
  "theta:2:128k"
  "typing:1:96k"
)

mkdir -p "$OUT_DIR"

for entry in "${FILES[@]}"; do
  IFS=":" read -r name ch br <<<"$entry"
  src="$SRC_DIR/$name.ogg"
  out="$OUT_DIR/$name.ogg"
  [ -f "$src" ] || { echo "skip (missing): $src"; continue; }

  echo "==> $name  (ch=$ch  br=$br)"

  loop="$TMP_DIR/$name.wav"
  trim_fades "$src" "$loop"
  src="$loop"

  measure=$(ffmpeg -hide_banner -i "$src" \
    -af "loudnorm=I=$I:TP=$TP:LRA=$LRA:print_format=json" \
    -f null - 2>&1 | awk '/^\{/{f=1} f{print} /^\}/{f=0}')

  read -r mi mtp mlra mth off < <(python3 -c "
import sys, json
d = json.loads('''$measure''')
print(d['input_i'], d['input_tp'], d['input_lra'], d['input_thresh'], d['target_offset'])
")

  ffmpeg -hide_banner -y -i "$src" \
    -af "loudnorm=I=$I:TP=$TP:LRA=$LRA:measured_I=$mi:measured_TP=$mtp:measured_LRA=$mlra:measured_thresh=$mth:offset=$off:linear=true,aresample=48000" \
    -ar 48000 -ac "$ch" -c:a libopus -b:a "$br" -application audio \
    "$out"

  echo "    -> $out  ($(du -h "$out" | cut -f1))"
done

echo "Done. $(ls -1 "$OUT_DIR"/*.ogg 2>/dev/null | wc -l | tr -d ' ') files in $OUT_DIR/"
