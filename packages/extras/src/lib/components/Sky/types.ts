import type { Props } from '@threlte/core'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
import type { RenderTargetOptions, Vector3, WebGLCubeRenderTarget } from 'three'

export type SkyProps = Props<
  Sky,
  [
    {
      ref: Sky
      sunPosition: Vector3
      renderTarget: WebGLCubeRenderTarget | undefined
    }
  ]
> & {
  /**
   * The scale of the cuboid skybox along every axis
   * @default 1000
   */
  scale?: number

  /**
   * Relative clarity of the sky
   * @default 10
   */
  turbidity?: number

  /**
   * Amount of rayleigh scattering
   * @default 3
   */
  rayleigh?: number

  /** Mie scattering coefficient
   * @default 0.005
   */
  mieCoefficient?: number

  /**
   * Mie scattering directionality
   * @default 0.7
   */
  mieDirectionalG?: number

  /**
   * Elevation angle
   * @default 2
   */
  elevation?: number

  /**
   * Azimuthal angle
   * @default 180
   */
  azimuth?: number

  /**
   * Render the sky to the scene environment
   * @default true
   */
  setEnvironment?: boolean

  /**
   * The size of the cube map
   * @default 128
   */
  cubeMapSize?: number

  /**
   * The options for the WebGLCubeRenderTarget
   * @default {}
   */
  webGLRenderTargetOptions?: RenderTargetOptions
}
