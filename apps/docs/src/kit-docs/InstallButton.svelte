<script lang="ts">
	export let bool: boolean
	export let disabled = false
</script>

<button class="btn-sticky" class:active={bool} on:click={() => (bool = !bool)} {disabled}>
	{#if bool}
		<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><polyline
				points="216 72 104 184 48 128"
				fill="none"
				class="stroke-current"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="24"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><line
				x1="200"
				y1="56"
				x2="56"
				y2="200"
				fill="none"
				class="stroke-current"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="24"
			/><line
				x1="200"
				y1="200"
				x2="56"
				y2="56"
				fill="none"
				class="stroke-current"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="24"
			/></svg
		>
	{/if}
	<slot />
</button>
