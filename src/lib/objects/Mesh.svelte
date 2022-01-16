<script lang="ts">
	import MeshInstance from '../instanced/MeshInstance.svelte'
	import type { BufferGeometry } from 'three'
	import { Material, Mesh } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let interactive: boolean = false
	export let ignorePointerEvents: boolean = false

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder

	export let geometry: BufferGeometry
	export let material: Material = defaults.mesh.material()

	export const mesh = new Mesh(geometry, material)
</script>

<MeshInstance
	on:click
	on:contextmenu
	on:pointerup
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	{mesh}
	{position}
	{scale}
	{rotation}
	{interactive}
	{ignorePointerEvents}
	{viewportAware}
	{castShadow}
	{receiveShadow}
	{frustumCulled}
	{renderOrder}
	bind:inViewport
>
	<slot />
</MeshInstance>
