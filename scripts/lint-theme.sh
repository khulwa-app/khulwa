#!/usr/bin/env bash
# lint:theme — greppable guardrails for "styling lives in the theme".
# Checks are single-line heuristics; annotate sanctioned dynamic values with `// theme-lint-allow`.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 2

fail=0
report() { printf '✗ %s\n%s\n\n' "$1" "$2"; fail=1; }

h=$(grep -rn --include='*.tsx' 'style={' modules 2>/dev/null | grep -v 'theme-lint-allow' || true)
[ -n "$h" ] && report "inline style={} in modules (annotate dynamic ones with // theme-lint-allow)" "$h"

h=$(grep -rn --include='*.tsx' 'sx=' modules components 2>/dev/null || true)
[ -n "$h" ] && report "sx= is not allowed in Chakra v3" "$h"

h=$(grep -rEn --include='*.tsx' '#[0-9a-fA-F]{3,8}\b|rgba\(' modules components 2>/dev/null || true)
[ -n "$h" ] && report "raw hex / rgba outside theme/ — use a token" "$h"

h=$(grep -rEn --include='*.tsx' 'IconButton[^>]*\bboxSize=' modules components 2>/dev/null || true)
[ -n "$h" ] && report "boxSize= on IconButton — size via the button recipe" "$h"

h=$(grep -rn --include='*.tsx' 'variant="onGlass' modules components 2>/dev/null || true)
[ -n "$h" ] && report 'variant="onGlass…" is dead — use solid/subtle/surface/outline/ghost' "$h"

h=$(grep -rn --include='*.ts' 'className: "' theme 2>/dev/null || true)
[ -n "$h" ] && report "className: in theme — recipes must not declare className" "$h"

h=$(grep -rni --include='*.ts' --include='*.tsx' 'glass' theme modules components 2>/dev/null || true)
[ -n "$h" ] && report "glass vocabulary is retired — use native bg/fg/border/focusRing tokens" "$h"


h=$(grep -rn --include='*.ts' --include='*.tsx' 'onMesh' theme modules components 2>/dev/null || true)
[ -n "$h" ] && report "onMesh naming is retired — use native tokens (bg/fg/border/bg.raised*/focusRing)" "$h"

h=$(grep -rEn --include='*.ts' --include='*.tsx' '"(sand|sage)\.' theme modules components 2>/dev/null || true)
[ -n "$h" ] && report "sand/sage ramps were deleted in the deep-space flip" "$h"

if [ "$fail" -ne 0 ]; then echo "lint:theme FAILED"; exit 1; fi
echo "lint:theme passed"
