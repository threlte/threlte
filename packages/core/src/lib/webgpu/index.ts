import type { WebGPURenderer } from 'three/webgpu'

import { useThrelte as useThrelteGeneric, useRenderer as useRendererGeneric } from '../index.js'

export { default as Canvas } from './Canvas.svelte'
export { T, extend } from './T.js'

// narrowed to WebGPURenderer
export const useThrelte = useThrelteGeneric<WebGPURenderer>
export const useRenderer = useRendererGeneric<WebGPURenderer>

export {
  VERSION,
  type Props,
  injectPlugin,
  type Plugin,
  useStage,
  useTask,
  type ThrelteUseTask,
  type ThrelteUseTaskOptions,
  useThrelteUserContext,
  type Key,
  type Schedule,
  type Scheduler,
  type Stage,
  type Task,
  type TaskCallback,
  useLoader,
  type UseLoaderLoadOptions,
  type UseLoaderLoadInput,
  type UseLoaderLoadResult,
  type UseLoaderOptions,
  type ThrelteContext,
  createThrelteContext,
  createCacheContext,
  useCache,
  createCameraContext,
  useCamera,
  createDOMContext,
  useDOM,
  createDisposalContext,
  useDisposal,
  createRendererContext,
  createSceneContext,
  useScene,
  createSchedulerContext,
  useScheduler,
  createUserContext,
  observe,
  isInstanceOf,
  type AsyncWritable,
  asyncWritable,
  revision,
  type CurrentWritable,
  type CurrentReadable,
  currentWritable,
  toCurrentReadable,
  resolvePropertyPath
} from '../index.js'

export { createParentContext, useParent } from '../context/fragments/parent.js'
export {
  createParentObject3DContext,
  useParentObject3D
} from '../context/fragments/parentObject3D.js'
