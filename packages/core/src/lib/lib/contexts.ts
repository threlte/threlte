import { setContext, tick } from 'svelte'
import { derived, type Readable, type Writable } from 'svelte/store'
import {
  Clock,
  Scene,
  type Camera,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping,
  type WebGLRenderer
} from 'three'
import type { ThrelteFrameHandler } from '../hooks/useFrame'
import type { ThrelteRenderHandler } from '../hooks/useRender'
import type { DisposableThreeObject, Size } from '../types'
import { createDefaultCamera } from './defaultCamera'
import { currentWritable, type CurrentWritable } from './storeUtils'

/**
 * ### `ThrelteContext`
 *
 * This is the main context of a Threlte application.
 * It's exposed to the user via the hook `useThrelte`.
 */
export type ThrelteContext = {
  // Basics
  size: Readable<Size>
  clock: Clock
  camera: CurrentWritable<Camera>
  scene: Scene
  dpr: CurrentWritable<number>
  useLegacyLights: CurrentWritable<boolean>

  // Rendering Management
  renderer: WebGLRenderer
  frameloop: CurrentWritable<'always' | 'demand' | 'never'>
  /**
   * Invalidates the current frame when frameloop === 'demand'
   */
  invalidate: (debugFrameloopMessage?: string) => void
  /**
   * Advance one frame when frameloop === 'never'
   */
  advance: () => void

  // Color Management
  colorManagementEnabled: CurrentWritable<boolean>
  colorSpace: CurrentWritable<ColorSpace>
  toneMapping: CurrentWritable<ToneMapping>

  // Shadows
  shadows: CurrentWritable<boolean | ShadowMapType>
}

/**
 * The internal context is used to store the state of the
 * frameloop and the disposal methods. It is not exposed
 * to the user.
 */
export type ThrelteInternalContext = {
  /**
   * Render context
   */
  debugFrameloop: boolean
  frameInvalidated: boolean
  frame: number
  invalidations: Record<string, number>
  manualFrameHandlers: Set<ThrelteFrameHandler>
  autoFrameHandlers: Set<ThrelteFrameHandler>
  allFrameHandlers: Set<ThrelteFrameHandler>
  allFrameHandlersNeedSortCheck: boolean
  renderHandlers: Set<ThrelteRenderHandler>
  renderHandlersNeedSortCheck: boolean
  advance: boolean

  /**
   * Disposal context
   */

  /**
   * Disposes all disposable objects from disposableObjects
   * that are not mounted anymore and clears the Map entry.
   */
  dispose: (force?: boolean) => void

  /**
   * Returns an array of disposable objects.
   * Recursively checks disposable objects for properties
   * that again hold disposable objects and returns
   * them as well.
   */
  collectDisposableObjects: (
    object?: DisposableThreeObject,
    arr?: DisposableThreeObject[]
  ) => DisposableThreeObject[]

  /**
   * Add disposable objects that will be disposed on unmounting.
   */
  addDisposableObjects: (objects: DisposableThreeObject[]) => void

  /**
   * Remove disposable objects and possibly dispose them
   * in the next frame if they are not mounted anywhere else.
   */
  removeDisposableObjects: (objects: DisposableThreeObject[]) => void

  /**
   * A map of currently mounted disposable objects.
   */
  disposableObjects: Map<DisposableThreeObject, number>

  /**
   * A flag that is used to check whether the dispose method
   * should actually run.
   */
  shouldDispose: boolean
}

export type ThrelteUserContext = CurrentWritable<Record<string, any>>

/**
 * ### `createContexts`
 *
 * This function creates the context objects `ThrelteContext` and
 * `ThrelteInternalContext` for a Threlte application.
 */
