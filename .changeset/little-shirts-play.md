---
'@threlte/core': patch
---

Validate click events to make sure the last pointerdown event hit the same instance as the click
event did. This heuristic more closely resembles how the DOM works, and prevents accidental clicks
while e.g. using OrbitControls or otherwise dragging on the canvas.
