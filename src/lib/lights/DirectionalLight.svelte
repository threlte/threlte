<script lang="ts">
	import LightInstance from '../instances/LightInstance.svelte'
	import type { ColorRepresentation } from 'three'
	import { DirectionalLight } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../hooks/useThrelte'

	// LightInstance
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport = defaults.object3d.inViewport
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let color: ColorRepresentation = defaults.lights.ambientLight.color
	export let intensity = defaults.lights.ambientLight.intensity

	// self
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
		}
		render('DirectionalLight: shadow changed')
	}
</script>

<LightInstance
	{light}
	lookAt={undefined}
	{position}
	{scale}
	{rotation}
	castShadow={!!shadow}
	receiveShadow={false}
	{frustumCulled}
	{renderOrder}
	{viewportAware}
	bind:inViewport
	on:viewportenter
	on:viewportleave
	{color}
	{intensity}
>
	<slot />
</LightInstance>
