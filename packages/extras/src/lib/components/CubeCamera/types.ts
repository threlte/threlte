import type { Props } from '@threlte/core'
import type { Group, Scene, CubeCamera } from 'three'

export type CubeCameraChildrenArgs<Camera, RenderTarget> = [
  {
    camera: Camera
    renderTarget: RenderTarget
    ref: Group
    restart(): void
    update(): void
  }
]

export interface CubeCameraProps
  extends
    Props<Group, CubeCameraChildrenArgs<CubeCamera, CubeCamera['renderTarget']>>,
    CubeCameraOptions {}

export interface CubeCameraOptions {
  /**
   * The scene background used while rendering the cube map. `'auto'` keeps
   * the scene's current background.
   * @default 'auto'
   */
  background?: Scene['background'] | 'auto'

  /**
   * The far plane of the cube camera.
   * @default 1000
   */
  far?: number

  /**
   * The scene fog used while rendering the cube map. `'auto'` keeps the
   * scene's current fog.
   * @default 'auto'
   */
  fog?: Scene['fog'] | 'auto'

  /**
   * How many frames the cube map is rendered for before stopping. `Infinity`
   * renders it every frame. Changing any prop restarts the count.
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
}
