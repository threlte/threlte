import { writable } from 'svelte/store'

// canvas component
export { default as Canvas } from './Canvas.svelte'

// trait components
export { default as HierarchicalObject } from './internal/HierarchicalObject.svelte'
export { default as SceneGraphObject } from './internal/SceneGraphObject.svelte'
export { default as DisposableObject } from './internal/DisposableObject.svelte'

// components (v6)
export { T, extend } from './components/T/T'
export type { Props } from './components/T/types'

// plugins
export { injectPlugin } from './plugins/injectPlugin'
export { createPlugin } from './plugins/createPlugin'
export type { Plugin, NamedPlugin, PluginProps } from './plugins/types'

// hooks
export { useTask, type ThrelteUseTask, type ThrelteUseTaskOptions } from './hooks/useTask'
export { useStage } from './hooks/useStage'
export { useThrelte } from './context/compounds/useThrelte'
export { useThrelteUserContext } from './hooks/useThrelteUserContext'

// task scheduling system types
export type { Key, Stage, Task, Scheduler, Schedule, TaskCallback } from './frame-scheduling'

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
export { type ThrelteContext } from './context/compounds/useThrelte'
export { createThrelteContext } from './context/createThrelteContext.svelte'

// types
export type { Size } from './types'

// utils
export { createObjectStore } from './lib/createObjectStore'
export { watch, memoize, type CurrentWritable, currentWritable } from './lib/storeUtils'
export { useCache, createCacheContext } from './context/fragments/cache'
export { resolvePropertyPath } from './components/T/utils/resolvePropertyPath'
export { revision } from './lib/revision'

// internal components
// NOTE: for some reason TS seems to be confusing the types exposed from the .svelte and .svelte.d.ts files
// but it works if we're explicit about it with the .d suffix
export type { DisposableObjectProperties } from './internal/DisposableObject.svelte.d'
export type { HierarchicalObjectProperties } from './internal/HierarchicalObject.svelte'
export type { SceneGraphObjectProperties } from './internal/SceneGraphObject.svelte'

/**
 * @deprecated createRawEventDispatcher() has been removed from Threlte and is not compatible with Svelte 5.
 *
 * To send events, you must migrate your component to runes mode and use callback props instead of events:
 *
 * @example
 * ```html
 * <!-- MyComponent.svelte -->
 * <script>
 *   let { onchange } = $props()
 *
 *   // at some point...
 *   onchange?.()
 * </script>
 *
 * <!-- MyOtherComponent.svelte -->
 * <MyComponent onchange={() => console.log('changed')} />
 *
 * ```
 */
export const createRawEventDispatcher = () => {
  console.error(
    'createRawEventDispatcher() has been removed from Threlte and is not compatible with Svelte 5.'
  )
  return () => {}
}

/**
 * @deprecated forwardEventHandlers() has been removed from Threlte and is not compatible with Svelte 5.
 *
 * To forward events in Svelte 5, you must migrate your component to runes mode and pass the components rest props
 * to the component you wish to forward events to:
 *
 * @example
 * ```html
 * <script>
 *   let { ...props } = $props()
 * </script>
 *
 * <T.Mesh {...props}>
 *   <T.BoxGeometry />
 *   <T.MeshBasicMaterial />
 * </T.Mesh>
 * ```
 */
export const forwardEventHandlers = () => {
  console.error(
    'forwardEventHandlers() has been removed from Threlte and is not compatible with Svelte 5.'
  )
  return writable()
}
