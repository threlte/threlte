<script lang="ts">
	import type { Camera } from 'three'
	import OrientableObject from '../internal/OrientableObject.svelte'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../hooks/useThrelte'
	import { useThrelteRoot } from '../hooks/useThrelteRoot'
	import Object3DInstance from './Object3DInstance.svelte'

	export let camera: Camera

	// Object3DInstance
	export let position: PositionProp
	export let scale: ScaleProp
	export let rotation: RotationProp
	export let viewportAware: boolean
	export let inViewport: boolean
	export let castShadow: boolean
	export let receiveShadow: boolean
	export let frustumCulled: boolean
	export let renderOrder: number
	export let lookAt: PositionProp

	// self
	export let useCamera: boolean

	const { setCamera } = useThrelteRoot()
	const { render } = useThrelte()

	$: if (useCamera) {
		setCamera(camera)
		render()
	}
</script>

<OrientableObject object={camera} {lookAt} listen={[position, rotation, scale]} />
<Object3DInstance
	object={camera}
	{lookAt}
	{castShadow}
	{receiveShadow}
	{frustumCulled}
	{renderOrder}
	{position}
	{scale}
	{rotation}
	{viewportAware}
	on:viewportenter
	on:viewportleave
	bind:inViewport
>
	<slot />
</Object3DInstance>
