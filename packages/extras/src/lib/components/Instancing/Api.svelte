<script lang="ts">
  import { revision, T, useTask } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import type { InstancedMesh } from 'three'
  import { DynamicDrawUsage, Matrix4, Quaternion, Vector3 } from 'three'
  import { createApi } from './api'

  interface Props {
    instancedMesh: InstancedMesh
    id: string
    limit: number
    range: number
    update: boolean
    children?: Snippet
    useInstancedMesh: (callback: (instancedMesh: InstancedMesh) => void) => void
  }

  let { instancedMesh, id, limit, range, update, children, useInstancedMesh }: Props = $props()

  const { instances } = createApi(instancedMesh, id)

  const tempMatrix = new Matrix4()

  const matrices = new Float32Array(limit * 16)
  for (let i = 0; i < limit; i++) tempMatrix.identity().toArray(matrices, i * 16)

  const colors = new Float32Array(limit * 3).fill(1)

  const parentMatrix = new Matrix4()
  const instanceMatrix = new Matrix4()
  const translation = new Vector3()
  const rotation = new Quaternion()
  const scale = new Vector3()

  let initialUpdateDone = false

  useTask(() => {
    useInstancedMesh((instancedMesh) => {
      instancedMesh.updateMatrix()

      if (update || !initialUpdateDone) {
        instancedMesh.updateMatrixWorld()
        parentMatrix.copy(instancedMesh.matrixWorld).invert()

        // update the transform matrices and colors
        if (instancedMesh.instanceColor) {
          instancedMesh.instanceColor!.needsUpdate = true
        }
        instancedMesh.instanceMatrix.needsUpdate = true

        for (let i = 0, l = instances.current.length; i < l; i++) {
          const instance = instances.current[i]
          // Multiply the inverse of the InstancedMesh world matrix or else
          // Instances will be double-transformed if <Instances> isn't at identity
          instance.matrixWorld.decompose(translation, rotation, scale)
          instanceMatrix.compose(translation, rotation, scale).premultiply(parentMatrix)
          instanceMatrix.toArray(matrices, i * 16)
          instance.color.toArray(colors, i * 3)
        }

        initialUpdateDone = true
      }
    })
  })

  $effect.pre(() => {
    useInstancedMesh((instancedMesh) => {
      const updateRange = Math.min(limit, range !== undefined ? range : limit, $instances.length)
      instancedMesh.count = updateRange

      if (revision >= 159) {
        instancedMesh.instanceMatrix.clearUpdateRanges()
        instancedMesh.instanceMatrix.addUpdateRange(0, updateRange * 16)
      } else {
        ;(instancedMesh.instanceMatrix as any).updateRange.count = updateRange * 16
      }

      if (instancedMesh.instanceColor) {
        if (revision >= 159) {
          instancedMesh.instanceColor.clearUpdateRanges()
          instancedMesh.instanceColor.addUpdateRange(0, updateRange * 3)
        } else {
          ;(instancedMesh.instanceColor as any).updateRange.count = updateRange * 3
        }
      }
    })
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
