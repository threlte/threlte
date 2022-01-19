import { createEventDispatcher } from 'svelte'
import type { Camera, Event, Intersection, Object3D } from 'three'
import { Raycaster, Vector2 } from 'three'
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

const raycaster = new Raycaster()

export const transformEvent = (
  v2: Vector2,
  e: MouseEvent | PointerEvent,
  ctx: ThrelteContext
): void => {
  if (!ctx.renderer) return
  v2.x = (e.clientX / ctx.renderer.domElement.clientWidth) * 2 - 1
  v2.y = -(e.clientY / ctx.renderer.domElement.clientHeight) * 2 + 1
}

const runRaycaster = (pointer: Vector2, camera: Camera, objects: Object3D[]) => {
  raycaster.setFromCamera(pointer, camera)
  return raycaster.intersectObjects(objects)
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
  const intersects = runRaycaster(ctx.pointer, ctx.camera, Array.from(rootCtx.raycastableObjects))
  if (intersects.length > 0 && rootCtx.interactiveObjects.has(intersects[0].object)) {
    const userData = intersects[0].object.userData as InteractiveMeshUserData
    userData.eventDispatcher(e.type as keyof ThreltePointerEventMap, intersects[0])
  }
}

let lastIntersection: Intersection<Object3D<Event>> | null = null
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
    ? runRaycaster(ctx.pointer, ctx.camera, Array.from(rootCtx.raycastableObjects))
    : []

  const intersection =
    intersects.length && rootCtx.interactiveObjects.has(intersects[0].object) ? intersects[0] : null

  if (!intersection) {
    if (lastIntersection) {
      getInteractiveObjectUserData(lastIntersection.object).eventDispatcher(
        'pointerleave',
        lastIntersection
      )
    }
  } else {
    if (!lastIntersection) {
      getInteractiveObjectUserData(intersection.object).eventDispatcher(
        'pointerenter',
        intersection
      )
    } else if (lastIntersection && lastIntersection.object !== intersection.object) {
      getInteractiveObjectUserData(lastIntersection.object).eventDispatcher(
        'pointerleave',
        lastIntersection
      )
      getInteractiveObjectUserData(intersection.object).eventDispatcher(
        'pointerenter',
        intersection
      )
    }
  }

  lastIntersection = intersection
}

const getInteractiveObjectUserData = (obj: Object3D) => {
  return obj.userData as InteractiveMeshUserData
}
