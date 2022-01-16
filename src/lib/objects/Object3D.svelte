<script lang="ts">
	import Object3DInstance from '../instances/Object3DInstance.svelte'
	import { Object3D } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../types/types'

	// Object3DInstance
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport = defaults.object3d.inViewport
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let lookAt: PositionProp = undefined

	export const object = new Object3D()
</script>

<Object3DInstance
	{lookAt}
	{object}
	{position}
	{scale}
	{rotation}
	{frustumCulled}
	{renderOrder}
	castShadow={false}
	receiveShadow={false}
	{viewportAware}
	bind:inViewport
	on:viewportenter
	on:viewportleave
>
	<slot />
</Object3DInstance>
