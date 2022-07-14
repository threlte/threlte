<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { useProgress } from '@threlte/extras'
	import { tweened } from 'svelte/motion'
	import { fade } from 'svelte/transition'
	import Scene from './Scene.svelte'

	const { progress } = useProgress()

	const tweenedProgress = tweened($progress, {
		duration: 800
	})
	$: tweenedProgress.set($progress)
</script>

{#if $tweenedProgress < 1}
	<div
		transition:fade|local={{
			duration: 200
		}}
		class="absolute w-full h-full top-0 left-0 bg-white flex flex-col gap-1 items-center justify-center text-black"
	>
		<p class="text-sm !m-0">Loading</p>
		<div class="w-1/3 h-[10px] border border-black relative">
			<div class="h-full bg-black" style="width: {$tweenedProgress * 100}%" />
		</div>
	</div>
{/if}

<Canvas>
	<Scene />
</Canvas>
