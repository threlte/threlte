<script lang='ts'>
  import { Canvas } from '@threlte/core'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'

  const { action, addInput } = useTweakpane({
    title: 'Teleport objects',
		expanded: true
	})

  const showSurfaces = addInput({
		label: 'Show teleport surfaces',
		value: false,
	})

  const showBlockers = addInput({
		label: 'Show teleport blockers',
		value: false,
	})

</script>

<div use:action />

<Canvas>
  <Scene
    {showSurfaces}
    {showBlockers}
  />
</Canvas>

<VRButton />
