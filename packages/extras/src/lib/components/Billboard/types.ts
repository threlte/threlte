import type { Props } from '@threlte/core'
import type { Group, Object3D } from 'three'

export interface BillboardProps extends Props<Group> {
  /**
   * What the children turn to face every frame. `true` matches the default
   * camera's rotation, an `Object3D` matches that object's rotation, and
   * `false` stops rotating.
   * @default true
   */
  follow?: boolean | Object3D
}
