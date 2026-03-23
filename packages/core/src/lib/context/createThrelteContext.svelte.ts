import { createParent } from '../components/T/utils/useParent.svelte.js'
import { createParentObject3D } from '../components/T/utils/useParentObject3D.svelte.js'
import { createCameraContext } from './fragments/camera.svelte.js'
import { createDisposalContext } from './fragments/disposal.svelte.js'
import { createDOMContext, type CreateDOMContextOptions } from './fragments/dom.svelte.js'
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
  options: () => CreateThrelteContextOptions<T>
) => {
  const { scene } = createSceneContext()

  createParent(() => scene)
  createParentObject3D(() => scene)

  return {
    scene,
    ...createDOMContext(options()),
    ...createDisposalContext(),
    ...createSchedulerContext(options),
    ...createCameraContext(),
    ...createRendererContext(options),
    ...createUserContext()
  }
}
