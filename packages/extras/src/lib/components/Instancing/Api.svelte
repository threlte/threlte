<script lang="ts">
  import { T, useThrelte, useTask } from '@threlte/core'
  import type { Snippet } from 'svelte'
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

  const { instances } = createApi(instancedMesh, id)

  const tempMatrix = new Matrix4()

  const matrices = new Float32Array(limit * 16)
  for (let i = 0; i < limit; i++) tempMatrix.identity().toArray(matrices, i * 16)

  const colors = new Float32Array(limit * 3).fill(1)

  const parentMatrix = new Matrix4()
  const instanceMatrix = new Matrix4()

  const { invalidate } = useThrelte()

  let initialUpdateDone = false

  function updateInstances() {
    instancedMesh.updateMatrixWorld()
    parentMatrix.copy(instancedMesh.matrixWorld).invert()

    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor!.needsUpdate = true
    }
    instancedMesh.instanceMatrix.needsUpdate = true

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
      instancedMesh.updateMatrix()

      if (update || !initialUpdateDone) {
        updateInstances()
      }
    },
    { autoInvalidate: false }
  )

  $effect.pre(() => {
    const updateRange = Math.min(limit, range !== undefined ? range : limit, $instances.length)
    instancedMesh.count = updateRange

    instancedMesh.instanceMatrix.clearUpdateRanges()
    instancedMesh.instanceMatrix.addUpdateRange(0, updateRange * 16)

    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.clearUpdateRanges()
      instancedMesh.instanceColor.addUpdateRange(0, updateRange * 3)
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
