---
title: <AmbientLight>
---

<ModuleSummary
  title="AmbientLight"
  description="This light globally illuminates all objects in the scene equally." 
  name="AmbientLight"
  from="threlte"
  sourceUrl="https://github.com/grischaerbe/threlte/blob/main/src/lib/lights/AmbientLight.svelte"
/>

### Example

```svelte
<script>
  import { AmbientLight } from 'threlte'
</script>

<AmbientLight color={0xd7681c} intensity={0.3} />
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
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
light: THREE.AmbientLight
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
