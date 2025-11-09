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

export type CreateThrelteContextOptions<T extends Renderer> = CreateRendererContextOptions<T> &
  CreateDOMContextOptions &
  CreateSchedulerContextOptions

export const createThrelteContext = <T extends Renderer>(
  options: CreateThrelteContextOptions<T>
) => {
  const { scene } = createSceneContext()

  return {
    scene,
    ...createDOMContext(options),
    ...createCacheContext(),
    ...createParentContext(scene),
    ...createRootParentObject3DContext(scene),
    ...createDisposalContext(),
    ...createSchedulerContext(options),
    ...createCameraContext(),
    ...createRendererContext(options),
    ...createUserContext()
  }
}
