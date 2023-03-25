import { setContext, tick } from 'svelte'
import type { Writable } from 'svelte/store'
import { derived } from 'svelte/store'
import { Clock, Scene, type ColorSpace, type ShadowMapType, type ToneMapping } from 'three'
import type { DisposableThreeObject } from '../types/components'
import type {
  Size,
  ThrelteContext,
  ThrelteInternalContext,
  ThrelteUserContext
} from '../types/types'
import { createDefaultCamera } from './defaultCamera'
import { currentWritable } from './storeUtils'

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
    renderHandlers: new Set(),
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
    renderer: undefined,
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
