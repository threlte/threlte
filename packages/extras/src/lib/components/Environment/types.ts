import type { ColorSpace, CubeTextureLoader, Scene, Texture, TextureLoader } from 'three'
import type { Props } from '@threlte/core'
import type {
  EXRLoader,
  GroundedSkybox,
  HDRCubeTextureLoader,
  RGBELoader
} from 'three/examples/jsm/Addons.js'

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

export type EnvProps = {
  /**
   * callback function that can be used to modify the texture before assigning it to `scene.environment`
   */
  ontextureloaded?: (texture: Texture) => void

  /**
   * callback function that runs when a loader is created
   */
  onloadercreated?: (loader: EXRLoader | RGBELoader | TextureLoader) => void

  /**
   * the enviroment file to load
   */
  file: string

  /**
   * whether to set the `scene`'s background to the loaded environment
   * @default false
   */
  isBackground?: boolean

  /**
   * the scene to update when the texture has loaded.
   * @default useThrelte().scene
   */
  scene?: Scene
}

export type CubeEnvProps = {
  /**
   * the files to load for the cube texture
   */
  files: [
    positiveX: string,
    negativeX: string,
    positiveY: string,
    negativeY: string,
    positiveZ: string,
    negativeZ: string
  ]

  /**
   * whether to set the `scene`'s background to the loaded environment
   * @default false
   */
  isBackground?: boolean

  /**
   * passed to the loader's `setPath` function. used to tell the loader where to find files
   * @default ''
   */
  path?: string

  /**
   * the scene to update when the texture has loaded.
   * @default useThrelte().scene
   */
  scene?: Scene
}

export type CubeEnvLoaderMap = { hdr: HDRCubeTextureLoader; tex: CubeTextureLoader }
