<script lang="ts">
	import type { ColorRepresentation } from 'three'
	import { PointLight } from 'three'
	import { defaults } from '../lib/defaults'
	import { useThrelte } from '../lib/useThrelte'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import { convertColorRepresentationToColor } from '../lib/colors'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelteRoot } from '../lib/useThrelteRoot'

	export let color: ColorRepresentation = defaults.lights.pointLight.color
	export let intensity = defaults.lights.pointLight.intensity
	export let distance = defaults.lights.pointLight.distance
	export let decay = defaults.lights.pointLight.decay
	export let power: number | undefined = undefined
	export let shadow:
		| boolean
		| {
				mapSize?: [number, number]
				camera?: { near?: number; far?: number }
				bias?: number
				radius?: number
		  } = false

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export const light = new PointLight(color, intensity, distance, decay)

	const { render } = useThrelte()
	const { linear } = useThrelteRoot()

	$: {
		light.color = convertColorRepresentationToColor(color, linear)
		light.intensity = intensity
		light.distance = distance
		light.decay = decay
		if (power) light.power = power
		render()
	}

	$: {
		if (shadow) {
			const {
				mapSize = [512, 512],
				camera: { near = 0.5, far = 500 } = {},
				bias = 0,
				radius = 1
			} = shadow === true ? {} : shadow
			light.shadow.mapSize.set(mapSize[0], mapSize[1])
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

<TransformableObject object={light} {position} {rotation} {scale} />
<HierarchicalObject object={light}>
	<slot />
</HierarchicalObject>
