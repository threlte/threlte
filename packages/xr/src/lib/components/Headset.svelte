<script lang="ts">
	import { T, HierarchicalObject, useFrame, useThrelte } from '@threlte/core'
	import { Group } from 'three'
  import { useXR } from '../hooks'

  const { isPresenting } = useXR()
	const { renderer, scene, camera } = useThrelte()
  const { xr } = renderer

	const group = new Group()

  const immersiveFrame = useFrame(() => {
    const space = xr.getReferenceSpace()

    if (space === null) return

    const pose = xr.getFrame().getViewerPose(space)

    if (pose === undefined) return

    const { position, orientation } = pose.transform

    group.position.set(position.x, position.y, position.z)
    group.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
  }, { autostart: false })

  $: if ($isPresenting) {
    immersiveFrame.start()
  } else {
    immersiveFrame.stop()
  }

  const nonImmersiveFrame = useFrame(() => {
    group.position.copy(camera.current.position)
    group.quaternion.copy(camera.current.quaternion)
  }, { autostart: false })

  $: if ($isPresenting === false) {
    nonImmersiveFrame.start()
  } else {
    nonImmersiveFrame.stop()
  }

</script>

<HierarchicalObject
  onChildMount={(child) => { scene.add(child) }}
  onChildDestroy={(child) => { scene.remove(child) }}
>
	<T is={group}>
		<slot />
	</T>
</HierarchicalObject>
