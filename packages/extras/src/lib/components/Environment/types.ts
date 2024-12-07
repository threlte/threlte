import type {
  CubeTexture,
  CubeTextureLoader,
  DataTexture,
  Scene,
  Texture,
  TextureLoader
} from 'three'
import type { UseLoaderLoadOptions, UseLoaderOptions } from '@threlte/core'
import type {
  EXRLoader,
  GroundedSkybox,
  HDRCubeTextureLoader,
  RGBELoader
} from 'three/examples/jsm/Addons.js'

/**
 * props that are common to both EquirectangularEnvironmentProps and CubeEnvironmentProps
 */
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

export type EquirectangularEnvironmentProps = {
  /**
   * the enviroment file to load or the texture to use
   */
  resource: string | DataTexture | Texture

  /**
   * options that are used with loader.load
   */
  loadOptions?: UseLoaderLoadOptions<EXRLoader | RGBELoader | TextureLoader>

  /**
   * options that are used when creating the loader
   */
  loaderOptions?: UseLoaderOptions<typeof EXRLoader | typeof RGBELoader | typeof TextureLoader>
} & EnvironmentProps

export type CubeEnvironmentCache = {
  hdr?: HDRCubeTextureLoader
  tex?: CubeTextureLoader
}

export type CubeEnvironmentProps = {
  /**
   * the files to load or the textures to use
   */
  resources:
    | CubeTexture
    | [
        positiveX: string,
        negativeX: string,
        positiveY: string,
        negativeY: string,
        positiveZ: string,
        negativeZ: string
      ]

  /**
   * options that are used with loader.load
   * TODO: modify `useLoader` to be able to call load(string[])
   */
  loadOptions?: {
    transform?: (texture: CubeTexture) => CubeTexture
    onProgress?: (event: ProgressEvent) => void
  }

  /**
   * options that are used when creating the loader
   */
  loaderOptions?: {
    extend?: (loader: CubeTextureLoader | HDRCubeTextureLoader) => void
  }
} & EnvironmentProps
