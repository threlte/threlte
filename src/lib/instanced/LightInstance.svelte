<script lang="ts">
	import type { ColorRepresentation, Light } from 'three'
	import { convertColorRepresentationToColor } from '../lib/colors'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'
	import { useThrelteRoot } from '../lib/useThrelteRoot'
	import Object3DInstance from './Object3DInstance.svelte'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export let color: ColorRepresentation
	export let intensity: number

	export let light: Light

	const { render } = useThrelte()
	const { linear } = useThrelteRoot()

	$: {
		light.intensity = intensity
		light.color = convertColorRepresentationToColor(color, linear)
		render()
	}
</script>

<Object3DInstance {position} {scale} {rotation} object={light} {viewportAware} bind:inViewport>
	<slot />
</Object3DInstance>
