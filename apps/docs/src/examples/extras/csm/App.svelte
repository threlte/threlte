<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import CSMWrapper from './CSMWrapper.svelte'
  import { useTweakpane } from '$lib/useTweakpane'

  const { addInput, action } = useTweakpane({
    title: 'Csm',
    expanded: true
  })

  const enabled = addInput({
    label: 'CSM enabled',
    value: true
  })
</script>

<div use:action />

<div class="relative h-full w-full ">
  <Canvas>
    <CSMWrapper enabled={$enabled}>
      <Scene />
    </CSMWrapper>
  </Canvas>
</div>
