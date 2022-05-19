---
title: <Canvas>
---

# \<Canvas>

The `<Canvas>` component is the root of your three.js scene.

By default, the `<canvas>` element and the renderer will resize to fit the parent element whenever the window resizes. Provide the property `size` to set a fixed `<canvas>` size.

`<Canvas>` also provides a default camera, located at `{ z: 5 }`.

If `frameloop` is set to `demand` (default) property changes to components and other changes that are picked up by threlte automatically invalidate the current frame.  
If `frameloop` is set to `always` the frameloop always renders.  
If `frameloop` is set to `never` the frameloop must manually be advanced with `useThrelte().advance()`. This is especially useful if you want to debug the frameloop with `debugFrameloop` set to `true`.

###### Properties

```ts
// optional
dpr: number = browser ? window.devicePixelRatio : 1
flat: boolean = false
linear: boolean = false
frameloop: 'always' | 'demand' | 'never' = 'demand'
debugFrameloop: boolean = false
shadows: boolean = true
shadowMapType: THREE.ShadowMapType = THREE.PCFSoftShadowMap
size: { width: number, height: number } | undefined = undefined
rendererParameters: THREE.WebGLRendererParameters | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
ctx: ThrelteContext
rootCtx: ThrelteRootContext
```

:::admonition type="tip"
See [Context Types](/docs/types#context-types) for details
:::
