<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { NoToneMapping } from 'three'
  import { Grid, OrbitControls } from '@threlte/extras'
  import { useTweakpane } from '$lib/useTweakpane'

  let innerWidth = 0
  const { action, addInput } = useTweakpane({
    title: 'Flex',
    expanded: true
  })

  const width = addInput({
    label: 'Window Width',
    value: 800,
    params: {
      min: 450,
      max: 800
    }
  })

  const height = addInput({
    label: 'Window Height',
    value: 800,
    params: {
      min: 450,
      max: 800
    }
  })

  const rows = addInput({
    label: 'Rows',
    value: 5,
    params: {
      step: 1,
      min: 3,
      max: 8
    }
  })

  const columns = addInput({
    label: 'Columns',
    value: 5,
    params: {
      step: 1,
      min: 3,
      max: 8
    }
  })

  const size = addInput({
    label: 'MatCap Size',
    value: 128,
    params: {
      options: {
        '64px': 64,
        '128px': 128,
        '256px': 256,
        '512px': 512,
        '1024px': 1024
      }
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
      rows={$rows}
      columns={$columns}
      size={$size}
    />
  </Canvas>
</div>
