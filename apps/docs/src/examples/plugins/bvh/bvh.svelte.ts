import { injectPlugin } from '@threlte/core'
import type { Mesh } from 'three'
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh'

// prevent any truthy `.isMesh` from getting through
const isMesh = (object: any): object is Mesh => object.isMesh === true

const apply = (mesh: Mesh) => {
  mesh.raycast = acceleratedRaycast
  mesh.geometry.computeBoundsTree = computeBoundsTree
  mesh.geometry.computeBoundsTree()
  mesh.geometry.disposeBoundsTree = disposeBoundsTree
}

const unapply = (mesh: Mesh) => {
  mesh.geometry.disposeBoundsTree()
}

export const bvhRaycast = () => {
  injectPlugin('bvh-raycast', (args) => {
    $effect.pre(() => {
      if (!isMesh(args.ref)) return

      apply(args.ref)
      // dispose the bounds tree when the ref changes or on unmount
      return () => {
        unapply(args.ref)
      }
    })
  })
}
