<script lang="ts">
  import { useTweakpane } from '$lib/useTweakpane'
  import { Canvas } from '@threlte/core'
  import { CSM } from '@threlte/extras'
  import Scene from './Scene.svelte'

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
    value: Math.PI
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
      lightDirection={[$lightDirection.x, $lightDirection.y, $lightDirection.z]}
      lightIntensity={$lightIntensity}
      lightColor={$lightColor}
    >
      <Scene />
    </CSM>
  </Canvas>
</div>
