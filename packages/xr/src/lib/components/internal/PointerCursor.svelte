<script lang="ts">
  import { Group, Vector3, Matrix3 } from 'three'
  import { T, useTask } from '@threlte/core'
  import { pointerIntersection, pointerState } from '../../internal/stores'
  import Cursor from './Cursor.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    handedness: 'left' | 'right'
    children?: Snippet
  }

  let { handedness, children }: Props = $props()

  const ref = new Group()
  const vec3 = new Vector3()
  const normalMatrix = new Matrix3()
  const worldNormal = new Vector3()

  let hovering = $derived($pointerState[handedness].hovering)
  let intersection = $derived(pointerIntersection[handedness])

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

  $effect.pre(() => {
    if (hovering) {
      ref.position.copy(intersection.current!.point)
      start()
    } else {
      stop()
    }
  })
</script>

<T
  is={ref}
  visible={hovering}
>
  {#if children}
    {@render children()}
  {:else}
    <Cursor />
  {/if}
</T>
