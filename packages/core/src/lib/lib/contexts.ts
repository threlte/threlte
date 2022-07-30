import { setContext, tick } from 'svelte'
import type { Writable } from 'svelte/store'
import { derived, writable } from 'svelte/store'
import { Camera, Clock, Object3D, Raycaster, Scene, Vector2 } from 'three'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import type { DisposableThreeObject } from '../types/components'
import type {
  Size,
  ThrelteAudioContext,
  ThrelteContext,
  ThrelteDisposalContext,
  ThrelteRenderContext,
  ThrelteRootContext
} from '../types/types'
import { getDefaultCamera } from './defaultCamera'

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
  audioCtx: ThrelteAudioContext
  disposalCtx: ThrelteDisposalContext
  getCtx: () => ThrelteContext
  getRootCtx: () => ThrelteRootContext
  getRenderCtx: () => ThrelteRenderContext
  getAudioCtx: () => ThrelteAudioContext
  getDisposalCtx: () => ThrelteDisposalContext
} => {
  const audioCtx: ThrelteAudioContext = {
    audioListeners: new Map(),
    addAudioListener: (listener, id?: string) => {
      id = id ?? 'default'
      if (audioCtx.audioListeners.has(id)) {
        console.warn(`An AudioListener with the id "${id}" has already been added, aborting.`)
        return
      }
      audioCtx.audioListeners.set(id, listener)
    },
    removeAudioListener: (id?: string) => {
      id = id ?? 'default'
      if (!audioCtx.audioListeners.has(id)) {
        console.warn(`No AudioListener with the id "${id}" found, aborting.`)
        return
      }
      audioCtx.audioListeners.delete(id)
    },
    getAudioListener: (id?: string) => {
      id = id ?? 'default'
      if (!audioCtx.audioListeners.has(id)) {
        console.warn(`No AudioListener with the id "${id}" found, aborting.`)
        return
      }
      return audioCtx.audioListeners.get(id)
    }
  }

  const renderCtx: ThrelteRenderContext = {
    debugFrameloop,
    frameloop,
    frame: 0,
    frameInvalidated: true,
    pointerInvalidated: true,
    invalidations: {},
    frameHandlers: new Set(),
    advance: false
  }

  const ctx: ThrelteContext = {
    size: derived([userSize, parentSize], ([uSize, pSize]) => {
      return uSize ? uSize : pSize
    }),
    pointer: writable(new Vector2()),
    pointerOverCanvas: writable(false),
    clock: new Clock(),
    camera: writable(getDefaultCamera()),
    scene: new Scene(),
    renderer: undefined,
    composer: undefined,
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
      if (!ctx.composer) return
      ctx.composer.passes.forEach((pass) => {
        if (pass instanceof RenderPass) {
          pass.camera = camera
        }
      })
      ctx.invalidate('Canvas: setting camera')
    },
    raycastableObjects: new Set(),
    interactiveObjects: new Set(),
    raycaster: new Raycaster(),
    lastIntersection: null,
    addRaycastableObject: (object: Object3D) => {
      rootCtx.raycastableObjects.add(object)
    },
    removeRaycastableObject: (object: Object3D) => {
      rootCtx.raycastableObjects.delete(object)
    },
    addInteractiveObject: (object: Object3D) => {
      rootCtx.interactiveObjects.add(object)
    },
    removeInteractiveObject: (object: Object3D) => {
      rootCtx.interactiveObjects.delete(object)
    },
    addPass: (pass: Pass) => {
      if (!ctx.composer) return
      ctx.composer.addPass(pass)
      ctx.invalidate('Canvas: adding pass')
    },
    removePass: (pass: Pass) => {
      if (!ctx.composer) return
      ctx.composer.removePass(pass)
      ctx.invalidate('Canvas: removing pass')
    }
  }

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
  setContext<ThrelteAudioContext>('threlte-audio-context', audioCtx)
  setContext<ThrelteDisposalContext>('threlte-disposal-context', disposalCtx)

  const getCtx = (): ThrelteContext => ctx
  const getRootCtx = (): ThrelteRootContext => rootCtx
  const getRenderCtx = (): ThrelteRenderContext => renderCtx
  const getAudioCtx = (): ThrelteAudioContext => audioCtx
  const getDisposalCtx = (): ThrelteDisposalContext => disposalCtx

  return {
    ctx,
    rootCtx,
    renderCtx,
    audioCtx,
    disposalCtx,
    getCtx,
    getRootCtx,
    getRenderCtx,
    getAudioCtx,
    getDisposalCtx
  }
}
