<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core'
	import { Portal } from '@threlte/extras'
	import { Group, Quaternion, Vector3 } from 'three'

	const { renderer, scene } = useThrelte()
	const camera = renderer.xr.getCamera()

	const group = new Group()

	const worldPosition = new Vector3()
	const worldQuaternion = new Quaternion()
	const worldScale = new Vector3()

	useFrame(() => {
		camera.getWorldPosition(worldPosition)
		camera.getWorldQuaternion(worldQuaternion)
		camera.getWorldScale(worldScale)

		group.position.copy(worldPosition)
		group.quaternion.copy(worldQuaternion)
		group.scale.copy(worldScale)
	})
</script>

<Portal object={scene}>
	<T is={group}>
		<slot />
	</T>
</Portal>
