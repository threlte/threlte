import type { Scene } from 'three'
import { createCacheContext } from './fragments/cache.js'
import { createCameraContext } from './fragments/camera.svelte.js'
import { createDisposalContext } from './fragments/disposal.svelte.js'
import { createDOMContext, type CreateDOMContextOptions } from './fragments/dom.svelte.js'
import { createParentContext } from './fragments/parent.js'
import { createParentObject3DContext } from './fragments/parentObject3D.js'
import {
  createRendererContext,
  type CreateRendererContextOptions,
  type Renderer
} from './fragments/renderer.svelte.js'
import { createSceneContext } from './fragments/scene.svelte.js'
import {
  createSchedulerContext,
  type CreateSchedulerContextOptions
} from './fragments/scheduler.svelte.js'
import { createUserContext } from './fragments/user.js'

export interface CreateThrelteContextOptions<T extends Renderer>
  extends CreateRendererContextOptions<T>, CreateDOMContextOptions, CreateSchedulerContextOptions {
  scene?: Scene
}

export const createThrelteContext = <T extends Renderer>(
  options: () => CreateThrelteContextOptions<T>
) => {
  const scene = createSceneContext()

  return {
    scene,
    ...createDOMContext(options),
    ...createCacheContext(),
    ...createParentContext(() => scene),
    ...createParentObject3DContext(() => scene),
    ...createDisposalContext(),
    ...createSchedulerContext(options),
    ...createCameraContext(),
    ...createRendererContext(options),
    ...createUserContext()
  }
}
