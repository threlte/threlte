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

// AsyncWritable
export { asyncWritable, type AsyncWritable } from './lib/asyncWritable'

// contexts
export { type ThrelteContext } from './context/compounds/useThrelte'
export { createThrelteContext } from './context/createThrelteContext.svelte'
export { createCacheContext, useCache } from './context/fragments/cache'
export { createCameraContext, useCamera } from './context/fragments/camera'
export { createCanvasContext, useCanvas } from './context/fragments/canvas'
export { createDisposalContext, useDisposal } from './context/fragments/disposal'
export { createParentContext, useParent } from './context/fragments/parent'
export { createParentObject3DContext, useParentObject3D } from './context/fragments/parentObject3D'
export { createRendererContext, useRenderer } from './context/fragments/renderer.svelte'
export { createSceneContext, useScene } from './context/fragments/scene'
export { createSchedulerContext, useScheduler } from './context/fragments/scheduler.svelte'

// types
export type { Size } from './types'

// utils
export { resolvePropertyPath } from './components/T/utils/resolvePropertyPath'
export { createObjectStore } from './lib/createObjectStore'
export { isInstanceOf } from './lib/isInstanceOf'
export { revision } from './lib/revision'
export { observe } from './lib/runesUtils.svelte'
export { currentWritable, memoize, watch, type CurrentWritable } from './lib/storeUtils'

// internal components
// NOTE: for some reason TS seems to be confusing the types exposed from the .svelte and .svelte.d.ts files
// but it works if we're explicit about it with the .d suffix
export type { HierarchicalObjectProperties } from './internal/HierarchicalObject.svelte'
export type { SceneGraphObjectProperties } from './internal/SceneGraphObject.svelte'
