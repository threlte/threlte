<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '../../utils/useTweakpane'
  import { animationPlaying } from './state'

  // add tweakpane to show or hide the terrain collision mesh
  const { action, addButton } = useTweakpane()

  addButton({
    title: 'toggle',
    label: 'Animation',
    onClick: () => {
      $animationPlaying = !$animationPlaying
    }
  })
</script>

<div use:action />

<Canvas>
  <Scene />
</Canvas>
