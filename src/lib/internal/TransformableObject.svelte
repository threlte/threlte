<script lang="ts">
	import type { Object3D } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../hooks/useThrelte'

	export let object: Object3D
	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	const { render } = useThrelte()

	$: if (position) {
		object.position.set(
			position.x ?? defaults.position.x,
			position.y ?? defaults.position.y,
			position.z ?? defaults.position.z
		)
		render()
	}
	$: if (scale) {
		if (typeof scale === 'number') {
			object.scale.set(scale, scale, scale)
		} else {
			object.scale.set(
				scale.x ?? defaults.scale.x,
				scale.y ?? defaults.scale.y,
				scale.z ?? defaults.scale.z
			)
		}
		render()
	}
	$: if (rotation) {
		object.rotation.set(
			rotation.x ?? defaults.rotation.x,
			rotation.y ?? defaults.rotation.y,
			rotation.z ?? defaults.rotation.z,
			rotation.order ?? defaults.rotation.order
		)
		render()
	}
</script>
