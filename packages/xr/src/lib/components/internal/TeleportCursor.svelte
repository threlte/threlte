<script lang="ts">
  import { spring } from 'svelte/motion'
  import { Group, Matrix3, Vector3 } from 'three'
  import { T, useTask } from '@threlte/core'
  import { teleportIntersection } from '../../internal/stores'
  import Cursor from './Cursor.svelte'

  export let handedness: 'left' | 'right'

  const ref = new Group()
  const vec3 = new Vector3()
  const normalMatrix = new Matrix3()
  const worldNormal = new Vector3()

  $: intersection = teleportIntersection[handedness]

  const { start, stop } = useTask(
    () => {
      if (intersection.current === undefined) return

      const { point, face, object } = intersection.current
      ref.position.lerp(point, 0.4)

      if (face) {
        normalMatrix.getNormalMatrix(object.matrixWorld)
        worldNormal.copy(face.normal).applyMatrix3(normalMatrix).normalize()
        ref.lookAt(vec3.addVectors(point, worldNormal))
      }
    },
    {
      autoStart: false
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
