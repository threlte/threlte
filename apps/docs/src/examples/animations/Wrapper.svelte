<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

	let key :string;

	function handleKeydown(event:KeyboardEvent) {
		key = event.key;
	}
</script>

<svelte:window on:keydown|preventDefault={handleKeydown}/>

<Canvas>
  <Scene />
</Canvas>
<div>
	{#if key}
		<kbd class="scale-50">{key === ' ' ? 'Space' : key}</kbd>
	{:else}
		<p>Focus this window and press any key</p>
	{/if}
</div>

<style>
	div {
		position: absolute;
		top: 0%;
		display: flex;
		height: 100%;
		width: 100%;
		text-align: center;
		flex-direction: column;
		margin: 0.5rem;
		justify-content: flex-start;
		align-items: flex-start;
	}

	kbd {
		background-color: #eee;
		border-radius: 4px;
		font-size: 6em;
		padding: 0.2em 0.5em;
		border-top: 5px solid rgba(255,255,255,0.5);
		border-left: 5px solid rgba(255,255,255,0.5);
		border-right: 5px solid rgba(0,0,0,0.2);
		border-bottom: 5px solid rgba(0,0,0,0.2);
		color: #555;
	}
</style>
