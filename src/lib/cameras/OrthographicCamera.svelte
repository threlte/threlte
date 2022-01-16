<script lang="ts">
	import CameraInstance from '../instances/CameraInstance.svelte'
	import { OrthographicCamera } from 'three'
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
	export let zoom = defaults.camera.zoom

	const { size, render } = useThrelte()
	const { setCamera, resizeOpts } = useThrelteRoot()

	export const camera = new OrthographicCamera(
		size.width / -2,
		size.width / 2,
		size.height / 2,
		size.height / -2,
		1,
		1000
	)

	$: if (useCamera) setCamera(camera)

	useResize(() => {
		camera.left = size.width / -2
		camera.right = size.width / 2
		camera.top = size.height / 2
		camera.bottom = size.height / -2
		camera.updateProjectionMatrix()
		render()
	}, resizeOpts)

	$: {
		camera.near = near
		camera.far = far
		camera.zoom = zoom
		camera.updateProjectionMatrix()
		render()
	}
</script>

<CameraInstance
	{camera}
	{position}
	{scale}
	{rotation}
	{castShadow}
	{receiveShadow}
	{frustumCulled}
	{renderOrder}
	{viewportAware}
	bind:inViewport
	on:viewportenter
	on:viewportleave
	{lookAt}
	{useCamera}
>
	<slot />
</CameraInstance>
