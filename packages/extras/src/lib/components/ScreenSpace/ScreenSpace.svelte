<script lang="ts">
  import type { ScreenSpaceProps } from './ScreenSpace'
  import { Group } from 'three'
  import { T, useCamera, useTask } from '@threlte/core'

  const { camera: sceneCamera } = useCamera()

  let {
    depth = 1,
    camera,
    ref = $bindable(new Group()),
    children,
    ...props
  }: ScreenSpaceProps = $props()

  useTask(() => {
    const _camera = camera ?? sceneCamera.current
    ref.position.copy(_camera.position)
    ref.quaternion.copy(_camera.quaternion)
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
