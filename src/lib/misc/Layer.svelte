<script lang="ts">
	import type { LayerThrelte, LayerContext } from '../lib/types'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let layer: LayerThrelte

	const layerStore = writable<LayerThrelte | undefined>(layer)
	$: layerStore.set(layer)

	setContext<LayerContext>('threlte-layer', layerStore)
</script>

<slot />
