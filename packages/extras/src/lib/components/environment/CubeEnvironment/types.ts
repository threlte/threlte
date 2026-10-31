import type { CubeTexture } from 'three'
import type { CommonEnvironmentProps } from '../types.js'

export interface CubeEnvironmentProps extends CommonEnvironmentProps<CubeTexture> {
  /**
   * The six cube faces to load, in the order +x, -x, +y, -y, +z, -z. HDR
   * files are detected by the `.hdr` extension of the first URL.
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
