import type { Props as ThrelteProps } from '@threlte/core'
import type { Snippet } from 'svelte'
import type { Mesh, EulerTuple, Vector3Tuple, Texture } from 'three'

export interface DecalProps extends ThrelteProps<Mesh> {
  /** A url or texture prop can be used instead of a material override */
  src?: string | Texture
  /** An optional parent mesh to project the decal */
  mesh?: Mesh
  /** Positions the center of the decal projector */
  position?: Vector3Tuple
  /** Euler for manual orientation or a single float for closest-vertex-normal orient */
  rotation?: EulerTuple | number
  scale?: Vector3Tuple | number
  polygonOffsetFactor?: number
  depthTest?: boolean
  /** @default false */
  debug?: boolean
  ref?: Mesh
  children?: Snippet<[{ ref: Mesh }]>
}
