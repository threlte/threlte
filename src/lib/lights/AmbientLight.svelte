<script lang="ts">
	import { AmbientLight, ColorRepresentation } from 'three'
	import LightInstance from '../instances/LightInstance.svelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'

	// LightInstance
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport = defaults.object3d.inViewport
	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let color: ColorRepresentation = defaults.lights.ambientLight.color
	export let intensity = defaults.lights.ambientLight.intensity

	export const light = new AmbientLight(color, intensity)
</script>

<LightInstance
	{light}
	{position}
	{scale}
	{rotation}
	{castShadow}
	{receiveShadow}
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
