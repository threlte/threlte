import type { CubeTexture, CubeTextureLoader, DataTexture, Scene, Texture } from 'three'
import type { GroundedSkybox, HDRCubeTextureLoader } from 'three/examples/jsm/Addons.js'

/**
 * props that are common to both EquirectangularEnvironmentProps and CubeEnvironmentProps
 */
export type EnvironmentProps<TextureType> = {
  /**
   * bindable skybox ref if a `ground` options are passed in
   * @default undefined - ground is false by default
   */
  skybox?: GroundedSkybox | undefined

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

  /**
   * a bindable of the loaded texture
   */
  texture?: TextureType | undefined

  /**
   * optional url to the environment map to fetch and load
   */
  url?: string
}

export type EquirectangularEnvironmentProps = EnvironmentProps<DataTexture | Texture>

export type CubeEnvironmentCache = {
  hdr?: HDRCubeTextureLoader
  tex?: CubeTextureLoader
}

export type CubeEnvironmentProps = {
  /**
   * the files to load or the textures to use
   */
  urls?: [
    positiveX: string,
    negativeX: string,
    positiveY: string,
    negativeY: string,
    positiveZ: string,
    negativeZ: string
  ]
} & EnvironmentProps<CubeTexture>
