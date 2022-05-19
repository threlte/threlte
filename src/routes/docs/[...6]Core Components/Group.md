---
title: <Group>
---

# \<Group>

#### Example

```svelte
<script>
  import { Group, GLTF } from 'threlte'
</script>

<Group position={{ x: 5 }}>
  <GLTF url={'/models/modelA.glb'} />
  <GLTF url={'/models/modelB.glb'} />
</Group>
```

#### Properties

```ts
// optional
id: string = ''
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
group: THREE.Group
```

#### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
