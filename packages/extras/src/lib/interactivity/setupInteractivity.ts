import { memoize, watch, type createRawEventDispatcher } from '@threlte/core'
import type * as THREE from 'three'
import type { DomEvent, Intersection, IntersectionEvent, State, ThrelteEvents } from './types'

const getRawEventDispatcher = (object: THREE.Object3D) => {
  return object.userData._threlte_interactivity_dispatcher as
    | ReturnType<typeof createRawEventDispatcher<ThrelteEvents>>
    | undefined
}

function getIntersectionId(event: Intersection) {
  return (event.eventObject || event.object).uuid + '/' + event.index + event.instanceId
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

export const setupInteractivity = (state: State) => {
  function calculateDistance(event: DomEvent) {
    const dx = event.offsetX - state.initialClick[0]
    const dy = event.offsetY - state.initialClick[1]
    return Math.round(Math.sqrt(dx * dx + dy * dy))
  }

  function cancelPointer(intersections: Intersection[]) {
    for (const hoveredObj of state.hovered.values()) {
      // When no objects were hit or the the hovered object wasn't found underneath the cursor
      // we call pointerout and delete the object from the hovered elements map
      if (
        !intersections.length ||
        !intersections.find((hit) => {
          return (
            hit.object === hoveredObj.object &&
            hit.index === hoveredObj.index &&
            hit.instanceId === hoveredObj.instanceId
          )
        })
      ) {
        const eventObject = hoveredObj.eventObject
        state.hovered.delete(getIntersectionId(hoveredObj))
        const eventDispatcher = getRawEventDispatcher(eventObject)
        if (eventDispatcher) {
          // Clear out intersects, they are outdated by now
          const data = { ...hoveredObj, intersections }
          eventDispatcher('pointerout', data as IntersectionEvent<PointerEvent>)
          eventDispatcher('pointerleave', data as IntersectionEvent<PointerEvent>)
        }
      }
    }
  }

  const enabled = memoize(state.enabled)

  const getHits = (): Intersection[] => {
    const duplicates = new Set<string>()

    const intersections: Intersection[] = []

    let hits = state.interactiveObjects
      .flatMap((obj) => (enabled.current ? state.raycaster.intersectObject(obj, true) : []))
      // Sort by distance
      .sort((a, b) => a.distance - b.distance)
      // Filter out duplicates
      .filter((item) => {
        const id = getIntersectionId(item as Intersection)
        if (duplicates.has(id)) return false
        duplicates.add(id)
        return true
      })

    if (state.filter) hits = state.filter(hits, state)

    // Bubble up the events, find the event source (eventObject)
    for (const hit of hits) {
      let eventObject: THREE.Object3D | null = hit.object
      // Bubble event up
      while (eventObject) {
        if (getRawEventDispatcher(eventObject)) intersections.push({ ...hit, eventObject })
        eventObject = eventObject.parent
      }
    }

    return intersections
  }

  function pointerMissed(event: MouseEvent, objects: THREE.Object3D[]) {
    for (const object of objects) {
      const eventDispatcher = getRawEventDispatcher(object)
      if (!eventDispatcher) continue
      eventDispatcher('pointermissed', event)
    }
  }

  const getEventHandler = (name: DomEventName): ((event: DomEvent) => void) => {
    // Deal with cancelation
    if (name === 'pointerleave' || name === 'pointercancel') {
      return () => {
        state.pointerOverTarget.set(false)
        cancelPointer([])
      }
    }

    if (name === 'pointerenter') {
      return () => {
        state.pointerOverTarget.set(true)
      }
    }

    return (event: DomEvent) => {
      const isPointerMove = name === 'pointermove'
      const isClickEvent = name === 'click' || name === 'contextmenu' || name === 'dblclick'

      /**
       * Will set up the raycaster. The default implementation will use the
       * mouse position on the renderers domElement.
       */
      state.compute(event, state)

      const hits = getHits()
      const delta = isClickEvent ? calculateDistance(event) : 0

      // Save initial coordinates on pointer-down
      if (name === 'pointerdown') {
        state.initialClick = [event.offsetX, event.offsetY]
        state.initialHits = hits.map((hit) => hit.eventObject)
      }

      // If a click yields no results, pass it back to the user as a miss
      // Missed events have to come first in order to establish user-land side-effect clean up
      if (isClickEvent && !hits.length) {
        if (delta <= 2) {
          pointerMissed(event, state.interactiveObjects)
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
              state.hovered.size &&
              Array.from(state.hovered.values()).find((i) => i.eventObject === hit.eventObject)
            ) {
              // Objects cannot flush out higher up objects that have already caught the event
              const higher = hits.slice(0, hits.indexOf(hit))
              cancelPointer([...higher, hit])
            }
          },
          camera: state.raycaster.camera,
          delta,
          nativeEvent: event,
          pointer: state.pointer.current,
          ray: state.raycaster.ray
        }

        const eventDispatcher = getRawEventDispatcher(hit.eventObject)
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
            const hoveredItem = state.hovered.get(id)
            if (!hoveredItem) {
              // If the object wasn't previously hovered, book it and call its handler
              state.hovered.set(id, intersectionEvent)
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
            if (!isClickEvent || state.initialHits.includes(hit.eventObject)) {
              // Missed events have to come first
              pointerMissed(
                event,
                state.interactiveObjects.filter((object) => !state.initialHits.includes(object))
              )

              // Call the event
              eventDispatcher(name, intersectionEvent)
            }
          } else {
            // "Real" click event
            if (isClickEvent && state.initialHits.includes(hit.eventObject)) {
              pointerMissed(
                event,
                state.interactiveObjects.filter((object) => !state.initialHits.includes(object))
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

  watch(state.target, (target) => {
    if (target) connect(target)
    return () => {
      if (target) disconnect(target)
    }
  })
}
