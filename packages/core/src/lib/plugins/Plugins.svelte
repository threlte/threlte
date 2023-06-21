<script lang="ts">
	import {injectPlugin} from "./injectPlugin";
	import type {AnyPlugin} from "./types";

	export let plugins: undefined | null | AnyPlugin[];
	for (const plugin of plugins || []) injectPlugin(plugin);
</script>
