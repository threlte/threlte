import type { Props } from '@threlte/core'
import type { ColorSpace } from 'three'
import type { GroundedSkybox } from 'three/examples/jsm/Addons.js'

export type EnvironmentProps = {
  /**
   * @default "/"
   */
  path?: string
  /**
   * Provide a string to use an equirectangular envmap and a string array to use a cubic envmap
   */
  files: string | string[]
  /**
   * Boolean to toggle whether to use envmap as a scene background.
   */
  isBackground?: boolean
  /**
   * Props for ground projection. Scalar recommended to 100. Depending on envmap and project requirements, good starting point is radius: 200, height: 5.
   */
  groundProjection?: Props<GroundedSkybox>
  /**
   * Use `ldr` for .png, .jpg and `hdr` for .hdr file formats
   */
  format?: 'ldr' | 'hdr'
  /**
   * Envmap color space. If not provided it defaults to `srgb` for cubemap and `srgb-linear` for equirectangular
   */
  colorSpace?: ColorSpace
}
