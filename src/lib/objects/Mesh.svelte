<script lang="ts">
	import MeshInstance from '../instances/MeshInstance.svelte'
	import type { BufferGeometry } from 'three'
	import { Material, Mesh } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../types/types'

	// MeshInstance
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined
	export let viewportAware: boolean = false
	export let inViewport = defaults.object3d.inViewport
	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder
	export let interactive: boolean = false
	export let ignorePointerEvents: boolean = false
	export let lookAt: PositionProp = undefined

	// self
	export let geometry: BufferGeometry
	export let material: Material = defaults.mesh.material()

	export const mesh = new Mesh(geometry, material)
</script>

<MeshInstance
	{lookAt}
	{mesh}
	{position}
	{scale}
	{rotation}
	{castShadow}
	{receiveShadow}
	{frustumCulled}
	{renderOrder}
	{interactive}
	{ignorePointerEvents}
	on:click
	on:contextmenu
	on:pointerup
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	{viewportAware}
	bind:inViewport
	on:viewportenter
	on:viewportleave
>
	<slot />
</MeshInstance>
