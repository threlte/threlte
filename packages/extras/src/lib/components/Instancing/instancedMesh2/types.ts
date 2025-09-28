import type { InstancedEntity, InstancedMesh2 } from '@three.ez/instanced-mesh'
import type { Props } from '@threlte/core'
import type { ColorRepresentation } from 'three'
import type { ThrelteEvents } from '../../../interactivity/types'
import type { Snippet } from 'svelte'

type Instance2InteractivityProps = {
  [K in keyof ThrelteEvents]?: (event: ThrelteEvents[K]) => void
}

export type InstanceProps = Props<{}> & {
  id?: string
  color?: ColorRepresentation
  children?: Snippet<[{ instance: InstancedEntity }]>
} & Instance2InteractivityProps

export type InstancedMesh2Props = Props<InstancedMesh2 | undefined> & {
  bvh?: boolean
  perObjectFrustumCulled?: boolean
  sortObjects?: boolean
  raycastOnlyFrustum?: boolean

  // todo - consider onFrustumEnter
  // todo - consider autoUpdate and how to handle manual frustum culling
}
