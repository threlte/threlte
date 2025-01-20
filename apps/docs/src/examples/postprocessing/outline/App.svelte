<script lang="ts">
  import CustomRenderer from './CustomRenderer.svelte'
  import Scene from './Scene.svelte'
  import type { Vector3Tuple } from 'three'
  import type { Wall } from './types'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import { Mesh, Shape } from 'three'

  const mesh = new Mesh()

  let paused = $state(false)
  let autoRotate = $state(false)

  const walls: Wall[] = [
    {
      height: 3,
      shape: new Shape()
        .moveTo(3.5, -4.5)
        .lineTo(3.5, -3.5)
        .lineTo(5.5, -3.5)
        .lineTo(5.5, -0.5)
        .lineTo(-2.5, -0.5)
        .lineTo(-2.5, 0.5)
        .lineTo(5.5, 0.5)
        .lineTo(5.5, 3.5)
        .lineTo(-0.5, 3.5)
        .lineTo(-0.5, 4.5)
        .lineTo(6.5, 4.5)
        .lineTo(6.5, -4.5)
    },
    {
      height: 3,
      shape: new Shape()
        .moveTo(-6.5, -4.5)
        .lineTo(-6.5, 4.5)
        .lineTo(-3.5, 4.5)
        .lineTo(-3.5, 3.5)
        .lineTo(-5.5, 3.5)
        .lineTo(-5.5, -3.5)
        .lineTo(0.5, -3.5)
        .lineTo(0.5, -4.5)
    }
  ]

  // where is the mesh going?
  const positions: Vector3Tuple[] = [
    [2, -2, 0],
    [-4, -2, 0],
    [-4, 2, 0],
    [-2, 2, 0],
    [-2, 6, 0],
    [-8, 6, 0],
    [-8, -6, 0],
    [2, -6, 0]
  ]
</script>

<Pane
  position="fixed"
  title="outline effect"
>
  <Checkbox
    bind:value={paused}
    label="paused"
  />
  <Checkbox
    bind:value={autoRotate}
    label="auto rotate camera"
  />
</Pane>

<Canvas>
  <Scene
    play={!paused}
    {autoRotate}
    {mesh}
    {walls}
    {positions}
  />
  <CustomRenderer {mesh} />
</Canvas>
