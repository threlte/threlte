import type { CubeTextureLoader, DataTexture, Scene, Texture, TextureLoader } from 'three'
import type { UseLoaderLoadOptions, UseLoaderOptions } from '@threlte/core'
import type {
  EXRLoader,
  GroundedSkybox,
  HDRCubeTextureLoader,
  RGBELoader
} from 'three/examples/jsm/Addons.js'

export type EnvironmentProps = {
  /**
   * bindable skybox ref if a `ground` options are passed in
   * @default undefined - ground is false by default
   */
  skybox?: GroundedSkybox

  /**
   * used to instantiate a Three.GroundedSkybox instance
   * @default false
   */
  ground?: boolean | Partial<{ height: number; radius: number; resolution: number }>

  /**
   * options that are used with the loader.load
   */
  loadOptions?: UseLoaderLoadOptions<EXRLoader | RGBELoader | TextureLoader>

  /**
   * options that are used when creating the loader
   */
  loaderOptions?: UseLoaderOptions<typeof EXRLoader | typeof RGBELoader | typeof TextureLoader>

  /**
   * the enviroment file to load or the texture to use
   */
  resource: string | DataTexture | Texture

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

export type CubeEnvironmentProps = {
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
