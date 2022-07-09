import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import type { Camera, Event, Intersection, Object3D, Vector2 } from 'three'
import type {
  ThrelteContext,
  ThreltePointerEventMap,
  ThrelteRenderContext,
  ThrelteRootContext
} from '../types/types'
import { getThrelteUserData } from './getThrelteUserData'

const setPointerFromEvent = (ctx: ThrelteContext, e: MouseEvent | PointerEvent): void => {
  ctx.pointer.update((v2) => {
    if (!ctx.renderer) return v2
    return v2.set(
      (e.offsetX / ctx.renderer.domElement.clientWidth) * 2 - 1,
      -(e.offsetY / ctx.renderer.domElement.clientHeight) * 2 + 1
    )
  })
}

const runRaycaster = (
  rootCtx: ThrelteRootContext,
  pointer: Vector2,
  camera: Camera,
  objects: Object3D[]
) => {
  rootCtx.raycaster.setFromCamera(pointer, camera)
  return rootCtx.raycaster.intersectObjects(objects, false)
}

const targetChanged = (a: Intersection<Object3D<Event>>, b: Intersection<Object3D<Event>>) => {
  if (a.object.uuid !== b.object.uuid) return true
  if (a.instanceId !== b.instanceId) return true
  return false
}

/**
 * Mouse and Pointer Events dispatch events on Threlte components:
 * ```
 * click: ThreltePointerEvent;
 * contextmenu: ThreltePointerEvent;
 * pointerup: ThreltePointerEvent;
 * pointerdown: ThreltePointerEvent;
 * pointermove: ThreltePointerEvent;
 * ```
 * @param ctx
 * @param rootCtx
 * @param renderCtx
 * @returns
 */
export const useEventRaycast = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  renderCtx: ThrelteRenderContext
): {
  onClick: (e: MouseEvent | PointerEvent) => void
  onContextMenu: (e: MouseEvent | PointerEvent) => void
  onPointerUp: (e: MouseEvent | PointerEvent) => void
  onPointerDown: (e: MouseEvent | PointerEvent) => void
  onPointerMove: (e: MouseEvent | PointerEvent) => void
} => {
  let camera = get(ctx.camera)
  const unsubscribeCamera = ctx.camera.subscribe((value) => (camera = value))
  onDestroy(unsubscribeCamera)
  let pointer = get(ctx.pointer)
  const unsubscribePointer = ctx.pointer.subscribe((value) => (pointer = value))
  onDestroy(unsubscribePointer)

  const onEvent = (e: MouseEvent | PointerEvent) => {
    e.preventDefault()
    ctx.pointerOverCanvas.set(true)
    renderCtx.pointerInvalidated = true
    setPointerFromEvent(ctx, e)

    if (rootCtx.interactiveObjects.size === 0 || rootCtx.raycastableObjects.size === 0) return
    const intersects = runRaycaster(
      rootCtx,
      pointer,
      camera,
      Array.from(rootCtx.raycastableObjects)
    )
    if (intersects.length > 0 && rootCtx.interactiveObjects.has(intersects[0].object)) {
      getThrelteUserData(intersects[0].object).eventDispatcher?.(
        e.type as keyof ThreltePointerEventMap,
        {
          ...intersects[0],
          event: e
        }
      )
    }
  }

  return {
    onClick: onEvent,
    onContextMenu: onEvent,
    onPointerUp: onEvent,
    onPointerDown: onEvent,
    onPointerMove: onEvent
  }
}

/**
 * Some events can't be captured on Mouse- or PointerEvents.
 * Specifically pointerleave and pointerenter are hard to capture
 * as these events fire, when the pointer/cursor leaves the canvas
 * element.
 */
export const useFrameloopRaycast = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext
): {
  raycast: () => void
} => {
  // unwrapping stores
  let pointerOverCanvas = get(ctx.pointerOverCanvas)
  const unsubscribePointerOverCanvas = ctx.pointerOverCanvas.subscribe(
    (value) => (pointerOverCanvas = value)
  )
  onDestroy(unsubscribePointerOverCanvas)
  let camera = get(ctx.camera)
  const unsubscribeCamera = ctx.camera.subscribe((value) => (camera = value))
  onDestroy(unsubscribeCamera)
  let pointer = get(ctx.pointer)
  const unsubscribePointer = ctx.pointer.subscribe((value) => (pointer = value))
  onDestroy(unsubscribePointer)

  const raycast = () => {
    if (rootCtx.interactiveObjects.size === 0 || rootCtx.raycastableObjects.size === 0) {
      return
    }
    const intersects = pointerOverCanvas
      ? runRaycaster(rootCtx, pointer, camera, Array.from(rootCtx.raycastableObjects))
      : []

    const intersection =
      intersects.length && rootCtx.interactiveObjects.has(intersects[0].object)
        ? intersects[0]
        : null

    if (!intersection) {
      if (rootCtx.lastIntersection) {
        getThrelteUserData(rootCtx.lastIntersection.object).eventDispatcher?.(
          'pointerleave',
          rootCtx.lastIntersection
        )
      }
    } else {
      if (!rootCtx.lastIntersection) {
        getThrelteUserData(intersection.object).eventDispatcher?.('pointerenter', intersection)
      } else if (
        rootCtx.lastIntersection &&
        targetChanged(rootCtx.lastIntersection, intersection)
      ) {
        getThrelteUserData(rootCtx.lastIntersection.object).eventDispatcher?.(
          'pointerleave',
          rootCtx.lastIntersection
        )
        getThrelteUserData(intersection.object).eventDispatcher?.('pointerenter', intersection)
      }
    }

    rootCtx.lastIntersection = intersection
  }

  return {
    raycast
  }
}
