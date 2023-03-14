<script lang="ts">
  import { useTweakpane } from '../../utils/useTweakpane'
  import { Canvas } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import Scene from './Scene.svelte'

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
    value: `#ffffff`,
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

  const axes = addInput({
    label: 'axes',
    value: 'xzy',
    params: {
      options: {
        xzy: 'xzy',
        xyz: 'xyz',
        zyx: 'zyx'
      }
    },
    parent: generalFolder
  })
  $: axisTyped = $axes as 'xzy' | 'xyz' | 'zyx'

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
</script>

<div use:action />

<div class="w-full h-full relative bg-orange-500/20">
  <Canvas
    linear
    flat
  >
    <Grid
      axes={axisTyped}
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
    />

    <!-- Example scene with boxes -->
    <Scene />
  </Canvas>
</div>
