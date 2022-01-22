import { createEventDispatcher } from 'svelte'
import { get } from 'svelte/store'
import type { Camera, Event, Intersection, Object3D, Vector2 } from 'three'
import type { ThrelteContext, ThreltePointerEvent, ThrelteRootContext } from '../types/types'

export type ThreltePointerEventMap = {
  click: ThreltePointerEvent
  contextmenu: ThreltePointerEvent
  pointerup: ThreltePointerEvent
  pointerdown: ThreltePointerEvent
  pointerenter: ThreltePointerEvent
  pointerleave: ThreltePointerEvent
  pointermove: ThreltePointerEvent
}

const createEventDispatcherType = () => createEventDispatcher<ThreltePointerEventMap>()
type InteractiveObjectEventDispatcher = ReturnType<typeof createEventDispatcherType>

type InteractiveMeshUserData = {
  eventDispatcher: InteractiveObjectEventDispatcher
}

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
  return rootCtx.raycaster.intersectObjects(objects)
}

/**
 * This handler dispatches these events on three.js objects:
 * ```
 * click: ThreltePointerEvent;
 * contextmenu: ThreltePointerEvent;
 * pointerup: ThreltePointerEvent;
 * pointerdown: ThreltePointerEvent;
 * pointermove: ThreltePointerEvent;
 * ```
 * @param {ThrelteContext} ctx
 * @param {ThrelteRootContext} rootCtx
 * @param {PointerEvent | MouseEvent} e
 * @returns {void}
 */
const eventRaycast = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  e: PointerEvent | MouseEvent
): void => {
  if (rootCtx.interactiveObjects.size === 0 || rootCtx.raycastableObjects.size === 0) return
  const intersects = runRaycaster(
    rootCtx,
    get(ctx.pointer),
    get(ctx.camera),
    Array.from(rootCtx.raycastableObjects)
  )
  if (intersects.length > 0 && rootCtx.interactiveObjects.has(intersects[0].object)) {
    const userData = intersects[0].object.userData as InteractiveMeshUserData
    userData.eventDispatcher(e.type as keyof ThreltePointerEventMap, {
      ...intersects[0],
      event: e
    })
  }
}

const onEvent = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  e: MouseEvent | PointerEvent
): void => {
  e.preventDefault()
  ctx.pointerOverCanvas.set(true)
  setPointerFromEvent(ctx, e)
  eventRaycast(ctx, rootCtx, e)
}

export const onClick = onEvent
export const onContextMenu = onEvent
export const onPointerUp = onEvent
export const onPointerDown = onEvent
export const onPointerMove = onEvent

/**
 * Some events can't be captured on Mouse- or PointerEvents.
 * Specifically pointerleave and pointerenter are hard to capture
 * as these events fire, when the pointer/cursor leaves the canvas
 * element.
 * @param ctx
 * @param rootCtx
 * @returns
 */
export const animationFrameRaycast = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext
): Intersection<Object3D<Event>> | undefined => {
  if (rootCtx.interactiveObjects.size === 0 || rootCtx.raycastableObjects.size === 0) {
    return
  }
  const intersects = get(ctx.pointerOverCanvas)
    ? runRaycaster(
        rootCtx,
        get(ctx.pointer),
        get(ctx.camera),
        Array.from(rootCtx.raycastableObjects)
      )
    : []

  const intersection =
    intersects.length && rootCtx.interactiveObjects.has(intersects[0].object) ? intersects[0] : null

  if (!intersection) {
    if (rootCtx.lastIntersection) {
      getInteractiveObjectUserData(rootCtx.lastIntersection.object).eventDispatcher(
        'pointerleave',
        rootCtx.lastIntersection
      )
    }
  } else {
    if (!rootCtx.lastIntersection) {
      getInteractiveObjectUserData(intersection.object).eventDispatcher(
        'pointerenter',
        intersection
      )
    } else if (
      rootCtx.lastIntersection &&
      rootCtx.lastIntersection.object !== intersection.object
    ) {
      getInteractiveObjectUserData(rootCtx.lastIntersection.object).eventDispatcher(
        'pointerleave',
        rootCtx.lastIntersection
      )
      getInteractiveObjectUserData(intersection.object).eventDispatcher(
        'pointerenter',
        intersection
      )
    }
  }

  rootCtx.lastIntersection = intersection
}

const getInteractiveObjectUserData = (obj: Object3D) => {
  return obj.userData as InteractiveMeshUserData
}
