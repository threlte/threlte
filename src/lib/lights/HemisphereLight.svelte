<script lang="ts">
	import { convertColorRepresentationToColor } from '../lib/colors'
	import { ColorRepresentation, HemisphereLight } from 'three'
	import { useThrelte } from '../hooks/useThrelte'
	import { useThrelteRoot } from '../hooks/useThrelteRoot'
	import LightInstance from '../instances/LightInstance.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../types/types'

	// LightInstance
	export let position: PositionProp = defaults.lights.hemisphereLight.position
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport = defaults.object3d.inViewport
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let intensity = defaults.lights.hemisphereLight.intensity
	// prop color is replaced by prop skyColor

	// self
	export let skyColor: ColorRepresentation = defaults.lights.hemisphereLight.skyColor
	export let groundColor: ColorRepresentation = defaults.lights.hemisphereLight.groundColor

	export const light = new HemisphereLight(skyColor, groundColor, intensity)

	const { render } = useThrelte()
	const { linear } = useThrelteRoot()

	$: {
		light.groundColor = convertColorRepresentationToColor(groundColor, linear)
		render('HemisphereLight: props changed')
	}
</script>

<LightInstance
	{light}
	lookAt={undefined}
	{position}
	{scale}
	{rotation}
	castShadow={false}
	receiveShadow={false}
	{frustumCulled}
	{renderOrder}
	{viewportAware}
	bind:inViewport
	on:viewportenter
	on:viewportleave
	color={skyColor}
	{intensity}
>
	<slot />
</LightInstance>
