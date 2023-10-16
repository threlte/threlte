<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'

  const { addInput, action } = useTweakpane()

  const fps = addInput({
    label: 'fps',
    value: 10,
    params: {
      min: 1,
      step: 1,
      max: 60
    }
  })

  const playing = addInput({
    label: 'playing',
    value: true
  })

  const loop = addInput({
    label: 'loop',
    value: true
  })
</script>

<Canvas>
  <Scene
    fps={$fps}
    playing={$playing}
    loop={$loop}
  />
  <T.AmbientLight />
  <T.DirectionalLight />
</Canvas>

<div use:action />
