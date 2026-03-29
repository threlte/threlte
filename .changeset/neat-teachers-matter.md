---
"@threlte/extras": patch
"@threlte/xr": patch
---

Delegate stopImmediatePropagation on synthetic events to the native DOM event, allowing handlers to block camera controls (e.g. OrbitControls) during drags.
