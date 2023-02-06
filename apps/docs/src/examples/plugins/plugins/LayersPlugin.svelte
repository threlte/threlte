<script lang="ts">
	import { useThrelte, injectPlugin } from '@threlte/core'
	import type { ThrelteLayersContext } from '@threlte/core/src/lib/types/types'
	import { getContext, onDestroy } from 'svelte'
	import { get } from 'svelte/store'
	import type { Object3D } from 'three'

	const isObject3D = (object: any): object is Object3D => {
		return object?.isObject3D
	}

	injectPlugin('layers', () => {
		const layers = getContext<ThrelteLayersContext>('threlte-layers')
		if (!layers) return

		const { invalidate } = useThrelte()

		let currentRef: Object3D
		let previousMask: number

		let currentLayers = get(layers)
		const applyLayers = () => {
			if (!isObject3D(currentRef)) return
			if (currentLayers === 'all') {
				currentRef.layers.enableAll()
			} else if (currentLayers === 'none') {
				currentRef.layers.disableAll()
			} else if (Array.isArray(currentLayers)) {
				for (let index = 0; index < 32; index += 1) {
					const layerIndex = index as typeof currentLayers[number]
					const enabled = currentLayers.includes(layerIndex)
					if (enabled) {
						currentRef.layers.enable(index)
					} else {
						currentRef.layers.disable(index)
					}
				}
			} else if (currentLayers !== undefined) {
				currentRef.layers.set(currentLayers)
			}
			invalidate('Layers plugin')
		}

		const unsubscribe = layers.subscribe((layers) => {
			currentLayers = layers
			applyLayers()
		})
		onDestroy(unsubscribe)

		return {
			onRefChange: (ref) => {
				if (isObject3D(ref)) {
					currentRef = ref
					previousMask = ref.layers.mask
					applyLayers()
					return () => {
						currentRef.layers.mask = previousMask
					}
				}
			}
		}
	})
</script>

<slot />
