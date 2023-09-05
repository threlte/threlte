<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'

  const { action, addInput } = useTweakpane({
    title: 'Align',
    expanded: true
  })

  const x = addInput({
    label: 'X',
    value: 0,
    params: {
      min: -1,
      max: 1
    }
  })
  const y = addInput({
    label: 'Y',
    value: 0,
    params: {
      min: -1,
      max: 1
    }
  })
  const z = addInput({
    label: 'Z',
    value: 0,
    params: {
      min: -1,
      max: 1
    }
  })

  const precise = addInput({
    label: 'Precise',
    value: false
  })

  const showSphere = addInput({
    label: 'Show Sphere',
    value: true
  })

  const autoAlign = addInput({
    label: 'Auto Align',
    value: true
  })
</script>

<div use:action />

<div class="relative h-full w-full bg-orange-500/20">
  <Canvas>
    <Scene
      x={$x}
      y={$y}
      z={$z}
      precise={$precise}
      showSphere={$showSphere}
      autoAlign={$autoAlign}
    />
  </Canvas>
</div>
