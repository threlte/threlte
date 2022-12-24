---
title: Layers
---

!!!module_summary title=Layers|sourcePath=misc/Layers.svelte|name=Layers|from=core|type=component|relatedDocs={[{name:"three.js Layers reference",url:"https://threejs.org/docs/api/en/core/Layers.html"}]}

:::deprecated moveToExtras=true
:::

[Layers](https://threejs.org/#api/en/core/Layers) are one of many ways to manage the visibility of objects in three.js.
The `<Layers>` component assigns all child components the layer memberships you pass to it. Any object that is a member of the same layers the camera is on, is visible.
!!!

### Example <!-- omit in toc -->

```svelte
<script>
  import { T, Layers } from '@threlte/core'
</script>

<!-- Remember to also assign a layer to your camera -->
<Layers layers={1}>
  <T.PerspectiveCamera makeDefault />
</Layers>

<!-- visible if camera is on any layer -->
<Layers layers={'all'}>
  <T.Mesh … />
</Layers>

<!-- visible if camera is on layer 1 -->
<Layers layers={1}>
  <T.Mesh … />
</Layers>

<!-- visible if camera is on layer 0 or 1 -->
<Layers layers={[0, 1]}>
  <T.Mesh … />
</Layers>

<!-- invisible -->
<Layers layers={'none'}>
  <T.Mesh … />
</Layers>
```

### Properties <!-- omit in toc -->

```ts
// required
layers: ThrelteLayers
```

Property `layers` can be:

- any integer from 0 to 31
- an array of any integer from 0 to 31
- `'all'`
- `'none'`

:::admonition type="tip"
TypeScript users will benefit from strong types, JavaScript users should be aware that there is no runtime validation happening.
:::
