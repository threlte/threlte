import type { WebGLRenderer } from 'three'
import { useCamera, type CameraContext } from '../fragments/camera.svelte.js'
import { useDOM, type DOMContext } from '../fragments/dom.svelte.js'
import { useRenderer, type Renderer, type RendererContext } from '../fragments/renderer.svelte.js'
import { useScene, type SceneContext } from '../fragments/scene.js'
import { useScheduler, type SchedulerContext } from '../fragments/scheduler.svelte.js'

/**
 * ### `ThrelteContext`
 *
 * This is the main context of a Threlte application.
 * It's exposed to the user via the hook `useThrelte`.
 */
export interface ThrelteContext<T extends Renderer>
  extends
    Omit<CameraContext, 'manual' | 'makeDefaultCameras'>,
    DOMContext,
    RendererContext<T>,
    SceneContext,
    Omit<SchedulerContext, 'frameInvalidated' | 'autoInvalidations' | 'resetFrameInvalidation'> {}

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
