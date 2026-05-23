import type { DataTexture, Scene, Texture } from 'three'
import type { CommonEnvironmentProps } from '../types.js'
import type { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js'

type GroundedSkyboxOptions = Partial<{ height: number; radius: number; resolution: number }>

export type EquirectangularEnvironmentProps = CommonEnvironmentProps<DataTexture | Texture> & {
  /**
   * Bindable skybox ref if a `ground` options are passed in. false by default.
   * @default undefined
   */
  skybox?: GroundedSkybox | undefined

  /**
   * Used to instantiate a Three.GroundedSkybox instance
   * @default false
   */
  ground?: boolean | GroundedSkyboxOptions

  /** whether to set `scene.background` to the loaded environment texture
   * @default false
   */
  isbackground?: boolean
  /**
   * The texture to use for the skybox
   */
  texture?: Texture
  /** the scene that will have its environment and/or background set
   * @default useThrelte().scene
   */
  scene?: Scene
  /**
   * Optional url to the environment map to fetch and load
   */
  url?: string
}
