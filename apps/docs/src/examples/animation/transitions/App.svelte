<script lang="ts">
	import { useTweakpane } from '../../utils/useTweakpane'
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { buttonIdle, buttonWalk, buttonRun } from './state'

	const { addButton, action } = useTweakpane()

	addButton({
		title: 'Idle',
		onClick: () => {
			$buttonIdle = !$buttonIdle
		}
	})

	addButton({
		title: 'Walk',
		onClick: () => {
			$buttonWalk = !$buttonWalk
		}
	})

	addButton({
		title: 'Run',
		onClick: () => {
			$buttonRun = !$buttonRun
		}
	})
</script>

<div use:action />

<Canvas>
	<Scene />
</Canvas>
