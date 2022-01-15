<script lang="ts">
	import { AmbientLight, ColorRepresentation } from 'three'
	import { defaults } from '../lib/defaults'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import { convertColorRepresentationToColor } from '../lib/colors'
	import { useThrelte } from '../lib/useThrelte'
	import { useThrelteRoot } from '../lib/useThrelteRoot'

	export let color: ColorRepresentation = defaults.lights.ambientLight.color
	export let intensity = defaults.lights.ambientLight.intensity

	export const light = new AmbientLight(color, intensity)

	const { render } = useThrelte()
	const { linear } = useThrelteRoot()

	$: {
		light.color = convertColorRepresentationToColor(color, linear)
		light.intensity = intensity
		render()
	}
</script>

<HierarchicalObject object={light}>
	<slot />
</HierarchicalObject>
