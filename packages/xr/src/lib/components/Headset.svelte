<script lang="ts">
	import { T, HierarchicalObject, useFrame, useThrelte } from '@threlte/core'
	import { Group } from 'three'
  import { useBaseReferenceSpace } from '../internal/useBaseReferenceSpace'

	const { renderer, scene } = useThrelte()

	const group = new Group()

  const baseReferenceSpace = useBaseReferenceSpace()

	useFrame(() => {
    const space = baseReferenceSpace.current

    if (space === null) return

    const frame = renderer.xr.getFrame()
    const pose = frame.getViewerPose(space)

    if (pose === undefined) return

    const { position, orientation } = pose.transform

    group.position.set(position.x, position.y, position.z)
		group.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w)
	})
</script>

<HierarchicalObject
  onChildMount={(child) => { scene.add(child) }}
  onChildDestroy={(child) => { scene.remove(child) }}
>
	<T is={group}>
		<slot />
	</T>
</HierarchicalObject>
