import type { Texture } from 'three'

export type ShadowAlphaProps = {
  /**
   * Shadow opacity. If not set, reads from the parent mesh's material opacity.
   */
  opacity?: number

  /**
   * Alpha map texture for the shadow. If not set, reads from the parent mesh's
   * material alphaMap. Pass `false` to disable alpha map influence.
   */
  alphaMap?: Texture | false
}
