import type { Props } from '@threlte/core'
import type { Group, Scene, CubeCamera, WebGLCubeRenderTarget } from 'three'

export type CubeCameraProps = Props<
  Group,
  [
    {
      camera: CubeCamera
      ref: Group
      renderTarget: WebGLCubeRenderTarget
      restart(): void
      update(): void
    }
  ]
> & {
  /**
   * background that will be set before rendering to the render target. a value of `'auto'` will use the current background
   * @default 'auto'
   */
  background?: Scene['background'] | 'auto'

  /**
   * passed along to the internal CubeCamera
   * @default 1000
   */
  far?: number

  /**
   * fog that will be set before rendering to the render target. a value of `'auto'` will use the current fog
   * @default 'auto'
   */
  fog?: Scene['fog'] | 'auto'

  /**
   * controls how many times camera will be updated
   * @default Infinity
   */
  frames?: number

  /**
   * passed along to the internal CubeCamera
   * @default 0.1
   */
  near?: number

  /**
   * a callback that is ran when the update task has been started
   */
  onupdatestart?: () => void

  /**
   * a callback that is ran when the update task has been stopped
   */
  onupdatestop?: () => void

  /**
   * size of the render target. a higher resolution should have more detail
   * @default 256
   */
  resolution?: number
}
