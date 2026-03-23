import type { DataTexture, Texture } from 'three'
import type { CommonEnvironmentProps } from '../types.js'
import type { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js'

type GroundedSkyboxOptions = Partial<{ height: number; radius: number; resolution: number }>

export type EquirectangularEnvironmentProps = CommonEnvironmentProps<DataTexture | Texture> & {
  /**
   * Bindable skybox ref if a `ground` options are passed in
   * @default undefined - ground is false by default
   */
  skybox?: GroundedSkybox | undefined

  /**
   * Used to instantiate a Three.GroundedSkybox instance
   * @default false
   */
  ground?: boolean | GroundedSkyboxOptions

  /**
   * The texture to use for the skybox
   */
  texture?: Texture

  /**
   * Optional url to the environment map to fetch and load
   */
  url?: string
}
