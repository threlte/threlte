---
title: Fog
---

!!!module_summary title=Fog|sourcePath=misc/Fog.svelte|name=Fog|from=core|type=component
A `<Fog>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { Fog } from 'threlte'
</script>

<Fog color={'#dddddd'} />
```

### Properties <!-- omit in toc -->

```ts
// optional
color: THREE.ColorRepresentation = 0xffffff
near: number | undefined = undefined
far: number | undefined = undefined
```

### Bindings <!-- omit in toc -->

```ts
fog: THREE.Fog
```
