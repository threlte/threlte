<script lang="ts">
  import { useTweakpane } from '../../utils/useTweakpane'
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'

  const { pane, action } = useTweakpane()

  pane.addBlade({
    view: 'text',
    text: "Use the 'wasd' keys to move around",
    lineCount: 3
  })
</script>

<div use:action />

<Canvas>
  <World>
    <Scene />
  </World>
</Canvas>
