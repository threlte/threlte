import type { Props } from '@threlte/core'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
import type { RenderTargetOptions, Vector3, WebGLCubeRenderTarget } from 'three'

export interface SkyProps extends Props<
  Sky,
  [
    {
      ref: Sky
      sunPosition: Vector3
      renderTarget: WebGLCubeRenderTarget | undefined
    }
  ]
> {
  /**
   * The size of the sky box along every axis. It needs to enclose the scene
   * and fit within the camera's far plane.
   * @default 1000
   */
  scale?: number

  /**
   * How hazy the atmosphere is. Higher values look more overcast.
   * @default 10
   */
  turbidity?: number

  /**
   * The amount of Rayleigh scattering, which tints the sky blue and the
   * sunset red.
   * @default 3
   */
  rayleigh?: number

  /**
   * The amount of Mie scattering, which creates the glow around the sun.
   * @default 0.005
   */
  mieCoefficient?: number

  /**
   * How concentrated the glow around the sun is, from `0` to `1`.
   * @default 0.7
   */
  mieDirectionalG?: number

  /**
   * The sun's height above the horizon, in degrees.
   * @default 2
   */
  elevation?: number

  /**
   * The sun's horizontal direction, in degrees.
   * @default 180
   */
  azimuth?: number

  /**
   * Renders the sky into a cube map and sets it as `scene.environment`, so
   * it lights the scene.
   * @default true
   */
  setEnvironment?: boolean

  /**
   * The width and height in pixels of each face of the environment cube
   * map.
   * @default 128
   */
  cubeMapSize?: number

  /**
   * Options for the environment cube map's `WebGLCubeRenderTarget`.
   * @default {}
   */
  webGLRenderTargetOptions?: RenderTargetOptions
}
