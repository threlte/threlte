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
  import { untrack } from 'svelte'
  import { pointerIntersection, pointerState } from '../../internal/state.svelte.js'
  import Cursor from './Cursor.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    handedness: 'left' | 'right'
    children?: Snippet
  }

  const { handedness, children }: Props = $props()

  const { scene } = useThrelte()
  const hovering = $derived(pointerState[handedness].hovering)
  const intersection = $derived(pointerIntersection[handedness])

  const ref = new Group()

  const SURFACE_OFFSET = 0.002

  useTask(
    () => {
      if (intersection === undefined) {
        return
      }

      const { point, face, object } = intersection
      ref.position.lerp(point, 0.4)

      if (face === null || face === undefined) {
        return
      }

      normalMatrix.getNormalMatrix(object.matrixWorld)
      worldNormal.copy(face.normal).applyMatrix3(normalMatrix).normalize()

      // Float the reticle just above the surface so it doesn't z-fight
      // with the coplanar face underneath.
      ref.position.addScaledVector(worldNormal, SURFACE_OFFSET)

      ref.lookAt(vec3.addVectors(ref.position, worldNormal))
    },
    {
      running: () => hovering && intersection !== undefined
    }
  )

  // Snap to the hit point on hover entry so the reticle doesn't visibly
  // fly in from its previous location. `intersection` is read untracked
  // so this only reruns on hover transitions, not every frame.
  $effect.pre(() => {
    if (!hovering) return
    untrack(() => {
      if (intersection) {
        ref.position.copy(intersection.point)
      }
    })
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
