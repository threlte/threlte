<script lang="ts">
	import type { LayerThrelte, ThrelteLayerContext } from '../types/types'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let layer: LayerThrelte

	const layerStore = writable<LayerThrelte | undefined>(layer)
	$: layerStore.set(layer)

	setContext<ThrelteLayerContext>('threlte-layer', layerStore)
</script>

<slot />
