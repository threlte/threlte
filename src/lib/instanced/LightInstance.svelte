<script lang="ts">
	import { defaults } from '../lib/defaults'
	import type { ColorRepresentation, Light } from 'three'
	import { convertColorRepresentationToColor } from '../lib/colors'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'
	import { useThrelteRoot } from '../lib/useThrelteRoot'
	import Object3DInstance from './Object3DInstance.svelte'

	export let light: Light

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
	export let color: ColorRepresentation = defaults.lights.ambientLight.color
	export let intensity = defaults.lights.ambientLight.intensity

	const { render } = useThrelte()
	const { linear } = useThrelteRoot()

	$: {
		light.intensity = intensity
		light.color = convertColorRepresentationToColor(color, linear)
		render()
	}
</script>

<Object3DInstance
	object={light}
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
