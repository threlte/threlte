---
title: Object3D
---

!!!module_summary title=Object3D|sourcePath=objects/Object3D.svelte|name=Object3D|from=threlte|type=component
!!!

#### Example

You might want to use this component to pass as a reference to other components:

```svelte
<script>
  import { Object3D, PerspectiveCamera } from 'threlte'

  let target
</script>

<PerspectiveCamera lookAt={target} />
<Object3D bind:object={target} />
```

#### Properties

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
```

#### Bindings

```ts
inViewport: boolean
object: THREE.Object3D
```

#### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
