<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { NoToneMapping } from 'three'
  import { Grid, OrbitControls } from '@threlte/extras'
  import { useTweakpane } from '$lib/useTweakpane'

  let innerWidth = 0
  const { action, addInput } = useTweakpane({
    title: 'Align',
    expanded: true
  })

  const width = addInput({
    label: 'Window Width',
    value: 600,
    params: {
      min: 300,
      max: 600
    }
  })

  const height = addInput({
    label: 'Window Height',
    value: 600,
    params: {
      min: 300,
      max: 600
    }
  })
</script>

<div use:action />

<svelte:window bind:innerWidth />

<div class="relative h-screen w-screen">
  <Canvas toneMapping={NoToneMapping}>
    <Grid
      position.z={-10.1}
      plane="xy"
      gridSize={800}
      cellColor="#0A0F19"
      sectionColor="#481D1A"
      sectionSize={100}
      cellSize={10}
      fadeStrength={0}
    />

    <T.OrthographicCamera
      makeDefault
      position.z={1000}
      position.x={500}
      position.y={500}
      zoom={innerWidth / 1200}
    >
      <OrbitControls />
    </T.OrthographicCamera>

    <Scene
      windowWidth={$width}
      windowHeight={$height}
    />
  </Canvas>
</div>
