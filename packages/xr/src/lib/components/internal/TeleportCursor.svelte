<script lang="ts">
  import { spring } from 'svelte/motion'
  import { Group, Vector3 } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { teleportIntersection } from '../../internal/stores'
  import Cursor from './Cursor.svelte'

  export let handedness: 'left' | 'right'

  const ref = new Group()
  const vec3 = new Vector3()

  $: intersection = teleportIntersection[handedness]

  const { start, stop } = useFrame(
    () => {
      if (intersection.current === undefined) return

      const { point, face } = intersection.current
      ref.position.lerp(point, 0.4)

      if (face) {
        ref.lookAt(vec3.addVectors(point, face.normal))
      }
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
  visible={$intersection !== undefined}
>
  <slot>
    <Cursor
      size={$size}
      thickness={0.015}
    />
  </slot>
</T>
