import { setContext, tick } from 'svelte'
import type { Writable } from 'svelte/store'
import { derived, writable } from 'svelte/store'
import { Camera, Clock, Scene } from 'three'
import type { DisposableThreeObject } from '../types/components'
import type {
  Size,
  ThrelteContext,
  ThrelteDisposalContext,
  ThrelteRenderContext,
  ThrelteRootContext,
  ThrelteUserContext
} from '../types/types'
import { getDefaultCamera } from './defaultCamera'
import { currentWritable } from './storeUtils'

export const createContexts = (
  linear: boolean,
  flat: boolean,
  dpr: number,
  userSize: Writable<Size | undefined>,
  parentSize: Writable<Size>,
  debugFrameloop: boolean,
  frameloop: 'always' | 'demand' | 'never'
): {
  ctx: ThrelteContext
  rootCtx: ThrelteRootContext
  renderCtx: ThrelteRenderContext
  disposalCtx: ThrelteDisposalContext
  getCtx: () => ThrelteContext
  getRootCtx: () => ThrelteRootContext
  getRenderCtx: () => ThrelteRenderContext
  getDisposalCtx: () => ThrelteDisposalContext
} => {
  const renderCtx: ThrelteRenderContext = {
    debugFrameloop,
    frameloop,
    frame: 0,
    frameInvalidated: true,
    invalidations: {},
    manualFrameHandlers: new Set(),
    autoFrameHandlers: new Set(),
    allFrameHandlers: new Set(),
    renderHandlers: new Set(),
    advance: false
  }

  const ctx: ThrelteContext = {
    size: derived([userSize, parentSize], ([uSize, pSize]) => {
      return uSize ? uSize : pSize
    }),
    clock: new Clock(),
    camera: currentWritable(getDefaultCamera()),
    scene: new Scene(),
    renderer: undefined,
    invalidate: (debugFrameloopMessage?: string) => {
      renderCtx.frameInvalidated = true
      if (renderCtx.debugFrameloop && debugFrameloopMessage) {
        renderCtx.invalidations[debugFrameloopMessage] = renderCtx.invalidations[
          debugFrameloopMessage
        ]
          ? renderCtx.invalidations[debugFrameloopMessage] + 1
          : 1
      }
    },
    advance: () => {
      renderCtx.advance = true
    }
  }

  const rootCtx: ThrelteRootContext = {
    flat: writable(flat),
    linear: writable(linear),
    dpr: writable(dpr),
    setCamera: (camera: Camera) => {
      ctx.camera.set(camera)
    }
  }

  const userCtxObject = {}
  const userCtx: ThrelteUserContext = currentWritable(userCtxObject)

  const disposalCtx: ThrelteDisposalContext = {
    dispose: async (force = false) => {
      await tick()
      if (!disposalCtx.shouldDispose && !force) return
      disposalCtx.disposableObjects.forEach((mounted, object) => {
        if (mounted === 0 || force) {
          object?.dispose?.()
          disposalCtx.disposableObjects.delete(object)
        }
      })
      disposalCtx.shouldDispose = false
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
          disposalCtx.collectDisposableObjects(value, disposables)
        }
      })
      return disposables
    },
    addDisposableObjects: (objects) => {
      objects.forEach((obj) => {
        const currentValue = disposalCtx.disposableObjects.get(obj)
        if (currentValue) {
          disposalCtx.disposableObjects.set(obj, currentValue + 1)
        } else {
          disposalCtx.disposableObjects.set(obj, 1)
        }
      })
    },
    removeDisposableObjects: (objects) => {
      if (objects.length === 0) return
      objects.forEach((obj) => {
        const currentValue = disposalCtx.disposableObjects.get(obj)
        if (currentValue && currentValue > 0) {
          disposalCtx.disposableObjects.set(obj, currentValue - 1)
        }
      })
      disposalCtx.shouldDispose = true
    },
    disposableObjects: new Map(),
    shouldDispose: false
  }

  setContext<ThrelteContext>('threlte', ctx)
  setContext<ThrelteRootContext>('threlte-root', rootCtx)
  setContext<ThrelteRenderContext>('threlte-render-context', renderCtx)
  setContext<ThrelteDisposalContext>('threlte-disposal-context', disposalCtx)
  setContext<ThrelteUserContext>('threlte-user-context', userCtx)

  const getCtx = (): ThrelteContext => ctx
  const getRootCtx = (): ThrelteRootContext => rootCtx
  const getRenderCtx = (): ThrelteRenderContext => renderCtx
  const getDisposalCtx = (): ThrelteDisposalContext => disposalCtx

  return {
    ctx,
    rootCtx,
    renderCtx,
    disposalCtx,
    getCtx,
    getRootCtx,
    getRenderCtx,
    getDisposalCtx
  }
}
