---
title: Group
---

!!!module_summary title=Group|sourcePath=objects/Group.svelte|name=Group|from=core|type=component
This is almost identical to an [`<Object3D>`](/core/object3d). Its purpose is to make working with groups of objects syntactically clearer.
!!!

### Example

```svelte
<script>
  import { Group, GLTF } from 'threlte'
</script>

<Group position={{ x: 5 }}>
  <GLTF url={'/models/modelA.glb'} />
  <GLTF url={'/models/modelB.glb'} />
</Group>
```

### Properties

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

### Bindings

```ts
inViewport: boolean
group: THREE.Group
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
