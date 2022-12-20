<script>
	import ConsoleLine from './ConsoleLine.svelte';

	export let logs;
</script>

<div class="container">
	{#each logs as log}
		<ConsoleLine {log} />
	{/each}
</div>
