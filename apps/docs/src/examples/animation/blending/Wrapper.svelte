<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { buttonIdle, buttonWalk, buttonRun } from './state.svelte'
</script>

<div class="relative h-full">
	<Canvas>
		<Scene />
	</Canvas>
	<div class="pointer-events-none h-full w-full absolute top-0">
		<div class="flex flex-col">
			<div class="pointer-events-auto">
				<button
					class="button"
					on:click={() => {
						console.log("idle button clicked");
						$buttonIdle = !$buttonIdle
					}}>idle</button
				>
				<button
					class="button"
					on:click={() => {
						console.log("walk button clicked");
						$buttonWalk = !$buttonWalk
					}}>walk</button
				>
				<button
					class="button"
					on:click={() => {
						console.log("run button clicked");
						$buttonRun = !$buttonRun
					}}>run</button
				>
			</div>
			<span>Try pressing the s and d keys too</span>
		</div>
	</div>
</div>

<style>
	.button {
		@apply text-black border rounded-xl shadow-xl p-2 m-2 focus:ring-0;
	}
</style>
