<script lang="ts">
	import { Object3D, Vector3 } from 'three'
	import { useThrelte } from '../hooks/useThrelte'
	import { defaults } from '../lib/defaults'
	import type { PositionProp } from '../lib/types'

	export let object: Object3D
	export let lookAt: PositionProp | undefined = undefined
	export let listen: any[] = []

	let target = new Vector3()
	const { render } = useThrelte()

	$: if (lookAt && listen) {
		target.set(
			lookAt.x ?? defaults.position.x,
			lookAt.y ?? defaults.position.y,
			lookAt.z ?? defaults.position.z
		)
		object.lookAt(target)
		render()
	}
</script>
