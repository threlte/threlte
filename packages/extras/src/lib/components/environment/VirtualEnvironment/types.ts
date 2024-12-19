import type { Snippet } from 'svelte'
import type { CubeCamera, Scene, WebGLCubeRenderTarget } from 'three'

export type VirtualEnvironmentProps = {
  children?: Snippet<
    [
      {
        restart(): void
        update(): void
        camera: CubeCamera
        renderTarget: WebGLCubeRenderTarget
      }
    ]
  >

  /**
   * The scene to apply the virtual environment to
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * Whether to set the `scene`'s background to the loaded environment
   * @default false
   */
  isBackground?: boolean

  /**
   * Passed along to the internal CubeCamera
   * @default 1000
   */
  far?: number

  /**
   * Controls how many times camera will be updated
   * @default Infinity
   */
  frames?: number

  /**
   * Passed along to the internal CubeCamera
   * @default 0.1
   */
  near?: number

  /**
   * A function that will be called anytime the update task has been started
   */
  onupdatestart?: () => void

  /**
   * A function that will be called anytime the update task has been stopped
   */
  onupdatestop?: () => void

  /**
   * Size of the render target. a higher resolution should have more detail
   * @default 256
   */
  resolution?: number

  /**
   * Whether to show the virtual environment in the scene
   * @default true
   */
  visible?: boolean
}
