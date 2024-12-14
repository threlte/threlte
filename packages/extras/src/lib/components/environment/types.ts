import type { Scene, Texture } from 'three'

/**
 * Props that are common to both EquirectangularEnvironmentProps and CubeEnvironmentProps
 */
export type CommonEnvironmentProps<TextureType extends Texture> = {
  /**
   * Whether to set the `scene`'s background to the loaded environment
   * @default false
   */
  isBackground?: boolean

  /**
   * The scene to apply the environment to
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * A bindable of the loaded texture
   */
  texture?: TextureType | undefined
}
