<script lang="ts">
	import { Object3D } from 'three'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export const object = new Object3D()
</script>

<TransformableObject {object} {position} {rotation} {scale} />
<HierarchicalObject {object}>
	<slot />
</HierarchicalObject>
