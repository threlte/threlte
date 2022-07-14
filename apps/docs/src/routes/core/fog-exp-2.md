---
title: FogExp2
---

!!!module_summary title=FogExp2|sourcePath=misc/FogExp2.svelte|name=FogExp2|from=core|type=component
A `<FogExp2>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { FogExp2 } from 'threlte'
</script>

<FogExp2 color={'#dddddd'} density={0.3} />
```

### Properties <!-- omit in toc -->

```ts
// optional
color: THREE.ColorRepresentation = 0xffffff
density: number | undefined = undefined
```

### Bindings <!-- omit in toc -->

```ts
fog: THREE.FogExp2
```
