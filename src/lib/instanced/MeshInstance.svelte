<script lang="ts">
	import type { Mesh } from 'three'
	import InteractiveObject from '../internal/InteractiveObject.svelte'
	import RaycastableObject from '../internal/RaycastableObject.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import Object3DInstance from './Object3DInstance.svelte'

	export let mesh: Mesh

	// Object3DInstance
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined
	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder

	// self
	export let interactive: boolean = false
	export let ignorePointerEvents: boolean = false

	$: {
		if (interactive && ignorePointerEvents) {
			console.warn(
				'An Object cannot ignore pointer events and be interactive at the same time. Interactivity will be dismissed.'
			)
		}
	}
</script>

<Object3DInstance
	object={mesh}
	{position}
	{scale}
	{rotation}
	{castShadow}
	{receiveShadow}
	{frustumCulled}
	{renderOrder}
	{viewportAware}
	on:viewportenter
	on:viewportleave
	bind:inViewport
>
	<slot />
</Object3DInstance>

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
