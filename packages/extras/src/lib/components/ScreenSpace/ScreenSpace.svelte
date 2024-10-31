<script lang="ts">
  import { T, useCamera, useTask } from '@threlte/core'
  import { Group, Quaternion, Vector3 } from 'three'
  import type { ScreenSpaceProps } from './ScreenSpace'

  let {
    depth = 1,
    camera,
    ref = $bindable(new Group()),
    children,
    ...props
  }: ScreenSpaceProps = $props()

  const { camera: sceneCamera } = useCamera()

  const worldPosition = new Vector3()
  const parentWorldQuaternion = new Quaternion()
  const worldQuaternion = new Quaternion()

  useTask(() => {
    const parent = ref.parent
    if (!parent) return

    const _camera = camera ?? sceneCamera.current
    _camera.getWorldPosition(worldPosition)
    _camera.getWorldQuaternion(worldQuaternion)

    // Convert world position to local position
    parent.worldToLocal(worldPosition)
    ref.position.copy(worldPosition)

    // Convert world quaternion to local quaternion
    parent.getWorldQuaternion(parentWorldQuaternion)
    const localQuaternion = worldQuaternion.premultiply(parentWorldQuaternion.invert())
    ref.quaternion.copy(localQuaternion)
  })
</script>

<T
  is={ref}
  {...props}
>
  <T.Group position.z={depth}>
    {@render children?.({ ref })}
  </T.Group>
</T>
