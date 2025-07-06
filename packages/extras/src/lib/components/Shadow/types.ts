import type { Props as ThrelteProps } from '@threlte/core'
import type { ColorRepresentation, Mesh } from 'three'

type Props = {
  /**
   * the color of the gradient
   */
  color: ColorRepresentation
  /**
   * the *position* of the start of the gradient. a value of `0` places the start of the gradient at the origin, a higher value moves the start closer to the edge of the circle. in the range 0 -> 1
   * @default 0
   */
  colorStop: number
  /**
   * whether the shadow's material writes to the depth buffer
   * @default false
   */
  depthWrite: boolean
  /**
   * whether the shadow's material is affected by fog
   * @default false
   */
  fog: boolean
  /**
   * the opacity of the shadow's material. in the range 0 -> 1
   * @default 0.5
   */
  opacity: number
}

export type ShadowProps = Partial<Props> & ThrelteProps<Mesh>
