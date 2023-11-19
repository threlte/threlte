<script lang="ts">
  import { Group, Vector3 } from 'three'
  import { T, useFrame } from '@threlte/core'
  import { pointerIntersection, pointerState } from '../../internal/stores'
  import Cursor from './Cursor.svelte'

  export let handedness: 'left' | 'right'

  const ref = new Group()
  const vec3 = new Vector3()

  $: hovering = $pointerState[handedness].hovering
  $: intersection = pointerIntersection[handedness]

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

  $: if (hovering) {
    ref.position.copy(intersection.current!.point)
    start()
  } else {
    stop()
  }
</script>

<T
  is={ref}
  visible={hovering}
>
  <slot>
    <Cursor />
  </slot>
</T>
