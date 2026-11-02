import type { Snippet } from 'svelte'
import type { CubeCamera, Scene } from 'three'

export interface VirtualEnvironmentProps {
  /**
   * The objects that make up the environment, such as light formers, which
   * are rendered into the environment cube map. Receives the cube camera and
   * functions to `update` or `restart` the rendering.
   */
  children?: Snippet<
    [
      {
        restart(): void
        update(): void
        camera: CubeCamera
        renderTarget: CubeCamera['renderTarget']
      }
    ]
  >

  /**
   * The scene to apply the environment to.
   * @default useThrelte().scene
   */
  scene?: Scene

  /**
   * Sets the environment as `scene.background`. The previous background is
   * restored on unmount.
   * @default false
   */
  isBackground?: boolean

  /**
   * Sets the environment as `scene.environment`, lighting physically based
   * materials. The previous environment is restored on unmount.
   * @default true
   */
  isEnvironment?: boolean

  /**
   * The far plane of the cube camera.
   * @default 1000
   */
  far?: number

  /**
   * How many frames the cube map is rendered for before stopping. `Infinity`
   * renders it every frame.
   * @default Infinity
   */
  frames?: number

  /**
   * The near plane of the cube camera.
   * @default 0.1
   */
  near?: number

  /** Called whenever rendering of the cube map starts or restarts. */
  onupdatestart?: () => void

  /** Called when rendering stops after `frames` frames, or before a restart. */
  onupdatestop?: () => void

  /**
   * The width and height in pixels of each face of the cube map.
   * @default 256
   */
  resolution?: number

  /**
   * Also adds the environment's objects to the scene, where they're visible
   * like any other object. Useful for positioning them.
   * @default false
   */
  visible?: boolean
}
