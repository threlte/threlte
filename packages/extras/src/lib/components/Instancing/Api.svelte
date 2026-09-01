<script lang="ts">
  import { T, useThrelte, useTask } from '@threlte/core'
  import { untrack, type Snippet } from 'svelte'
  import type { InstancedMesh } from 'three'
  import { DynamicDrawUsage, Matrix4 } from 'three'
  import { createApi } from './api.js'

  interface Props {
    instancedMesh: InstancedMesh
    id: string
    limit: number
    range: number
    update: boolean
    children?: Snippet
  }

  let { instancedMesh, id, limit, range, update, children }: Props = $props()

  const initialInstancedMesh = untrack(() => instancedMesh)
  const initialId = untrack(() => id)
  const initialLimit = untrack(() => limit)

  const { instances } = createApi(initialInstancedMesh, initialId)

  const tempMatrix = new Matrix4()

  const matrices = new Float32Array(initialLimit * 16)
  for (let i = 0; i < initialLimit; i++) tempMatrix.identity().toArray(matrices, i * 16)

  const colors = new Float32Array(initialLimit * 3).fill(1)

  const parentMatrix = new Matrix4()
  const instanceMatrix = new Matrix4()

  const { invalidate } = useThrelte()

  let initialUpdateDone = false

  function updateInstances() {
    initialInstancedMesh.updateMatrixWorld()
    parentMatrix.copy(initialInstancedMesh.matrixWorld).invert()

    if (initialInstancedMesh.instanceColor) {
      initialInstancedMesh.instanceColor!.needsUpdate = true
    }
    initialInstancedMesh.instanceMatrix.needsUpdate = true

    for (let i = 0, l = instances.current.length; i < l; i++) {
      const instance = instances.current[i]
      // Multiply by the inverse of the InstancedMesh world matrix so instances
      // aren't double-transformed when <InstancedMesh> isn't at identity.
      instanceMatrix.copy(instance.matrixWorld).premultiply(parentMatrix)
      instanceMatrix.toArray(matrices, i * 16)
      instance.color.toArray(colors, i * 3)
    }

    initialUpdateDone = true
    invalidate()
  }

  useTask(
    () => {
      initialInstancedMesh.updateMatrix()

      if (update || !initialUpdateDone) {
        updateInstances()
      }
    },
    { autoInvalidate: false }
  )

  $effect(() => {
    const updateRange = Math.min(
      initialLimit,
      range !== undefined ? range : initialLimit,
      $instances.length
    )
    initialInstancedMesh.count = updateRange

    initialInstancedMesh.instanceMatrix.clearUpdateRanges()
    initialInstancedMesh.instanceMatrix.addUpdateRange(0, updateRange * 16)

    if (initialInstancedMesh.instanceColor) {
      initialInstancedMesh.instanceColor.clearUpdateRanges()
      initialInstancedMesh.instanceColor.addUpdateRange(0, updateRange * 3)
    }
  })
</script>

<T.InstancedBufferAttribute
  attach="instanceMatrix"
  count={matrices.length / 16}
  array={matrices}
  itemSize={16}
  usage={DynamicDrawUsage}
/>

<T.InstancedBufferAttribute
  attach="instanceColor"
  count={colors.length / 3}
  array={colors}
  itemSize={3}
  usage={DynamicDrawUsage}
/>

{@render children?.()}
