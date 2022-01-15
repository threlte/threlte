<script lang="ts">
	import type { Object3D } from 'three'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import InteractiveObject from '../internal/InteractiveObject.svelte'
	import RaycastableObject from '../internal/RaycastableObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import ViewportAwareObject from '../internal/ViewportAwareObject.svelte'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'

	export let object: Object3D

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let interactive: boolean = false
	export let ignorePointerEvents: boolean = false

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined
</script>

<TransformableObject {object} {position} {rotation} {scale} />
<HierarchicalObject {object}>
	<slot />
</HierarchicalObject>

{#if !ignorePointerEvents}
	<RaycastableObject {object} />

	{#if interactive}
		<InteractiveObject
			{object}
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
	<ViewportAwareObject bind:inViewport {object} on:viewportenter on:viewportleave />
{/if}
