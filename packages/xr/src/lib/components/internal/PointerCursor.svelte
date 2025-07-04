<script
  module
  lang="ts"
>
  import { Group, Vector3, Matrix3 } from 'three'

  const vec3 = new Vector3()
  const normalMatrix = new Matrix3()
  const worldNormal = new Vector3()
</script>

<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { pointerIntersection, pointerState } from '../../internal/stores'
  import Cursor from './Cursor.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    handedness: 'left' | 'right'
    children?: Snippet
  }

  const { handedness, children }: Props = $props()

  const { scene } = useThrelte()
  const ref = new Group()
  const hovering = $derived($pointerState[handedness].hovering)
  const intersection = $derived(pointerIntersection[handedness])

  const { start, stop } = useTask(
    () => {
      if (intersection.current === undefined) {
        return
      }

      const { point, face, object } = intersection.current
      ref.position.lerp(point, 0.4)

      if (face === null || face === undefined) {
        return
      }

      normalMatrix.getNormalMatrix(object.matrixWorld)
      worldNormal.copy(face.normal).applyMatrix3(normalMatrix).normalize()
      ref.lookAt(vec3.addVectors(point, worldNormal))
    },
    {
      autoStart: false
    }
  )

  $effect.pre(() => {
    if (hovering && intersection.current) {
      ref.position.copy(intersection.current?.point)
      start()
    } else {
      stop()
    }
  })
</script>

<T
  is={ref}
  attach={scene}
  visible={hovering}
>
  {#if children}
    {@render children()}
  {:else}
    <Cursor />
  {/if}
</T>
