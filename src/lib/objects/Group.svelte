<script lang="ts">
	import Object3DInstance from '../instanced/Object3DInstance.svelte'
	import { Group } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'

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

	export const group = new Group()
</script>

<Object3DInstance
	object={group}
	{position}
	{scale}
	{rotation}
	{frustumCulled}
	{renderOrder}
	{viewportAware}
	{castShadow}
	{receiveShadow}
	bind:inViewport
	on:viewportenter
	on:viewportleave
>
	<slot />
</Object3DInstance>
