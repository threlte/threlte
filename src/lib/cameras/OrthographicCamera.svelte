<script lang="ts">
	import { OrthographicCamera } from 'three'
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
	export let zoom = defaults.camera.zoom
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let useCamera = true
	export let lookAt: PositionProp | undefined = undefined

	export const camera = new OrthographicCamera(
		size.width / -2,
		size.width / 2,
		size.height / 2,
		size.height / -2,
		1,
		1000
	)

	const rootCtx = useThrelteRoot()

	$: if (useCamera) rootCtx.setCamera(camera)

	useResize(() => {
		camera.left = size.width / -2
		camera.right = size.width / 2
		camera.top = size.height / 2
		camera.bottom = size.height / -2
		camera.updateProjectionMatrix()
		render()
	}, rootCtx.resizeOpts)

	$: {
		camera.near = near
		camera.far = far
		camera.zoom = zoom
		camera.updateProjectionMatrix()
		render()
	}
</script>

<TransformableObject object={camera} {position} {rotation} {scale} />
<OrientableObject object={camera} {lookAt} listen={[position, rotation, scale]} />
<HierarchicalObject object={camera}>
	<slot />
</HierarchicalObject>
