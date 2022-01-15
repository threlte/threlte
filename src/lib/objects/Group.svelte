<script lang="ts">
	import { Group } from 'three'
	import HierarchicalObject from '../internal/HierarchicalObject.svelte'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export const group = new Group()
</script>

<TransformableObject object={group} {position} {rotation} {scale} />
<HierarchicalObject object={group}>
	<slot />
</HierarchicalObject>
