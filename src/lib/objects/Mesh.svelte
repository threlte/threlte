<script lang="ts">
	import { BufferGeometry, Material, Mesh } from 'three'
	import RaycastableObject from 'threlte/internal/RaycastableObject.svelte'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import InteractiveObject from '../internal/InteractiveObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'

	export let geometry: BufferGeometry
	export let material: Material = defaults.mesh.material()
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder

	export let interactive: boolean = false
	export let ignorePointerEvents: boolean = false

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export const mesh = new Mesh(geometry, material)

	const { render } = useThrelte()

	$: {
		if (interactive && ignorePointerEvents) {
			console.warn(
				'An Object cannot ignore pointer events and be interactive at the same time. Interactivity will be dismissed.'
			)
		}
	}

	$: {
		mesh.castShadow = castShadow
		mesh.receiveShadow = receiveShadow
		mesh.frustumCulled = frustumCulled
		mesh.renderOrder = renderOrder
		render()
	}
</script>

<TransformableObject object={mesh} {position} {rotation} {scale} />
<HierarchicalObject object={mesh}>
	<slot />
</HierarchicalObject>

{#if !ignorePointerEvents}
	<RaycastableObject object={mesh} />

	{#if interactive}
		<InteractiveObject
			object={mesh}
			on:click
			on:contextmenu
			on:pointerup
			on:pointerdown
			on:pointerenter
			on:pointerleave
			on:pointermove
		/>
	{/if}
{/if}

{#if viewportAware}
	<ViewportAwareObject bind:inViewport object={mesh} on:viewportenter on:viewportleave />
{/if}
