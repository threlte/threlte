import type { Props } from '@threlte/core'
import type { Group, Object3D } from 'three'

export interface BillboardProps extends Props<Group> {
  /**
   * @default true
   */
  follow?: boolean | Object3D
}
