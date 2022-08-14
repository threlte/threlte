<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { buttonIdle, buttonRun } from './state.svelte'
</script>

<div class="relative h-full">
	<Canvas>
		<Scene />
	</Canvas>
	<div class="pointer-events-none h-full w-full absolute top-0">
		<div class="dropdown pointer-events-auto">
			<label tabindex="0" class="btn m-1">Controls</label>
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<button
						class="btn m-2"
						on:click={() => {
							buttonIdle.dispatch()
						}}>idle</button
					>
				</li>
				<li>
					<button
						class="pointer-events-auto btn m-2"
						on:click={() => {
							buttonRun.dispatch()
						}}>run</button
					>
				</li>
			</ul>
		</div>
	</div>
</div>
