---
"@threlte/core": patch
---

Sanitize attrs before geometry.dispose. This fixes crash when attach cleanup leaves an attribute undefined which threejs cannot handle.