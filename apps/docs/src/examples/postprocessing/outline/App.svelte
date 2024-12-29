<script lang="ts">
  import CustomRenderer from './CustomRenderer.svelte'
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Mesh } from 'three'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import type { Wall } from './types'

  const mesh = new Mesh()

  let paused = $state(false)
  let autoRotate = $state(true)

  const walls: Wall[] = [
    {
      position: [6, 2, 4],
      rotation: [0, 0.5 * Math.PI, 0],
      size: [7, 4, 1]
    },
    {
      position: [-6, 2, 4],
      rotation: [0, 0.5 * Math.PI, 0],
      size: [7, 4, 1]
    },
    {
      position: [-4, 2, 0],
      rotation: [0, 0, 0],
      size: [5, 4, 1]
    },
    {
      position: [4, 2, 0],
      rotation: [0, 0, 0],
      size: [5, 4, 1]
    },
    {
      position: [-3, 2, 7],
      rotation: [0, 0, 0],
      size: [7, 4, 1]
    },
    {
      position: [5, 2, 7],
      rotation: [0, 0, 0],
      size: [3, 4, 1]
    },
    {
      position: [-1, 2, 3.5],
      rotation: [0, 0, 0],
      size: [10, 4, 1]
    }
  ]

  // where is the mesh going?
  const positions: Vector3Tuple[] = [
    [0, 1, -3],
    [0, 1, 1.5],
    [4.7, 1, 1.5],
    [4.7, 1, 5],
    [2, 1, 5],
    [2, 1, 9],
    [8, 1, 9],
    [8, 1, -3]
  ]
</script>

<Pane
  position="fixed"
  name="outline effect"
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
