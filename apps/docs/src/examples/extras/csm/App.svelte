<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'
  import { CSM } from '@threlte/extras'

  const { addInput, action } = useTweakpane({
    title: 'Csm',
    expanded: true
  })

  const enabled = addInput({
    label: 'CSM enabled',
    value: true
  })

  const lightDirection = addInput({
    label: 'lightDirection',
    value: { x: 1, y: -1, z: 1 }
  })

  const lightIntensity = addInput({
    label: 'lightIntensity',
    value: 3
  })

  const lightColor = addInput({
    label: 'lightColor',
    value: '#fffceb'
  })
</script>

<div use:action />

<div class="relative h-full w-full ">
  <Canvas>
    <CSM
      enabled={$enabled}
      lightDirection={$lightDirection}
      lightIntensity={$lightIntensity}
      lightColor={$lightColor}
    >
      <Scene />
    </CSM>
  </Canvas>
</div>
