<script lang="ts">
	import Object3DInstance from '../instanced/Object3DInstance.svelte'
	import { Object3D } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, ScaleProp, RotationProp } from '../lib/types'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder

	export const object = new Object3D()
</script>

<Object3DInstance
	on:click
	on:contextmenu
	on:pointerup
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	{object}
	{position}
	{scale}
	{rotation}
	{frustumCulled}
	{renderOrder}
	{viewportAware}
	bind:inViewport
>
	<slot />
</Object3DInstance>
