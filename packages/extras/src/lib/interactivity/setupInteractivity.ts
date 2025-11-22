import { watch } from '@threlte/core'
import type * as THREE from 'three'
import { type InteractivityContext, useInteractivity } from './context.js'
import type { DomEvent, Intersection, IntersectionEvent } from './types.js'

function createIntersectionId(intersection: Intersection) {
  return `${(intersection.eventObject || intersection.object).uuid}|${intersection.index}|${intersection.instanceId}`
}

const DOM_EVENTS = [
  ['click', false],
  ['contextmenu', false],
  ['dblclick', false],
  ['wheel', false],
  ['pointerdown', true],
  ['pointerup', true],
  ['pointerleave', true],
  ['pointerenter', true],
  ['pointermove', true],
  ['pointercancel', true]
] as const

export const setupInteractivity = (context: InteractivityContext) => {
  const { handlers } = useInteractivity()

  const calculateDistance = (event: DomEvent) => {
    const dx = event.offsetX - context.initialClick[0]
    const dy = event.offsetY - context.initialClick[1]
    return Math.round(Math.hypot(dx, dy))
  }

  const cancelPointer = (intersections: Intersection[]) => {
    if (context.hovered.size === 0) {
      return
    }

    const hitIds = new Set<string>()
    for (const intersection of intersections) {
      hitIds.add(createIntersectionId(intersection))
    }

    for (const [id, hoveredObj] of context.hovered) {
      // When no objects were hit or the the hovered object wasn't found underneath the cursor
      // we call pointerout and delete the object from the hovered elements map
      if (!hitIds.has(id)) {
        const { eventObject } = hoveredObj
        context.hovered.delete(id)
        const events = handlers.get(eventObject)
        if (events) {
          // Clear out intersects, they are outdated by now
          const data = { ...hoveredObj, intersections }
          events.onpointerout?.(data as IntersectionEvent<PointerEvent>)
          events.onpointerleave?.(data as IntersectionEvent<PointerEvent>)
        }
      }
    }
  }

  const getHits = (): Intersection[] => {
    if (!context.enabled.current) return []

    const intersections: Intersection[] = []
    const hits = context.raycaster.intersectObjects(context.interactiveObjects, true)
    const filtered = context.filter === undefined ? hits : context.filter(hits, context)

    // Bubble up the events, find the event source (eventObject)
    for (const hit of filtered) {
      let eventObject: THREE.Object3D | null = hit.object
      // Bubble event up
      while (eventObject) {
        if (handlers.has(eventObject)) intersections.push({ ...hit, eventObject })
        eventObject = eventObject.parent
      }
    }

    return intersections
  }

  const pointerMissed = (event: MouseEvent, objects: THREE.Object3D[]) => {
    for (const object of objects) {
      handlers.get(object)?.onpointermissed?.(event)
    }
  }

  const handlePointerLeaveOrCancel = () => {
    context.pointerOverTarget.set(false)
    cancelPointer([])
  }

  const handlePointerEnter = () => {
    context.pointerOverTarget.set(true)
  }

  const handleEvent = (event: DomEvent) => {
    const name = event.type
    const isPointerMove = name === 'pointermove'
    const isClickEvent = name === 'click' || name === 'contextmenu' || name === 'dblclick'

    /**
     * Will set up the raycaster. The default implementation will use the
     * mouse position on the renderers domElement.
     */
    context.compute(event, context)

    const hits = getHits()
    const delta = isClickEvent ? calculateDistance(event) : 0

    // Save initial coordinates on pointer-down
    if (name === 'pointerdown') {
      context.initialClick = [event.offsetX, event.offsetY]
      context.initialHits = hits.map((hit) => hit.eventObject)
    }

    // If a click yields no results, pass it back to the user as a miss
    // Missed events have to come first in order to establish user-land side-effect clean up
    if (isClickEvent && hits.length === 0) {
      if (delta <= 2) {
        pointerMissed(event, context.interactiveObjects)
      }
    }

    // Take care of unhover
    if (isPointerMove) cancelPointer(hits)

    let stopped = false

    // loop through all hits and dispatch events
    dispatchEvents: for (const hit of hits) {
      const events = handlers.get(hit.eventObject)

      if (!events) continue

      const intersectionEvent: IntersectionEvent<DomEvent> = {
        stopped,
        ...hit,
        intersections: hits,
        stopPropagation() {
          stopped = true
          intersectionEvent.stopped = true
          if (
            context.hovered.size > 0 &&
            Array.from(context.hovered.values()).some((i) => i.eventObject === hit.eventObject)
          ) {
            // Objects cannot flush out higher up objects that have already caught the event
            const higher = hits.slice(0, hits.indexOf(hit))
            cancelPointer([...higher, hit])
          }
        },
        camera: context.raycaster.camera,
        delta,
        nativeEvent: event,
        pointer: context.pointer.current,
        ray: context.raycaster.ray
      }

      if (isPointerMove) {
        // Move event ...

        if (
          events.onpointerover ||
          events.onpointerenter ||
          events.onpointerout ||
          events.onpointerleave
        ) {
          const id = createIntersectionId(intersectionEvent)
          const hoveredItem = context.hovered.get(id)
          if (!hoveredItem) {
            // If the object wasn't previously hovered, book it and call its handler
            context.hovered.set(id, intersectionEvent)
            events.onpointerover?.(intersectionEvent as IntersectionEvent<PointerEvent>)
            events.onpointerenter?.(intersectionEvent as IntersectionEvent<PointerEvent>)
          } else if (hoveredItem.stopped) {
            // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
            intersectionEvent.stopPropagation()
          }
        }

        // Call pointer move
        events.onpointermove?.(intersectionEvent as IntersectionEvent<PointerEvent>)
      } else {
        // All other events
        if (events[`on${name}`]) {
          if (!isClickEvent || context.initialHits.includes(hit.eventObject)) {
            // Missed events have to come first
            pointerMissed(
              event,
              context.interactiveObjects.filter((object) => !context.initialHits.includes(object))
            )

            // Call the event
            events[`on${name}`]?.(intersectionEvent)
          }
        } else {
          // "Real" click event
          if (isClickEvent && context.initialHits.includes(hit.eventObject)) {
            pointerMissed(
              event,
              context.interactiveObjects.filter((object) => !context.initialHits.includes(object))
            )
          }
        }
      }

      if (stopped) break dispatchEvents
    }
  }

  let moveRAF = 0
  let queuedMoveEvent: DomEvent | null = null
  let lastMoveX = -Infinity
  let lastMoveY = -Infinity
  const MIN_MOVE_DELTA = 0.25 // pixels; ignore tiny jitter

  // pointermove can occur at a much higher frequency than requestAnimationFrame, throttle it
  const handlePointerMove = (event: DomEvent) => {
    // ignore sub-pixel jitter to cut redundant raycasts
    if (
      Math.abs(event.offsetX - lastMoveX) < MIN_MOVE_DELTA &&
      Math.abs(event.offsetY - lastMoveY) < MIN_MOVE_DELTA
    ) {
      return
    }

    lastMoveX = event.offsetX
    lastMoveY = event.offsetY

    queuedMoveEvent = event
    if (!moveRAF) {
      moveRAF = requestAnimationFrame(() => {
        moveRAF = 0
        if (queuedMoveEvent) {
          handleEvent(queuedMoveEvent)
          queuedMoveEvent = null
        }
      })
    }
  }

  const disconnect = (target: HTMLElement) => {
    for (const [eventName] of DOM_EVENTS) {
      if (eventName === 'pointerleave' || eventName === 'pointercancel') {
        target.removeEventListener(eventName, handlePointerLeaveOrCancel)
      } else if (eventName === 'pointermove') {
        target.removeEventListener(eventName, handlePointerMove)
      } else if (eventName === 'pointerenter') {
        target.removeEventListener(eventName, handlePointerEnter)
      } else {
        target.removeEventListener(eventName, handleEvent)
      }
    }
  }

  const connect = (target: HTMLElement) => {
    for (const [eventName, passive] of DOM_EVENTS) {
      if (eventName === 'pointerleave' || eventName === 'pointercancel') {
        target.addEventListener(eventName, handlePointerLeaveOrCancel, { passive })
      } else if (eventName === 'pointermove') {
        target.addEventListener(eventName, handlePointerMove, { passive })
      } else if (eventName === 'pointerenter') {
        target.addEventListener(eventName, handlePointerEnter, { passive })
      } else {
        target.addEventListener(eventName, handleEvent, { passive })
      }
    }
  }

  watch(context.target, (target) => {
    if (target) connect(target)
    return () => {
      if (target) disconnect(target)
    }
  })
}
