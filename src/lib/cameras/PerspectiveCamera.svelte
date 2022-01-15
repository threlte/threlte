<script lang="ts">
	import { PerspectiveCamera } from 'three'
	import OrientableObject from '../internal/OrientableObject.svelte'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'
	import { useThrelteRoot } from '../lib/useThrelteRoot'
	import { useResize } from '../hooks/useResize'

	const { size, render } = useThrelte()

	export let near = defaults.camera.near
	export let far = defaults.camera.far
	export let fov = defaults.camera.fov
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let useCamera = true
	export let lookAt: PositionProp | undefined = undefined

	export const camera = new PerspectiveCamera(fov, size.width / size.height, near, far)

	const rootCtx = useThrelteRoot()

	$: if (useCamera) rootCtx.setCamera(camera)

	useResize(() => {
		camera.aspect = size.width / size.height
		camera.updateProjectionMatrix()
	}, rootCtx.resizeOpts)

	$: {
		camera.fov = fov
		camera.near = near
		camera.far = far
		camera.updateProjectionMatrix()
		render()
	}
</script>

<TransformableObject object={camera} {position} {rotation} {scale} />
<OrientableObject object={camera} {lookAt} listen={[position, rotation, scale]} />
<HierarchicalObject object={camera}>
	<slot />
</HierarchicalObject>
