import { Matrix4, Mesh, Ray, Sphere, Vector3, type Event, type Object3D, type Points } from 'three'
import { observe } from '@threlte/core'
import { fromStore } from 'svelte/store'
import type {
  ControlsContext,
  HandContext,
  Intersection,
  IntersectionEvent,
  events
} from './types.js'
import { getInternalContext } from './context.js'
import { useFixed } from '../../internal/useFixed.js'
import { isPresenting } from '../../internal/state.svelte.js'

type PointerEventName = (typeof events)[number]

const getIntersectionId = (intersection: Intersection) => {
  const target = intersection.eventObject ?? intersection.object
  if (intersection.instanceId !== undefined) {
    return `${target.uuid}|${intersection.instanceId}`
  }
  if ((intersection.object as Points).isPoints) {
    return `${target.uuid}|${intersection.index}`
  }
  return target.uuid
}

let nextPointerId = 2001

const worldSphere = new Sphere()
const invMatrix = new Matrix4()
const localOrigin = new Vector3()
const localClamped = new Vector3()
const surfacePoint = new Vector3()
// The IntersectionEvent shape still carries `ray`, which isn't meaningful for
// touch. A fixed dummy ray keeps the type happy and matches the shape that the
// ray-based plugins provide.
const dummyRay = new Ray()

