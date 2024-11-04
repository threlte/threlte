import type { Props } from '@threlte/core'
import type { Group, Object3D } from 'three'

export type BillboardProps = Props<Group> & {
  /**
   * @default true
   */
  follow?: boolean | Object3D
}
