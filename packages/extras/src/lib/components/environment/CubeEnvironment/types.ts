import type { CubeTexture, Scene } from 'three'
import type { CommonEnvironmentProps } from '../types.js'

export type CubeEnvironmentProps = CommonEnvironmentProps<CubeTexture> & {
  /**
   * The files to load or the textures to use
   */
  urls: [
    positiveX: string,
    negativeX: string,
    positiveY: string,
    negativeY: string,
    positiveZ: string,
    negativeZ: string
  ]
  /**
   * whether to set `scene.background` to the loaded environment texture
   * @default false
   */
  isbackground?: boolean
  /**
   * the scene that will have its environment and/or background set
   * @default useThrelte().scene
   */
  scene?: Scene
  /** a bindable of the loaded cube texture. */
  texture?: CubeTexture
}
