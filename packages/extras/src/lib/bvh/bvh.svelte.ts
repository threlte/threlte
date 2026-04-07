import { injectPlugin, isInstanceOf } from '@threlte/core'
import { SAH } from 'three-mesh-bvh'
import type { BVHOptions } from './types.js'
import { createBatchedMeshBVH, createMeshBVH, createPointsBVH } from './raycast.js'

export const bvh = (options?: () => BVHOptions) => {
  const bvhOptions = $derived<BVHOptions>({
    helper: false,
    enabled: true,
    strategy: SAH,
    verbose: false,
    setBoundingBox: true,
    maxDepth: 20,
    maxLeafTris: 10,
    indirect: false,
    ...options?.()
  })

  injectPlugin('bvh-raycast', (pluginProps) => {
    const ref = $derived(pluginProps.ref)
    const opts = $derived<BVHOptions>(
      pluginProps.props.bvh ? { ...bvhOptions, ...pluginProps.props.bvh } : bvhOptions
    )

    $effect(() => {
      if (!opts.enabled) {
        return
      }

      if (isInstanceOf(ref, 'Mesh')) {
        return createMeshBVH(ref, opts)
      } else if (isInstanceOf(ref, 'BatchedMesh')) {
        return createBatchedMeshBVH(ref, opts)
      } else if (isInstanceOf(ref, 'Points')) {
        return createPointsBVH(ref, opts)
      }

      return
    })
  })
}
