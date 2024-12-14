import { type Renderer } from 'three'
import { createCacheContext } from './fragments/cache'
import { createCameraContext } from './fragments/camera'
import { createCanvasContext, type CreateCanvasContextOptions } from './fragments/canvas'
import { createDisposalContext } from './fragments/disposal'
import { createParentContext } from './fragments/parent'
import { createRootParentObject3DContext } from './fragments/parentObject3D'
import {
  createRendererContext,
  type CreateRendererContextOptions
} from './fragments/renderer.svelte'
import { createSceneContext } from './fragments/scene'
import {
  createSchedulerContext,
  type CreateSchedulerContextOptions
} from './fragments/scheduler.svelte'
import { createRenderTaskContext } from './fragments/render-task'
import { createUserContext } from './fragments/user'
import { setRendererAnimationLoopWithAutoResize } from './fragments/animation-loop'

export type CreateThrelteContextOptions<T extends Renderer> = CreateRendererContextOptions<T> &
  CreateCanvasContextOptions &
  CreateSchedulerContextOptions

export const createThrelteContext = <T extends Renderer>(
  options: CreateThrelteContextOptions<T>
) => {
  createCanvasContext(options)
  createCacheContext()
  const { scene } = createSceneContext()
  createParentContext(scene)
  createRootParentObject3DContext(scene)
  createDisposalContext()
  createSchedulerContext(options)
  createCameraContext()
  createRendererContext(options)
  createRenderTaskContext()
  createUserContext()

  setRendererAnimationLoopWithAutoResize()
}
