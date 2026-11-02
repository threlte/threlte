import type { DataTexture, Texture } from 'three'
import type { CommonEnvironmentProps } from '../types.js'
import type { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js'

type GroundedSkyboxOptions = Partial<{ height: number; radius: number; resolution: number }>

export interface EquirectangularEnvironmentProps extends CommonEnvironmentProps<
  DataTexture | Texture
> {
  /**
   * The `GroundedSkybox` created when `ground` is set. Bind to it to access
   * the instance.
   */
  skybox?: GroundedSkybox | undefined

  /**
   * Projects the environment onto a ground plane with a `GroundedSkybox`, so
   * objects appear to stand on it. `true` uses a height and radius of `1` and
   * a resolution of `128`, and an object overrides any of them.
   * @default false
   */
  ground?: boolean | GroundedSkyboxOptions

  /**
   * The equirectangular environment texture. Bind to it to read the texture
   * loaded from `url`, or pass a texture to use it directly without loading
   * anything.
   */
  texture?: Texture

  /**
   * The URL of an equirectangular image to load. `.hdr` and `.exr` files are
   * loaded as HDR, anything else with three's `TextureLoader`.
   */
  url?: string
}
