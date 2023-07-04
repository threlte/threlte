<script lang="ts">
	type PluginRegistrator = (() => void);

	export let plugins: undefined | null | PluginRegistrator | PluginRegistrator[];
	for (const plugin of plugins ? (Array.isArray(plugins) ? plugins : [plugins]) : []) plugin();
</script>

<slot/>