export const setupTouchControls = (
  context: ControlsContext,
  handContext: HandContext,
  fixedStep = 1 / 40
) => {
  const handedness = handContext.hand
  const pointerId = nextPointerId++
  const enabled = fromStore(handContext.enabled)
  const { dispatchers } = getInternalContext()

  let hits: Intersection[] = []

  const pushHit = (
    raw: Intersection[],
    origin: Vector3,
    reachSquared: number,
    object: Object3D
  ) => {
    const mesh = object as Mesh
    const geometry = mesh.geometry
    if (geometry === undefined) return

    if (geometry.boundingSphere === null) geometry.computeBoundingSphere()
    if (geometry.boundingBox === null) geometry.computeBoundingBox()
    if (geometry.boundingSphere === null || geometry.boundingBox === null) return

    mesh.updateWorldMatrix(true, false)

    // Broad-phase: world-space bounding sphere reject.
    worldSphere.copy(geometry.boundingSphere).applyMatrix4(mesh.matrixWorld)
    const broad = handContext.hoverRadius + worldSphere.radius
    if (origin.distanceToSquared(worldSphere.center) > broad * broad) return

    // Narrow-phase: closest point on the local-space AABB (so rotation /
    // scale are handled exactly), projected back to world.
    invMatrix.copy(mesh.matrixWorld).invert()
    localOrigin.copy(origin).applyMatrix4(invMatrix)
    geometry.boundingBox.clampPoint(localOrigin, localClamped)
    surfacePoint.copy(localClamped).applyMatrix4(mesh.matrixWorld)

    const distSq = origin.distanceToSquared(surfacePoint)
    if (distSq > reachSquared) return

    raw.push({
      distance: Math.sqrt(distSq),
      point: surfacePoint.clone(),
      object: mesh,
      eventObject: mesh,
      face: null
    } as unknown as Intersection)
  }

  const collectHits = (
    raw: Intersection[],
    origin: Vector3,
    reachSquared: number,
    object: Object3D,
    seen: Set<string>
  ) => {
    if (seen.has(object.uuid)) return
    seen.add(object.uuid)

    pushHit(raw, origin, reachSquared, object)

    for (const child of object.children) {
      collectHits(raw, origin, reachSquared, child, seen)
    }
  }

  function cancelPointer(intersections: Intersection[]) {
    if (handContext.hovered.size === 0) return

    const currentIds = new Set<string>()
    for (const hit of intersections) {
      currentIds.add(getIntersectionId(hit))
    }

    const toRemove: [string, IntersectionEvent][] = []

    for (const [id, hoveredObj] of handContext.hovered) {
      if (!currentIds.has(id)) {
        toRemove.push([id, hoveredObj])
      }
    }

    for (const [id, hoveredObj] of toRemove) {
      const { eventObject } = hoveredObj
      handContext.hovered.delete(id)
      const events = dispatchers.get(eventObject)
      if (events !== undefined) {
        const data: IntersectionEvent = { ...hoveredObj, intersections }
        events.onpointerout?.(data)
        events.onpointerleave?.(data)
      }
    }

    if (handContext.hovered.size === 0) {
      handContext.pointerOverTarget.set(false)
    }
  }

  const getHits = (): Intersection[] => {
    if (!handContext.originValid) return []

    const origin = handContext.origin
    const reach = handContext.hoverRadius
    const reachSquared = reach * reach
    const raw: Intersection[] = []
    const seen = new Set<string>()

    for (const obj of context.interactiveObjects) {
      collectHits(raw, origin, reachSquared, obj, seen)
    }

    raw.sort((a, b) => a.distance - b.distance)

    const filtered =
      handContext.filter === undefined ? raw : handContext.filter(raw, context, handContext)

    const intersections: Intersection[] = []
    for (const hit of filtered) {
      let eventObject: Object3D | null = hit.object
      while (eventObject) {
        if (dispatchers.has(eventObject)) {
          intersections.push({ ...hit, eventObject })
        }
        eventObject = eventObject.parent
      }
    }

    return intersections
  }

  function pointerMissed(objects: Object3D[], event?: Event | undefined) {
    for (const object of objects) {
      dispatchers.get(object)?.pointermissed?.(event)
    }
  }

  const handleEvent = (name: PointerEventName, event?: Event | undefined) => {
    const isPointerMove = name === 'onpointermove'
    const isClickEvent = name === 'onclick'

    if (isClickEvent) {
      pointerMissed(
        context.interactiveObjects.filter((object) => !handContext.initialHits.includes(object)),
        event
      )
    }

    if (isPointerMove) cancelPointer(hits)

    let stopped = false

    dispatchEvents: for (const hit of hits) {
      const events = dispatchers.get(hit.eventObject)
      if (events === undefined) continue

      const intersectionEvent: IntersectionEvent = {
        stopped,
        ...hit,
        intersections: hits,
        handedness,
        pointerId,
        stopPropagation() {
          stopped = true
          intersectionEvent.stopped = true
          if (
            handContext.hovered.size > 0 &&
            Array.from(handContext.hovered.values()).some((i) => i.eventObject === hit.eventObject)
          ) {
            const higher = hits.slice(0, hits.indexOf(hit))
            cancelPointer([...higher, hit])
          }
        },
        delta: 0,
        nativeEvent: event,
        pointer: handContext.pointer.current,
        ray: dummyRay
      }

      if (isPointerMove) {
        handContext.pointer.update((value) => value.copy(intersectionEvent.point))

        if (
          events.onpointerover ||
          events.onpointerenter ||
          events.onpointerout ||
          events.onpointerleave
        ) {
          const id = getIntersectionId(intersectionEvent)
          const hoveredItem = handContext.hovered.get(id)
          if (hoveredItem === undefined) {
            handContext.hovered.set(id, intersectionEvent)
            events.onpointerover?.(intersectionEvent)
            events.onpointerenter?.(intersectionEvent)
            handContext.pointerOverTarget.set(true)
          } else if (hoveredItem.stopped) {
            intersectionEvent.stopPropagation()
          }
        }

        events.onpointermove?.(intersectionEvent)
      } else if (events[name] !== undefined) {
        if (!isClickEvent || handContext.initialHits.includes(hit.eventObject)) {
          events[name]?.(intersectionEvent)
        }
      }

      if (stopped) break dispatchEvents
    }
  }

  // Release-phase dispatch uses hits synthesized from `initialHits` (the
  // objects that received pointerdown), so pointerup/click fire even if the
  // finger has moved past the object — mirrors DOM pointer capture.
  const buildCapturedHits = (): Intersection[] => {
    const [x, y, z] = handContext.initialClick
    return handContext.initialHits.map(
      (object) =>
        ({
          distance: 0,
          point: new Vector3(x, y, z),
          object,
          eventObject: object,
          face: null
        }) as unknown as Intersection
    )
  }

  const { start, stop } = useFixed(
    () => {
      handContext.compute(context, handContext)
      hits = getHits()

      // Hover / move every tick — the joint moves continuously, so there is
      // no "still pointer" optimization to make here.
      handleEvent('onpointermove')

      const closest = hits[0]
      const shouldBeDown = closest !== undefined && closest.distance < handContext.downRadius

      if (shouldBeDown && !handContext.down) {
        handContext.down = true
        handContext.initialClick = [closest.point.x, closest.point.y, closest.point.z]
        handContext.initialHits = hits.map((h) => h.eventObject)
        handleEvent('onpointerdown')
      } else if (!shouldBeDown && handContext.down) {
        handContext.down = false
        const liveHits = hits
        hits = buildCapturedHits()
        handleEvent('onpointerup')
        handleEvent('onclick')
        hits = liveHits
      }
    },
    {
      fixedStep,
      autoStart: false
    }
  )

  observe.pre(
    () => [isPresenting.current, enabled.current],
    ([presenting, active]) => {
      if (presenting && active) {
        start()
      } else {
        stop()
      }
    }
  )
}
