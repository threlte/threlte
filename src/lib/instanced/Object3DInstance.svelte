<script lang="ts">
	import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'

	import type { Object3D } from 'three'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import LayerableObject from '../internal/LayerableObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'

	export let object: Object3D
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	const { render } = useThrelte()

	$: {
		object.castShadow = castShadow
		object.receiveShadow = receiveShadow
		object.frustumCulled = frustumCulled
		object.renderOrder = renderOrder
		render()
	}
</script>

<LayerableObject {object} />
<TransformableObject {object} {position} {rotation} {scale} />
<HierarchicalObject {object}>
	<slot />
</HierarchicalObject>

{#if viewportAware}
	<ViewportAwareObject bind:inViewport {object} on:viewportenter on:viewportleave />
{/if}
