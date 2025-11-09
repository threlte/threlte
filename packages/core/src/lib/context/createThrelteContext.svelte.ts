import { setContext } from 'svelte'
import { createCacheContext } from './fragments/cache'
import { createCameraContext } from './fragments/camera'
import { createDisposalContext } from './fragments/disposal'
import { createDOMContext, type CreateDOMContextOptions } from './fragments/dom'
import { createParentContext } from './fragments/parent'
import { createRootParentObject3DContext } from './fragments/parentObject3D'
import {
  createRendererContext,
  type CreateRendererContextOptions,
  type Renderer
} from './fragments/renderer.svelte'
import { createSceneContext } from './fragments/scene'
import {
  createSchedulerContext,
  type CreateSchedulerContextOptions
} from './fragments/scheduler.svelte'
import { createUserContext } from './fragments/user'
import type { ThrelteContext } from './compounds/useThrelte'

export type CreateThrelteContextOptions<T extends Renderer> = CreateRendererContextOptions<T> &
  CreateDOMContextOptions &
  CreateSchedulerContextOptions

export const createThrelteContext = <T extends Renderer>(
  options: CreateThrelteContextOptions<T>
) => {
  const sceneCtx = createSceneContext()
  const domCtx = createDOMContext(options)
  createCacheContext()
  createParentContext(sceneCtx.scene)
  createRootParentObject3DContext(sceneCtx.scene)
  createDisposalContext()
  const schedulerCtx = createSchedulerContext(options)
  const cameraCtx = createCameraContext()
  const rendererCtx = createRendererContext(options)
  createUserContext()

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

  setContext<ThrelteContext<T>>('threlte-context', context)

  return context
}
