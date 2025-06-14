import {
  Scene,
  type Camera,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping,
  type WebGLRenderer
} from 'three'
import type { Scheduler, Stage, Task } from '../../frame-scheduling'
import type { CurrentReadable, CurrentWritable } from '../../utilities'
import type { Renderer } from '../fragments/renderer.svelte'
import { getContext } from 'svelte'

/**
 * ### `ThrelteContext`
 *
 * This is the main context of a Threlte application.
 * It's exposed to the user via the hook `useThrelte`.
 */
export type ThrelteContext<T extends Renderer> = {
  dom: HTMLElement
  canvas: HTMLCanvasElement
  size: CurrentReadable<{ width: number; height: number }>
  camera: CurrentWritable<Camera>
  scene: Scene
  dpr: CurrentWritable<number>
  renderer: T
  /**
   * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
   * If set to 'manual', the scene will only be rendered when advance() is called
   * If set to 'always', the scene will be rendered every frame
   */
  renderMode: CurrentWritable<'always' | 'on-demand' | 'manual'>
  /**
   * By default, Threlte will automatically render the scene when necessary.
   * If you want to implement a custom render pipeline, you can set this to
   * false.
   */
  autoRender: CurrentWritable<boolean>
  /**
   * Invalidates the current frame when renderMode === 'on-demand'
   */
  invalidate: () => void
  /**
   * Advance one frame when renderMode === 'manual'
   */
  advance: () => void
  /** The scheduler used by this Threlte app */
  scheduler: Scheduler
  /** The stage which useTask defaults to */
  mainStage: Stage
  /**
   * The default render stage. Tasks in this stage are ran according to
   * on-demand rendering.
   */
  renderStage: Stage
  autoRenderTask: Task
  /**
   * Function to determine if a rendering should happen according to on-demand
   * rendering. The value of this function is valid for the duration of the
   * current frame.
   */
  shouldRender: () => boolean
  colorManagementEnabled: CurrentWritable<boolean>
  colorSpace: CurrentWritable<ColorSpace>
  toneMapping: CurrentWritable<ToneMapping>
  shadows: CurrentWritable<boolean | ShadowMapType>
}

/**
 * ### `useThrelte`
 *
 * This hook provides access to the main context of a Threlte application.
 *
 * ```svelte
 * <script>
 *   import { useThrelte } from 'threlte'
 *   const { camera } = useThrelte()
 *
 *   // Access the camera
 *   console.log(camera.current) // => PerspectiveCamera { … }
 * </script>
 * ```
 */
export const useThrelte = <T extends Renderer = WebGLRenderer>(): ThrelteContext<T> => {
  return getContext<ThrelteContext<T>>('threlte-context')
}
