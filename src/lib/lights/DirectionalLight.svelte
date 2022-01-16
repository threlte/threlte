<script lang="ts">
	import LightInstance from '$lib/instanced/LightInstance.svelte'
	import type { ColorRepresentation } from 'three'
	import { DirectionalLight } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export let color: ColorRepresentation = defaults.lights.directionalLight.color
	export let intensity = defaults.lights.directionalLight.intensity

	export let shadow:
		| boolean
		| {
				mapSize?: [number, number]
				camera?: {
					left?: number
					right?: number
					top?: number
					bottom?: number
					near?: number
					far?: number
				}
				bias?: number
				radius?: number
		  } = false

	export const light = new DirectionalLight(color, intensity)

	const { render } = useThrelte()

	$: {
		if (shadow) {
			const {
				mapSize = [512, 512],
				camera: { left = -5, bottom = -5, right = 5, top = 5, near = 0.5, far = 500 } = {},
				bias = 0,
				radius = 1
			} = shadow === true ? {} : shadow
			light.shadow.mapSize.set(mapSize[0], mapSize[1])
			light.shadow.camera.left = left
			light.shadow.camera.top = top
			light.shadow.camera.right = right
			light.shadow.camera.bottom = bottom
			light.shadow.camera.near = near
			light.shadow.camera.far = far
			light.shadow.bias = bias
			light.shadow.radius = radius
			light.castShadow = true
		} else {
			light.castShadow = false
		}
		render()
	}
</script>

<LightInstance
	{light}
	{position}
	{scale}
	{rotation}
	{viewportAware}
	{color}
	{intensity}
	bind:inViewport
>
	<slot />
</LightInstance>
