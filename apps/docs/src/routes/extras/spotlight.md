---
title: Spotlight
---

<script lang="ts">
import Wrapper from '$examples/extras/spotlight/Wrapper.svelte'
</script>

!!!module_summary title=Spotlight|sourcePath=/components/Spotlight/Spotlight.svelte|name=Spotlight|from=extras|type=component
The `<Spotlight>` component is ported from [drei's Spotlight](https://drei.pmnd.rs/?path=%2Fstory%2Fstaging-spotlight--spotlight-st).

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../examples/extras/spotlight/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/spotlight/Scene.svelte)
&&&

!!!


### Example <!-- omit in toc -->

```svelte
<script>
  import { Spotlight } from '@threlte/extras'
</script>

<Spotlight />
```

### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
interactive: boolean = false
ignorePointer: boolean = false

depthBuffer: DepthTexture| undefined = new DepthTexture(width * dpr, height * dpr)
opacity: number| undefined = 1
attenuation: number| undefined = 5
anglePower: number| undefined = 5
color: string | number| undefined = 'white'
cameraNear: number| undefined = 0.1
cameraFar: number| undefined = 10
resolution: [number, number]| undefined = [width * dpr, height * dpr]

radiusTop: number| undefined = 0.1
radiusBottom: number| undefined = 1.05
distance: number| undefined = 5
angle: number| undefined = 0.15
```

### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
```

### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```
