import {
  Scene,
  type Camera,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping,
  type WebGLRenderer
} from 'three'
import type { Scheduler, Stage, Task } from '../../frame-scheduling/index.js'
import type { CurrentReadable, CurrentWritable } from '../../utilities/index.js'
import { useCamera } from '../fragments/camera.js'
import { useDOM } from '../fragments/dom.js'
import { useRenderer, type Renderer } from '../fragments/renderer.svelte.js'
import { useScene } from '../fragments/scene.js'
import { useScheduler } from '../fragments/scheduler.svelte.js'

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
  const schedulerCtx = useScheduler()
  const rendererCtx = useRenderer()
  const cameraCtx = useCamera()
  const sceneCtx = useScene()
  const domCtx = useDOM()

  const context: ThrelteContext<T> = {
    advance: schedulerCtx.advance,
    autoRender: schedulerCtx.autoRender,
    autoRenderTask: rendererCtx.autoRenderTask,
    camera: cameraCtx.camera,
    colorManagementEnabled: rendererCtx.colorManagementEnabled,
    colorSpace: rendererCtx.colorSpace,
    dpr: rendererCtx.dpr,
    invalidate: schedulerCtx.invalidate,
    mainStage: schedulerCtx.mainStage,
    renderer: rendererCtx.renderer as T,
    renderMode: schedulerCtx.renderMode,
    renderStage: schedulerCtx.renderStage,
    scheduler: schedulerCtx.scheduler,
    shadows: rendererCtx.shadows,
    shouldRender: schedulerCtx.shouldRender,
    dom: domCtx.dom,
    canvas: domCtx.canvas,
    size: domCtx.size,
    toneMapping: rendererCtx.toneMapping,
    get scene() {
      return sceneCtx.scene
    },
    set scene(scene) {
      sceneCtx.scene = scene
    }
  }

  return context
}
