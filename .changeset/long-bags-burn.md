---
'@threlte/core': patch
---

Fixes a bug where calling `useThrelte().shouldRender()` resets the invalidation flags and makes it impossible to invoke more than once per frame.
