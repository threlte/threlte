<script lang="ts">
	import type { Object3D } from 'three'
	import { defaults } from '../lib/defaults'
	import type { PositionProp, RotationProp, ScaleProp } from '../lib/types'
	import { useThrelte } from '../hooks/useThrelte'

	export let object: Object3D
	export let position: PositionProp
	export let scale: ScaleProp
	export let rotation: RotationProp
	export let lookAt: PositionProp

	const { render } = useThrelte()

	$: if (position) {
		object.position.set(
			position.x ?? defaults.position.x,
			position.y ?? defaults.position.y,
			position.z ?? defaults.position.z
		)
		render('TransformableObject: position')
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
		render('TransformableObject: scale')
	}
	$: if (rotation) {
		object.rotation.set(
			rotation.x ?? defaults.rotation.x,
			rotation.y ?? defaults.rotation.y,
			rotation.z ?? defaults.rotation.z,
			rotation.order ?? defaults.rotation.order
		)
		render('TransformableObject: rotation')
	}
	$: if (lookAt) {
		object.lookAt(
			lookAt.x ?? defaults.position.x,
			lookAt.y ?? defaults.position.y,
			lookAt.z ?? defaults.position.z
		)
		render('TransformableObject: lookAt')
	}
</script>
