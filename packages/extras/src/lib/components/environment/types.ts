import type { Scene, Texture } from 'three'

/**
 * Props that are common to both EquirectangularEnvironmentProps and CubeEnvironmentProps
 */
export interface CommonEnvironmentProps<T extends Texture> {
  /**
   * Whether to set the `scene`'s background to the loaded environment
   * @default false
   */
  isBackground?: boolean

  /**
   * Whether to set the `scene`'s environment to the loaded environment
   * @default true
   */
  isEnvironment?: boolean

  /**
   * The scene to apply the environment to
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * A bindable of the loaded texture
   * @default null
   */
  texture?: T | null | undefined
}
