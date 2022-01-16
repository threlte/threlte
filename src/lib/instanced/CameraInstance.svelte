<script lang="ts">
	import type { Camera } from 'three'
	import OrientableObject from '../internal/OrientableObject.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'
	import { useThrelteRoot } from '../lib/useThrelteRoot'
	import Object3DInstance from './Object3DInstance.svelte'

	export let camera: Camera

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
	export let lookAt: PositionProp | undefined = undefined
	export let useCamera = true

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
