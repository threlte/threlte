import type { Props as ThrelteProps } from '@threlte/core'
import type { MeshBasicMaterial } from 'three'

type Props = {
  /**
   * the color of the gradient
   */
  color: string
}

export type ShadowProps = Partial<Props> & ThrelteProps<MeshBasicMaterial>
