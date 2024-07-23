import type { Renderer } from 'three'
import { createCacheContext } from './fragments/cache'
import { createCameraContext } from './fragments/camera'
import { createCanvasContext, type CreateCanvasContextOptions } from './fragments/canvas'
import { createDisposalContext } from './fragments/disposal'
import {
  createRendererContext,
  type CreateRendererContextOptions
} from './fragments/renderer.svelte'
import { createSceneContext } from './fragments/scene'
import {
  createSchedulerContext,
  type CreateSchedulerContextOptions
} from './fragments/scheduler.svelte'
import { createUserContext } from './fragments/user'

export type CreateThrelteContextOptions<T extends Renderer> = CreateRendererContextOptions<T> &
  CreateCanvasContextOptions &
  CreateSchedulerContextOptions

export const createThrelteContext = <T extends Renderer>(
  options: CreateThrelteContextOptions<T>
) => {
  createCanvasContext(options)
  createCacheContext()
  createSceneContext()
  createDisposalContext()
  createSchedulerContext(options)
  createCameraContext()
  createRendererContext(options)
  createUserContext()
}
