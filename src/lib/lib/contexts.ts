import { setContext } from 'svelte'
import type { Writable } from 'svelte/store'
import { derived, writable } from 'svelte/store'
import { Camera, Clock, Object3D, Raycaster, Scene, Vector2 } from 'three'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import type { Size, ThrelteContext, ThrelteRenderContext, ThrelteRootContext } from '../types/types'
import { getDefaultCamera } from './defaultCamera'

export const createContexts = (
  linear: boolean,
  flat: boolean,
  dpr: number,
  userSize: Writable<Size | undefined>,
  parentSize: Writable<Size>,
  debugFrameloop: boolean,
  frameloop: 'always' | 'demand'
): {
  ctx: ThrelteContext
  rootCtx: ThrelteRootContext
  renderCtx: ThrelteRenderContext
  getCtx: () => ThrelteContext
  getRootCtx: () => ThrelteRootContext
  getRenderCtx: () => ThrelteRenderContext
} => {
  const renderCtx: ThrelteRenderContext = {
    debugFrameloop,
    frameloop,
    frame: 0,
    frameInvalidated: true,
    invalidations: {},
    frameHandlers: new Set()
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

  setContext<ThrelteContext>('threlte', ctx)
  setContext<ThrelteRootContext>('threlte-root', rootCtx)
  setContext<ThrelteRenderContext>('threlte-render-context', renderCtx)

  const getCtx = (): ThrelteContext => ctx
  const getRootCtx = (): ThrelteRootContext => rootCtx
  const getRenderCtx = (): ThrelteRenderContext => renderCtx

  return {
    ctx,
    rootCtx,
    renderCtx,
    getCtx,
    getRootCtx,
    getRenderCtx
  }
}
