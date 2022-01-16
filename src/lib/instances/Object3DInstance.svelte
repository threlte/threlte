<script lang="ts">
	import type { Object3D } from 'three'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import LayerableObject from '../internal/LayerableObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../hooks/useThrelte'

	export let object: Object3D

	// TransformableObject
	export let position: PositionProp
	export let scale: ScaleProp
	export let rotation: RotationProp

	// ViewportAwareObject
	export let viewportAware: boolean
	export let inViewport: boolean

	// self
	export let castShadow: boolean
	export let receiveShadow: boolean
	export let frustumCulled: boolean
	export let renderOrder: number

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
