import type { Props } from '@threlte/core'
import type { ColorRepresentation } from 'three'
import type { InstancedMesh as ThreeInstancedMesh } from 'three'

export type InstanceProps = Props<{}> & {
  id?: string
  color?: ColorRepresentation
}
