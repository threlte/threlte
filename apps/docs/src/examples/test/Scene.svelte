<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import Box from './Box.svelte'
  import Camera from './Camera.svelte'

  const { target } = interactivity()

  target.set(document.getElementById('int-target') ?? undefined)

  const pos = spring({ x: 0, z: 0 })
  const setRandomPos = () => {
    pos.set({
      x: Math.random() * 10 - 5,
      z: Math.random() * 10 - 5
    })
  }
</script>

<Camera />

<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[1, 2, 5]} />

<Box
  onclick={setRandomPos}
  position.x={$pos.x}
  position.z={$pos.z}
/>

<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/>
