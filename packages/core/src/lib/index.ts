// canvas component
export { default as Canvas } from './Canvas.svelte'

// trait components
export { default as HierarchicalObject } from './internal/HierarchicalObject.svelte'
export { default as SceneGraphObject } from './internal/SceneGraphObject.svelte'
export { default as DisposableObject } from './internal/DisposableObject.svelte'

// components (v6)
export { T, extend } from './components/T/T'
export type { Props, Events, Slots } from './components/T/types'

// plugins
export { injectPlugin } from './plugins/injectPlugin'
export { createPlugin } from './plugins/createPlugin'
export type { Plugin, NamedPlugin, PluginProps } from './plugins/types'

// hooks
export { useTask, type ThrelteUseTask, type ThrelteUseTaskOptions } from './hooks/useTask'
export { useStage } from './hooks/useStage'
export { useThrelte } from './hooks/useThrelte'
export { useThrelteUserContext } from './hooks/useThrelteUserContext'

// task scheduling system types
export type { Key, Stage, Task, Scheduler, Schedule, TaskCallback } from './frame-scheduling'

// legacy hooks
// TODO: remove in Threlte 7
export { useFrame, type ThrelteUseFrameOptions } from './hooks/legacy/useFrame'
export { useRender } from './hooks/legacy/useRender'

// useLoader
export {
  useLoader,
  type UseLoaderOptions,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult
} from './hooks/useLoader'

// useParent
export { useParent } from './hooks/useParent'

// AsyncWritable
export { type AsyncWritable, asyncWritable } from './lib/asyncWritable'

// contexts
export type { ThrelteContext } from './lib/contexts'

// types
export type { Size } from './types'

// utils
export { createObjectStore } from './lib/createObjectStore'
export { createRawEventDispatcher } from './lib/createRawEventDispatcher'
export { watch, memoize, type CurrentWritable, currentWritable } from './lib/storeUtils'
export { forwardEventHandlers } from './lib/forwardEventHandlers'
export { useCache } from './lib/cache'
export { resolvePropertyPath } from './components/T/utils/resolvePropertyPath'
export { revision } from './lib/revision'

// internal components
// NOTE: for some reason TS seems to be confusing the types exposed from the .svelte and .svelte.d.ts files
// but it works if we're explicit about it with the .d suffix
export type { DisposableObjectProperties } from './internal/DisposableObject.svelte.d'
export type { HierarchicalObjectProperties } from './internal/HierarchicalObject.svelte'
export type { SceneGraphObjectProperties } from './internal/SceneGraphObject.svelte'
