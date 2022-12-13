---
title: Environment
---

<script lang="ts">
import Example from '$examples/extras/helper-grid/App.svelte'
</script>

!!!module_summary title="Helper Grid"|sourcePath=components/HelperGrid/HelperGrid.svelte|name="Helper Grid"|from=extras|type=component}

Helper grid with line thickness adjustment.

<ExampleWrapper playgroundHref="/extras/helper-grid">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/helper-grid/App.svelte)

</div>
</ExampleWrapper>

!!!

### Usage


### Properties

```ts
  axes?: 'xzy' | 'xyz' | 'zyx' = 'xzy'
  cellColor?: ColorRepresentation = '#000000'
  cellSize?: number = 1
  cellThickness?: number = 1
  sectionColor?: ColorRepresentation = '#0000ee'
  sectionSize?: number = 10
  sectionThickness?: number = 2
  gridSize?: number | [number, number] = [20,20]
  followCamera?: boolean = false
  infiniteGrid?: boolean = false
  fadeDistance?: number = 100
  fadeStrength?: number = 1
```
