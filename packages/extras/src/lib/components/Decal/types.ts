import type { Props } from '@threlte/core'
import type { Snippet } from 'svelte'
import type { EulerTuple, Mesh, Texture, Vector3Tuple } from 'three'

export interface DecalProps extends Props<Mesh> {
  src?: Texture | string
  mesh?: Mesh
  position?: Vector3Tuple
  /** Euler for manual orientation or a single float for closest-vertex-normal orient */
  rotation?: EulerTuple | number
  scale?: Vector3Tuple | number
  polygonOffsetFactor?: number
  depthTest?: boolean
  debug?: boolean
  ref?: Mesh
  children?: Snippet<[{ ref: Mesh }]>
}
