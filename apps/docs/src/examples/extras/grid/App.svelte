<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import { useTweakpane } from '$lib/useTweakpane'
  import Scene from './Scene.svelte'
  import { PlaneGeometry } from 'three'
  import { createNoise2D } from 'simplex-noise'

  const { pane, action, addInput } = useTweakpane({
    title: 'Grid',
    expanded: false
  })

  const cellFolder = pane.addFolder({
    title: 'Cell settings'
  })
  const cellSize = addInput({
    label: 'Cell size',
    value: 1,
    params: {
      step: 1,
      min: 1,
      max: 5
    },
    parent: cellFolder
  })
  const cellColor = addInput({
    label: 'Cell color',
    value: `#ccc`,
    parent: cellFolder
  })

  const cellThickness = addInput({
    label: 'Cell thickness',
    value: 1.4,
    params: {
      step: 0.1,
      min: 1,
      max: 10
    },
    parent: cellFolder
  })

  const sectionFolder = pane.addFolder({
    title: 'Section settings'
  })

  const sectionSize = addInput({
    label: 'Section size',
    value: 5,
    params: {
      step: 1,
      min: 1,
      max: 50
    },
    parent: sectionFolder
  })
  const sectionColor = addInput({
    label: 'Section color',
    value: `#FF3E00`,
    parent: sectionFolder
  })
  const sectionThickness = addInput({
    label: 'Section thickness',
    value: 2,
    params: {
      step: 0.1,
      min: 1,
      max: 10
    },

    parent: sectionFolder
  })

  const generalFolder = pane.addFolder({
    title: 'General settings'
  })

  const gridSize1 = addInput({
    label: 'Grid size1',
    value: 20,
    params: {
      step: 1,
      min: 1,
      max: 100
    },

    parent: generalFolder
  })
  const gridSize2 = addInput({
    label: 'Grid size2',
    value: 20,
    params: {
      step: 1,
      min: 1,
      max: 100
    },
    parent: generalFolder
  })

  const plane = addInput({
    label: 'plane',
    value: 'xz',
    params: {
      options: {
        xzy: 'xz',
        xyz: 'xy',
        zyx: 'zy'
      }
    },
    parent: generalFolder
  })
  $: planeTyped = $plane as 'xz' | 'xy' | 'zy'

  const followCamera = addInput({
    label: 'followCamera',
    value: false,

    parent: generalFolder
  })

  const infiniteGrid = addInput({
    label: 'infiniteGrid',
    value: false,
    parent: generalFolder
  })

  const fadeDistance = addInput({
    label: 'fadeDistance',
    value: 100,
    params: {
      step: 10,
      min: 10,
      max: 400
    },

    parent: generalFolder
  })

  const backGroundColor = addInput({
    label: 'Background color',
    value: `#003Eff`,
    parent: generalFolder
  })
  const backgroundOpacity = addInput({
    label: 'Background opacity',
    value: 0.0,
    params: {
      step: 0.01,
      min: 0,
      max: 1
    },

    parent: generalFolder
  })

  const fadeStregth = addInput({
    label: 'fadeStregth',
    value: 1,
    params: {
      step: 0.1,
      min: 0,
      max: 20
    },

    parent: generalFolder
  })

  const gridGeometry = addInput({
    label: 'gridGeometry',
    value: 'default',
    params: {
      options: {
        plane: 'default',
        terrain: 'Terrain'
      }
    },
    parent: generalFolder
  })

  const typeFolder = pane.addFolder({
    title: 'Types of grid'
  })

  const gridType: any = addInput({
    label: 'gridtype',
    value: 'polar',
    params: {
      options: {
        grid: 'grid',
        lines: 'lines',
        circular: 'circular',
        polar: 'polar'
      }
    },
    parent: typeFolder
  })

  const linesAxis = addInput({
    label: 'linesAxis (lines)',
    value: 'x',
    params: {
      options: {
        x: 'x',
        y: 'y',
        z: 'z'
      }
    },

    parent: typeFolder
  })

  const maxRadius = addInput({
    label: 'maxRadius (circular & polar)',
    value: 10,
    params: {
      step: 1,
      min: 0,
      max: 15
    },

    parent: typeFolder
  })

  const cellDividers = addInput({
    label: 'cell dividers (polar)',
    value: 6,
    params: {
      step: 1,
      min: 0,
      max: 18
    },

    parent: typeFolder
  })

  const sectionDividers = addInput({
    label: 'section dividers (polar)',
    value: 2,
    params: {
      step: 1,
      min: 0,
      max: 18
    },

    parent: typeFolder
  })

  const terrainSize = 30
  const geometry = new PlaneGeometry(terrainSize, terrainSize, 100, 100)
  const noise = createNoise2D()
  const vertices = geometry.getAttribute('position').array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]
    // @ts-ignore
    vertices[i + 2] = noise(x / 5, y / 5) * 1 + noise(x / 40, y / 40) * 2
  }
  geometry.computeVertexNormals()
</script>

<div use:action />

<div class="relative h-full w-full bg-blue-900">
  <Canvas>
    {#if $gridGeometry == 'Terrain'}
      <Grid
        position.y={-2}
        plane={planeTyped}
        cellColor={$cellColor}
        cellSize={$cellSize}
        cellThickness={$cellThickness}
        sectionColor={$sectionColor}
        sectionSize={$sectionSize}
        sectionThickness={$sectionThickness}
        followCamera={$followCamera}
        infiniteGrid={$infiniteGrid}
        fadeDistance={$fadeDistance}
        fadeStrength={$fadeStregth}
        gridSize={[$gridSize1, $gridSize2]}
        backgroundColor={$backGroundColor}
        backgroundOpacity={$backgroundOpacity}
        type={$gridType}
        axis={$linesAxis}
        maxRadius={$maxRadius}
        cellDividers={$cellDividers}
        sectionDividers={$sectionDividers}
      >
        <T is={geometry} />
      </Grid>
    {:else}
      <Grid
        plane={planeTyped}
        cellColor={$cellColor}
        cellSize={$cellSize}
        cellThickness={$cellThickness}
        sectionColor={$sectionColor}
        sectionSize={$sectionSize}
        sectionThickness={$sectionThickness}
        followCamera={$followCamera}
        infiniteGrid={$infiniteGrid}
        fadeDistance={$fadeDistance}
        fadeStrength={$fadeStregth}
        gridSize={[$gridSize1, $gridSize2]}
        backgroundColor={$backGroundColor}
        backgroundOpacity={$backgroundOpacity}
        type={$gridType}
        axis={$linesAxis}
        maxRadius={$maxRadius}
        cellDividers={$cellDividers}
        sectionDividers={$sectionDividers}
      />
    {/if}

    <Scene />
  </Canvas>
</div>
