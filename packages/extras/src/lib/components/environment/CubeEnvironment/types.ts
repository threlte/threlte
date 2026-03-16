import type { CubeTexture } from 'three'
import type { CommonEnvironmentProps } from '../types.js'

export type CubeEnvironmentProps = CommonEnvironmentProps<CubeTexture> & {
  /**
   * The files to load or the textures to use
   */
  urls?: [
    positiveX: string,
    negativeX: string,
    positiveY: string,
    negativeY: string,
    positiveZ: string,
    negativeZ: string
  ]
}
