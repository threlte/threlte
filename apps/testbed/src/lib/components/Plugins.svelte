<script lang="ts">
	export let plugins: (() => void)[] = [];

	plugins.forEach((plugin) => plugin());
</script>

<slot />
