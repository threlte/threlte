import type { Props } from '@threlte/core'
import type { MeshBasicMaterial } from 'three'

export interface ShadowProps extends Props<MeshBasicMaterial> {
  /**
   * the color of the gradient
   */
  color?: string
}
