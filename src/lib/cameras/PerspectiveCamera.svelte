<script lang="ts">
	import CameraInstance from '$lib/instanced/CameraInstance.svelte'
	import { PerspectiveCamera } from 'three'
	import { useResize } from '../hooks/useResize'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'
	import { useThrelteRoot } from '../lib/useThrelteRoot'

	// CameraInstance
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport = defaults.object3d.inViewport
	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let lookAt: PositionProp = undefined
	export let useCamera = true

	// self
	export let near = defaults.camera.near
	export let far = defaults.camera.far
	export let fov = defaults.camera.fov

	const { size, render } = useThrelte()
	const { resizeOpts } = useThrelteRoot()

	export const camera = new PerspectiveCamera(fov, size.width / size.height, near, far)

	useResize(() => {
		camera.aspect = size.width / size.height
		camera.updateProjectionMatrix()
	}, resizeOpts)

	$: {
		camera.fov = fov
		camera.near = near
		camera.far = far
		camera.updateProjectionMatrix()
		render()
	}
</script>

<CameraInstance
	{camera}
	{position}
	{scale}
	{rotation}
	{lookAt}
	{useCamera}
	{viewportAware}
	{castShadow}
	{receiveShadow}
	{frustumCulled}
	{renderOrder}
	on:viewportenter
	on:viewportleave
	bind:inViewport
>
	<slot />
</CameraInstance>
