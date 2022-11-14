<script lang="ts">
	export let moveToExtras: boolean = false
</script>

<div
	class="flex flex-row gap-4 items-center text-brand  border-gray-divider border rounded-md p-4 text-base my-8 shadow-lg"
>
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-12 h-12" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><line
				x1="128"
				y1="104"
				x2="128"
				y2="144"
				class="fill-none stroke-current"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="12"
			/><path
				d="M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z"
				fill="none"
				class="fill-none stroke-current"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="12"
			/><circle cx="128" cy="180" r="10" /></svg
		>
	</div>

	<div>
		{#if moveToExtras}
			This module will be moved to <code>@threlte/extras</code> at some point in the future.
		{:else}
			This module is deprecated. You can still use it but it will be removed in the future.
		{/if}

		Please read the <a class="text-brand" href="/core-transition">update notice</a>.
	</div>
</div>
