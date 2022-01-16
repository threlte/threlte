<script lang="ts">
	import type { LayerContext } from '$lib/lib/types'

	import { getContext } from 'svelte'
	import type { Object3D } from 'three'
	export let object: Object3D
	const layer = getContext<LayerContext>('threlte-layer')

	$: {
		if ($layer === 'all') {
			object.layers.enableAll()
		} else if ($layer === 'none') {
			object.layers.disableAll()
		} else {
			object.layers.set($layer ?? 0)
		}
	}
</script>
