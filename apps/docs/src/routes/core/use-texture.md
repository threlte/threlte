---
title: useTexture
---

!!!module_summary title=useTexture|sourcePath=hooks/useTexture.ts|name=useTexture|from=core|type=hook
`useTexture` allows you to easily load textures and automatically convert your textures to the correct color space based on your [settings on the `<Canvas>` component](/components/01-canvas).
!!!

### Usage Without Context

This hook can be called outside of the `<Canvas>` component, but with limitations: To make sure that textures are converted to the correct color space, `useTexture` needs to consume the `<Canvas>` context. If there's no context, it will fall back to keeping your textures untouched.

### Events

`useTexture` also exposes the native `THREE.TextureLoader` events `onLoad`, `onProgress` and `onError`:

```ts
const texture = useTexture('tex.jpg', {
	onError: (error) => {
		console.warn(`An error occured loading the texture: ${error.message}`)
	}
})
```

### Examples <!-- omit in toc -->

```ts
const tex = useTexture('tex.jpg')
// -> THREE.Texture

const [texA, texB] = useTexture(['texA.jpg', 'texB.jpg'])
// -> THREE.Texture[]

const textures = useTexture({ bumpMap: 'bump.jpg', map: 'map.jpg' })
// -> { bumpMap: THREE.Texture, map: THREE.Texture }
const material = new MeshStandardMaterial({ ...textures })
```
