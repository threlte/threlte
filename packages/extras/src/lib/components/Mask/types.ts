import type { Props } from '@threlte/core'
import type { Material, Mesh } from 'three'

export type MaskSpread = Pick<
  Material,
  | 'colorWrite'
  | 'depthWrite'
  | 'stencilWrite'
  | 'stencilRef'
  | 'stencilFunc'
  | 'stencilFail'
  | 'stencilZFail'
  | 'stencilZPass'
>

export type MaskProps = Props<Mesh, [{ ref: Mesh; getSpread: () => MaskSpread }]> & {
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
