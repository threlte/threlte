<script lang="ts">
  import { spring } from 'svelte/motion'
  import { Group } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { teleportIntersection } from '../../internal/stores'
  import Cursor from './Cursor.svelte'

  export let handedness: 'left' | 'right'

  const ref = new Group()

  $: intersection = teleportIntersection[handedness]
  $: point = $intersection?.point

  const { start, stop } = useFrame(
    () => {
      const { point, normal } = intersection.current!
      ref.position.lerp(point, 0.4)

      const { x, y, z } = normal!
      ref.rotation.set(x, y, z)
    },
    {
      autostart: false
    }
  )

  const size = spring(0.1, { stiffness: 0.2 })

  $: if ($intersection === undefined) {
    size.set(0.1)
    stop()
  } else {
    size.set(1)
    ref.position.copy($intersection.point)
    start()
  }
</script>

<T
  is={ref}
  visible={point !== undefined}
>
  <slot name="teleport-cursor">
    <Cursor
      size={$size}
      thickness={0.015}
    />
  </slot>
</T>
