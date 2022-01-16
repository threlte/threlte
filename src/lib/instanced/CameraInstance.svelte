<script lang="ts">
	import { useThrelteRoot } from '../lib/useThrelteRoot'

	import type { Camera } from 'three'
	import OrientableObject from '../internal/OrientableObject.svelte'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import Object3DInstance from './Object3DInstance.svelte'
	import { useThrelte } from '../lib/useThrelte'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export let lookAt: PositionProp | undefined = undefined

	export let camera: Camera

	export let useCamera = true

	const { setCamera } = useThrelteRoot()
	const { render } = useThrelte()

	$: if (useCamera) {
		setCamera(camera)
		render()
	}
</script>

<OrientableObject object={camera} {lookAt} listen={[position, rotation, scale]} />
<Object3DInstance {position} {scale} {rotation} object={camera} {viewportAware} bind:inViewport>
	<slot />
</Object3DInstance>
