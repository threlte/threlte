---
'@threlte/extras': major
---

`useTexture` is assigning the correct `colorSpace` based on the renderer. Migration: If you rely on a different `colorSpace` in your texture than the renderer is set to, use the option [`transform`](https://threlte.xyz/docs/reference/extras/use-texture#transforming-the-texture) to transform the texture to THREE.NoColorSpace, which used to be the default.
