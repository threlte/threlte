import { createEventDispatcher } from 'svelte'
import type { Camera, Event, Intersection, Object3D } from 'three'
import type { Vector2 } from 'three'
import type { ThrelteContext, ThrelteRootContext } from '../types/types'

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

export type ThreltePointerEvent = Intersection<Object3D<Event>>

export const transformEvent = (
  v2: Vector2,
  e: MouseEvent | PointerEvent,
  ctx: ThrelteContext
): void => {
  if (!ctx.renderer) return
  v2.x = (e.clientX / ctx.renderer.domElement.clientWidth) * 2 - 1
  v2.y = -(e.clientY / ctx.renderer.domElement.clientHeight) * 2 + 1
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

export const eventRaycast = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  e: PointerEvent | MouseEvent
): void => {
  if (
    !ctx.pointer ||
    !ctx.camera ||
    rootCtx.interactiveObjects.size === 0 ||
    rootCtx.raycastableObjects.size === 0
  )
    return
  const intersects = runRaycaster(
    rootCtx,
    ctx.pointer,
    ctx.camera,
    Array.from(rootCtx.raycastableObjects)
  )
  if (intersects.length > 0 && rootCtx.interactiveObjects.has(intersects[0].object)) {
    const userData = intersects[0].object.userData as InteractiveMeshUserData
    userData.eventDispatcher(e.type as keyof ThreltePointerEventMap, intersects[0])
  }
}

export const animationFrameRaycast = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  pointerOverCanvas: boolean
): Intersection<Object3D<Event>> | undefined => {
  if (
    !ctx.pointer ||
    !ctx.camera ||
    rootCtx.interactiveObjects.size === 0 ||
    rootCtx.raycastableObjects.size === 0
  )
    return
  const intersects = pointerOverCanvas
    ? runRaycaster(rootCtx, ctx.pointer, ctx.camera, Array.from(rootCtx.raycastableObjects))
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
