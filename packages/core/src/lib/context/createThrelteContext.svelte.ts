import { createCacheContext } from './fragments/cache.js'
import { createCameraContext } from './fragments/camera.js'
import { createDisposalContext } from './fragments/disposal.js'
import { createDOMContext, type CreateDOMContextOptions } from './fragments/dom.js'
import { createParentContext } from './fragments/parent.js'
import { createRootParentObject3DContext } from './fragments/parentObject3D.js'
import {
  createRendererContext,
  type CreateRendererContextOptions,
  type Renderer
} from './fragments/renderer.svelte.js'
import { createSceneContext } from './fragments/scene.js'
import {
  createSchedulerContext,
  type CreateSchedulerContextOptions
} from './fragments/scheduler.svelte.js'
import { createUserContext } from './fragments/user.js'

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