export const createContexts = (options: {
  colorSpace: ColorSpace
  toneMapping: ToneMapping
  dpr: number
  userSize: Writable<Size | undefined>
  parentSize: Writable<Size>
  debugFrameloop: boolean
  frameloop: 'always' | 'demand' | 'never'
  shadows: boolean | ShadowMapType
  colorManagementEnabled: boolean
  useLegacyLights: boolean
}): {
  ctx: ThrelteContext
  internalCtx: ThrelteInternalContext
  getCtx: () => ThrelteContext
  getInternalCtx: () => ThrelteInternalContext
} => {
  const internalCtx: ThrelteInternalContext = {
    debugFrameloop: options.debugFrameloop,
    frame: 0,
    frameInvalidated: true,
    invalidations: {},
    manualFrameHandlers: new Set(),
    autoFrameHandlers: new Set(),
    allFrameHandlers: new Set(),
    allFrameHandlersNeedSortCheck: false,
    renderHandlers: new Set(),
    renderHandlersNeedSortCheck: false,
    advance: false,
    dispose: async (force = false) => {
      await tick()
      if (!internalCtx.shouldDispose && !force) return
      internalCtx.disposableObjects.forEach((mounted, object) => {
        if (mounted === 0 || force) {
          object?.dispose?.()
          internalCtx.disposableObjects.delete(object)
        }
      })
      internalCtx.shouldDispose = false
    },
    collectDisposableObjects: (object, objects) => {
      const disposables: DisposableThreeObject[] = objects ?? []
      if (!object) return disposables
      // Scenes can't be disposed
      if (object?.dispose && typeof object.dispose === 'function' && object.type !== 'Scene') {
        disposables.push(object)
      }
      // iterate over properties of object
      Object.entries(object).forEach(([propKey, propValue]) => {
        // we don't want to dispose the parent, we can skip "children"
        if (propKey === 'parent' || propKey === 'children' || typeof propValue !== 'object') return
        const value = propValue as any
        if (value?.dispose) {
          internalCtx.collectDisposableObjects(value, disposables)
        }
      })
      return disposables
    },
    addDisposableObjects: (objects) => {
      objects.forEach((obj) => {
        const currentValue = internalCtx.disposableObjects.get(obj)
        if (currentValue) {
          internalCtx.disposableObjects.set(obj, currentValue + 1)
        } else {
          internalCtx.disposableObjects.set(obj, 1)
        }
      })
    },
    removeDisposableObjects: (objects) => {
      if (objects.length === 0) return
      objects.forEach((obj) => {
        const currentValue = internalCtx.disposableObjects.get(obj)
        if (currentValue && currentValue > 0) {
          internalCtx.disposableObjects.set(obj, currentValue - 1)
        }
      })
      internalCtx.shouldDispose = true
    },
    disposableObjects: new Map(),
    shouldDispose: false
  }

  const ctx: ThrelteContext = {
    size: derived([options.userSize, options.parentSize], ([uSize, pSize]) => {
      return uSize ? uSize : pSize
    }),
    clock: new Clock(),
    camera: currentWritable(createDefaultCamera()),
    scene: new Scene(),
    renderer: undefined!,
    invalidate: (debugFrameloopMessage?: string) => {
      internalCtx.frameInvalidated = true
      if (internalCtx.debugFrameloop && debugFrameloopMessage) {
        internalCtx.invalidations[debugFrameloopMessage] = internalCtx.invalidations[
          debugFrameloopMessage
        ]
          ? internalCtx.invalidations[debugFrameloopMessage] + 1
          : 1
      }
    },
    advance: () => {
      internalCtx.advance = true
    },
    colorSpace: currentWritable(options.colorSpace),
    toneMapping: currentWritable(options.toneMapping),
    dpr: currentWritable(options.dpr),
    useLegacyLights: currentWritable(options.useLegacyLights),
    shadows: currentWritable(options.shadows),
    colorManagementEnabled: currentWritable(options.colorManagementEnabled),
    frameloop: currentWritable(options.frameloop)
  }

  const userCtx: ThrelteUserContext = currentWritable({})

  setContext<ThrelteContext>('threlte', ctx)
  setContext<ThrelteInternalContext>('threlte-internal-context', internalCtx)
  setContext<ThrelteUserContext>('threlte-user-context', userCtx)

  const getCtx = (): ThrelteContext => ctx
  const getInternalCtx = (): ThrelteInternalContext => internalCtx

  return {
    ctx,
    internalCtx,
    getCtx,
    getInternalCtx
  }
}
