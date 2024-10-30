<script lang="ts">
  import type { ScreenSpaceProps } from './ScreenSpace'
  import { Group } from 'three'
  import { T, useCamera, useTask } from '@threlte/core'

  let { depth = 1, ref = $bindable(new Group()), children, ...props }: ScreenSpaceProps = $props()

  const { camera } = useCamera()

  useTask(() => {
    ref.position.copy(camera.current.position)
    ref.quaternion.copy(camera.current.quaternion)
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
