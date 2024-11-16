import './types.d.ts'

export const VERSION = 8

// canvas component
export { default as Canvas } from './Canvas.svelte'

// components (v6)
export { T, extend } from './components/T/T'
export type { Props } from './components/T/types'

// plugins
export { injectPlugin } from './plugins/injectPlugin'
export type { Plugin } from './plugins/types'

// hooks
export { useThrelte } from './context/compounds/useThrelte'
export { useStage } from './hooks/useStage'
export { useTask, type ThrelteUseTask, type ThrelteUseTaskOptions } from './hooks/useTask'
export { useThrelteUserContext } from './hooks/useThrelteUserContext'

// task scheduling system types
export type { Key, Schedule, Scheduler, Stage, Task, TaskCallback } from './frame-scheduling'

// useLoader
export {
  useLoader,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult,
  type UseLoaderOptions
} from './hooks/useLoader'

// contexts
export { type ThrelteContext } from './context/compounds/useThrelte'
export { createThrelteContext } from './context/createThrelteContext.svelte'
export { createCacheContext, useCache } from './context/fragments/cache'
export { createCameraContext, useCamera } from './context/fragments/camera'
export { createCanvasContext, useCanvas } from './context/fragments/canvas'
export { createDOMContext, useDOM } from './context/fragments/dom'
export { createDisposalContext, useDisposal } from './context/fragments/disposal'
export { createParentContext, useParent } from './context/fragments/parent'
export { createParentObject3DContext, useParentObject3D } from './context/fragments/parentObject3D'
export { createRendererContext, useRenderer } from './context/fragments/renderer.svelte'
export { createSceneContext, useScene } from './context/fragments/scene'
export { createSchedulerContext, useScheduler } from './context/fragments/scheduler.svelte'

// utils
export * from './utilities'
