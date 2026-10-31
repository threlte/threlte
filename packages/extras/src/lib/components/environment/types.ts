import type { Scene, Texture } from 'three'

/**
 * Props that are common to both EquirectangularEnvironmentProps and CubeEnvironmentProps
 */
export interface CommonEnvironmentProps<T extends Texture> {
  /**
   * Sets the texture as `scene.background`. The previous background is
   * restored on unmount.
   * @default false
   */
  isBackground?: boolean

  /**
   * Sets the texture as `scene.environment`, lighting physically based
   * materials. The previous environment is restored on unmount.
   * @default true
   */
  isEnvironment?: boolean

  /**
   * The scene to apply the texture to.
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * The environment texture. Bind to it to read the texture loaded from a
   * URL, or pass a texture to use it directly without loading anything.
   */
  texture?: T | null | undefined
}
