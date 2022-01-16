<script lang="ts">
	import { AmbientLight, ColorRepresentation } from 'three'
	import LightInstance from '../instanced/LightInstance.svelte'
	import { defaults } from '../lib/defaults'

	export let color: ColorRepresentation = defaults.lights.ambientLight.color
	export let intensity = defaults.lights.ambientLight.intensity

	export const light = new AmbientLight(color, intensity)
</script>

<LightInstance {light} {color} {intensity}>
	<slot />
</LightInstance>
