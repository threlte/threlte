import { memoize, watch } from '@threlte/core'
import type * as THREE from 'three'
import { getHandlerContext, type InteractivityContext } from './context'
import type { DomEvent, Intersection, IntersectionEvent } from './types'

function getIntersectionId(event: Intersection) {
  return `${(event.eventObject || event.object).uuid}/${event.index}${event.instanceId}`
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

type DomEventName = (typeof DOM_EVENTS)[number][0]

export const setupInteractivity = (context: InteractivityContext) => {
  const { dispatchers } = getHandlerContext()

  const calculateDistance = (event: DomEvent) => {
    const dx = event.offsetX - context.initialClick[0]
    const dy = event.offsetY - context.initialClick[1]
    return Math.round(Math.hypot(dx, dy))
  }

  const cancelPointer = (intersections: Intersection[]) => {
    for (const hoveredObj of context.hovered.values()) {
      // When no objects were hit or the the hovered object wasn't found underneath the cursor
      // we call pointerout and delete the object from the hovered elements map
      if (
        intersections.length === 0 ||
        !intersections.some((hit) => {
          return (
            hit.object === hoveredObj.object &&
            hit.index === hoveredObj.index &&
            hit.instanceId === hoveredObj.instanceId
          )
        })
      ) {
        const { eventObject } = hoveredObj
        context.hovered.delete(getIntersectionId(hoveredObj))
        const eventDispatcher = dispatchers.get(eventObject)
        if (eventDispatcher) {
          // Clear out intersects, they are outdated by now
          const data = { ...hoveredObj, intersections }
          eventDispatcher('pointerout', data as IntersectionEvent<PointerEvent>)
          eventDispatcher('pointerleave', data as IntersectionEvent<PointerEvent>)
        }
      }
    }
  }

  const enabled = memoize(context.enabled)

  const getHits = (): Intersection[] => {
    if (!enabled.current) return []

    const intersections: Intersection[] = []
    const hits = context.raycaster.intersectObjects(context.interactiveObjects, true)
    const filtered = context.filter === undefined ? hits : context.filter(hits, context)

    // Bubble up the events, find the event source (eventObject)
    for (const hit of filtered) {
      let eventObject: THREE.Object3D | null = hit.object
      // Bubble event up
      while (eventObject) {
        if (dispatchers.has(eventObject)) intersections.push({ ...hit, eventObject })
        eventObject = eventObject.parent
      }
    }

    return intersections
  }

  const pointerMissed = (event: MouseEvent, objects: THREE.Object3D[]) => {
    for (const object of objects) {
      dispatchers.get(object)?.('pointermissed', event)
    }
  }

  const getEventHandler = (name: DomEventName): ((event: DomEvent) => void) => {
    // Deal with cancelation
    if (name === 'pointerleave' || name === 'pointercancel') {
      return () => {
        context.pointerOverTarget.set(false)
        cancelPointer([])
      }
    }

    if (name === 'pointerenter') {
      return () => {
        context.pointerOverTarget.set(true)
      }
    }

    return (event: DomEvent) => {
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

        const eventDispatcher = dispatchers.get(hit.eventObject)
        if (!eventDispatcher) return

        if (isPointerMove) {
          // Move event ...

          if (
            eventDispatcher.hasEventListener('pointerover') ||
            eventDispatcher.hasEventListener('pointerenter') ||
            eventDispatcher.hasEventListener('pointerout') ||
            eventDispatcher.hasEventListener('pointerleave')
          ) {
            const id = getIntersectionId(intersectionEvent)
            const hoveredItem = context.hovered.get(id)
            if (!hoveredItem) {
              // If the object wasn't previously hovered, book it and call its handler
              context.hovered.set(id, intersectionEvent)
              eventDispatcher('pointerover', intersectionEvent as IntersectionEvent<PointerEvent>)
              eventDispatcher('pointerenter', intersectionEvent as IntersectionEvent<PointerEvent>)
            } else if (hoveredItem.stopped) {
              // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
              intersectionEvent.stopPropagation()
            }
          }

          // Call pointer move
          eventDispatcher('pointermove', intersectionEvent as IntersectionEvent<PointerEvent>)
        } else {
          // All other events

          const hasEventListener = eventDispatcher.hasEventListener(name)

          if (hasEventListener) {
            if (!isClickEvent || context.initialHits.includes(hit.eventObject)) {
              // Missed events have to come first
              pointerMissed(
                event,
                context.interactiveObjects.filter((object) => !context.initialHits.includes(object))
              )

              // Call the event
              eventDispatcher(name, intersectionEvent)
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
  }

  const disconnect = (target: HTMLElement) => {
    DOM_EVENTS.forEach(([eventName]) => {
      target.removeEventListener(eventName, getEventHandler(eventName))
    })
  }

  const connect = (target: HTMLElement) => {
    DOM_EVENTS.forEach(([eventName, passive]) => {
      target.addEventListener(eventName, getEventHandler(eventName), { passive })
    })
  }

  watch(context.target, (target) => {
    if (target) connect(target)
    return () => {
      if (target) disconnect(target)
    }
  })
}
