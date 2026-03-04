export const VERSION = 8

// canvas component
export { default as Canvas } from './Canvas.svelte'

// components (v6)
export { T, extend } from './components/T/T.js'
export type { Props } from './components/T/types.js'

// plugins
export { injectPlugin } from './plugins/injectPlugin.js'
export type { Plugin } from './plugins/types.js'

// hooks
export { useThrelte } from './context/compounds/useThrelte.js'
export { useStage } from './hooks/useStage.js'
export { useTask, type ThrelteUseTask, type ThrelteUseTaskOptions } from './hooks/useTask.svelte.js'
export { useThrelteUserContext } from './hooks/useThrelteUserContext.js'

// task scheduling system types
export type {
  Key,
  Schedule,
  Scheduler,
  Stage,
  Task,
  TaskCallback
} from './frame-scheduling/index.js'

// useLoader
export {
  useLoader,
  type UseLoaderLoadOptions,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult,
  type UseLoaderOptions
} from './hooks/useLoader.js'

// contexts
export type { ThrelteContext } from './context/compounds/useThrelte.js'
export { createThrelteContext } from './context/createThrelteContext.svelte.js'
export { createCacheContext, useCache } from './context/fragments/cache.js'
export { createCameraContext, useCamera } from './context/fragments/camera.js'
export { createDOMContext, useDOM } from './context/fragments/dom.js'
export { createDisposalContext, useDisposal } from './context/fragments/disposal.js'
export { createParentContext, useParent } from './context/fragments/parent.js'
export {
  createParentObject3DContext,
  useParentObject3D
} from './context/fragments/parentObject3D.js'
export { createRendererContext, useRenderer } from './context/fragments/renderer.svelte.js'
export { createSceneContext, useScene } from './context/fragments/scene.js'
export { createSchedulerContext, useScheduler } from './context/fragments/scheduler.svelte.js'
export { createUserContext } from './context/fragments/user.js'

// utils
export * from './utilities/index.js'
