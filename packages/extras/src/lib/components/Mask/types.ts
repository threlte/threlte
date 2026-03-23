import type { Props } from '@threlte/core'
import type { Mesh } from 'three'

export type MaskProps = Props<Mesh> & {
  /**
   * Each mask must have an id, you can have compound masks referring to the same id
   * @default 1
   */
  id?: number

  /**
   * If colors of the masks own material will leak through.
   * @default false
   */
  colorWrite?: boolean

  /**
   * If depth  of the masks own material will leak through.
   * @default false
   */
  depthWrite?: boolean
}
