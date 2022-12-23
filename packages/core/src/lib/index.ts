// canvas component
export { default as Canvas } from './Canvas.svelte'

// misc components
export { default as ContextBridge } from './misc/ContextBridge.svelte'

// object components

// object instance components
export { default as MeshInstance } from './instances/MeshInstance.svelte'
export { default as Object3DInstance } from './instances/Object3DInstance.svelte'

// trait components
export { default as HierarchicalObject } from './internal/HierarchicalObject.svelte'
export { default as SceneGraphObject } from './internal/SceneGraphObject.svelte'
export { default as TransformableObject } from './internal/TransformableObject.svelte'
export { default as ViewportAwareObject } from './internal/ViewportAwareObject.svelte'
export { default as DisposableObject } from './internal/DisposableObject.svelte'

// components (v6)
export { T, extend } from './components/T/T'
export type { Props, Events, Slots } from './components/T/types'

// plugins
export { injectPlugin } from './plugins/injectPlugin'
export { createPlugin } from './plugins/createPlugin'
export type { Plugin, NamedPlugin } from './plugins/types'

// hooks
export { useFrame } from './hooks/useFrame'
export { useRender } from './hooks/useRender'
export { useThrelte } from './hooks/useThrelte'
export { useThrelteRoot } from './hooks/useThrelteRoot'
export { setThrelteUserContext, useThrelteUserContext } from './hooks/useThrelteUserContext'
export { useParent } from './internal/HierarchicalObject.svelte'

// useLoader
export {
  useLoader,
  type UseLoaderOptions,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult
} from './hooks/useLoader'

// AsyncWritable
export { type AsyncWritable, asyncWritable } from './lib/asyncWritable'

// types
export type {
  Position,
  Scale,
  Rotation,
  LookAt,
  ThrelteUseFrameOptions,
  ThrelteContext,
  ThrelteRootContext,
  ThrelteInstance,
  Size
} from './types/types'

// utils
export { createObjectStore } from './lib/createObjectStore'
export { createRawEventDispatcher } from './lib/createRawEventDispatcher'
export { watch, memoize, currentWritable, type CurrentWritable } from './lib/storeUtils'
export { forwardEvents } from './lib/forwardEvents'

export type {
  HierarchicalObjectProperties,
  TransformableObjectProperties,
  DisposableObjectProperties,
  ViewportAwareObjectProperties,
  Object3DInstanceProperties,
  MeshInstanceProperties,
  PassProperties,
  SceneGraphObjectProperties
} from './types/components'
