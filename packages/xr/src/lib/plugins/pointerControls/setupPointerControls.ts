import { getContext } from 'svelte'
import { get } from 'svelte/store'
import type * as THREE from 'three'
import { watch, type createRawEventDispatcher, useFrame } from '@threlte/core'
import type { Intersection, IntersectionEvent, State, ThrelteXREvents } from './types'
import { useController } from '../../hooks/useController'
import { useHand } from '../../hooks/useHand'
import { useXR } from '../../hooks/useXR'

const getRawEventDispatcher = (object: THREE.Object3D) => {
  return object.userData._threlte_interactivity_dispatcher as
    | ReturnType<typeof createRawEventDispatcher<ThrelteXREvents>>
    | undefined
}

function getIntersectionId(event: Intersection) {
  return (event.eventObject || event.object).uuid + '/' + event.index + event.instanceId
}

const POINTER_EVENTS = [
  'click',
  'contextmenu',
  'pointerdown',
  'pointerup',
  'pointerleave',
  'pointerenter',
  'pointermove',
  'pointercancel',
  'pointermissed'
] as const

type PointerEventName = typeof POINTER_EVENTS[number]

export const setupPointerControls = (handState: State) => {
  const state = getContext('threlte-pointer-controls-context')
  const handedness = get(handState.hand)
  const controller = useController(handedness)
  const hand = useHand(handedness)
  const xrState = useXR()

  const handlePointerDown = (event: THREE.Event) => {
    console.log('selectstart', event)
  }

  const handlePointerUp = (event: THREE.Event) => {
    
  }

  watch(controller, (input) => {
    input?.targetRay.addEventListener('selectstart', handlePointerDown)
    input?.targetRay.addEventListener('selectend', handlePointerUp)
    return () => {
      input?.targetRay.removeEventListener('selectstart', handlePointerDown)
      input?.targetRay.removeEventListener('selectend', handlePointerUp)
    }
  })

  watch(hand, (input) => {
    input?.hand.addEventListener('pinchstart', handlePointerDown)
    input?.hand.addEventListener('pinchend', handlePointerUp)
    return () => {
      input?.hand.removeEventListener('pinchstart', handlePointerDown)
      input?.hand.removeEventListener('pinchend', handlePointerUp)
    }
  })

  function calculateDistance(event: THREE.Event) {
    const dx = event.offsetX - handState.initialClick[0]
    const dy = event.offsetY - handState.initialClick[1]
    return Math.round(Math.hypot(dx, dy))
  }

  function cancelPointer(intersections: Intersection[]) {
    for (const [, hoveredObj] of handState.hovered) {
      // When no objects were hit or the the hovered object wasn't found underneath the cursor
      // we call pointerout and delete the object from the hovered elements map
      if (
        intersections.length === 0 ||
        !intersections.some((hit) => (
          hit.object === hoveredObj.object &&
          hit.index === hoveredObj.index &&
          hit.instanceId === hoveredObj.instanceId
        ))
      ) {
        const { eventObject } = hoveredObj
        handState.hovered.delete(getIntersectionId(hoveredObj))
        const eventDispatcher = getRawEventDispatcher(eventObject)
        if (eventDispatcher) {
          // Clear out intersects, they are outdated by now
          const data = { ...hoveredObj, intersections }
          eventDispatcher('pointerout', data as IntersectionEvent)
          eventDispatcher('pointerleave', data as IntersectionEvent)
        }
      }
    }
  }

  const getHits = (): Intersection[] => {
    const intersections: Intersection[] = []
    const hits = handState.raycaster.intersectObjects(state.interactiveObjects, true)
    const filtered = handState.filter === undefined ? hits : handState.filter(hits, handState)

    // Bubble up the events, find the event source (eventObject)
    for (const hit of filtered) {
      let eventObject: THREE.Object3D | null = hit.object
      // Bubble event up
      while (eventObject) {
        if (getRawEventDispatcher(eventObject)) {
          intersections.push({ ...hit, eventObject })
        }

        eventObject = eventObject.parent
      }
    }

    return intersections
  }

  function pointerMissed(event: IntersectionEvent, objects: THREE.Object3D[]) {
    for (const object of objects) {
      const eventDispatcher = getRawEventDispatcher(object)
      eventDispatcher?.('pointermissed', event)
    }
  }

  function processHits () {
    handState.compute(handState)

    const hits = getHits()

    if (hits.length > 0) console.log(hits)
  }

  const getEventHandler = (name: PointerEventName): ((event: THREE.Event) => void) => {
    // Deal with cancelation
    if (name === 'pointerleave' || name === 'pointercancel') {
      return () => {
        handState.pointerOverTarget.set(false)
        cancelPointer([])
      }
    }

    if (name === 'pointerenter') {
      return () => {
        handState.pointerOverTarget.set(true)
      }
    }

    return (event: THREE.Event) => {
      const isPointerMove = name === 'pointermove'
      const isClickEvent = name === 'click' || name === 'contextmenu'

      const delta = isClickEvent ? calculateDistance(event) : 0

      // Save initial coordinates on pointer-down
      if (name === 'pointerdown') {
        handState.initialClick = [event.offsetX, event.offsetY, 0]
        handState.initialHits = hits.map((hit) => hit.eventObject)
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
        const intersectionEvent: IntersectionEvent = {
          stopped,
          ...hit,
          intersections: hits,
          stopPropagation() {
            stopped = true
            intersectionEvent.stopped = true
            if (
              handState.hovered.size &&
              Array.from(handState.hovered.values()).find((i) => i.eventObject === hit.eventObject)
            ) {
              // Objects cannot flush out higher up objects that have already caught the event
              const higher = hits.slice(0, hits.indexOf(hit))
              cancelPointer([...higher, hit])
            }
          },
          delta,
          nativeEvent: event,
          pointer: handState.pointer.current,
          ray: handState.raycaster.ray
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
            const hoveredItem = handState.hovered.get(id)
            if (!hoveredItem) {
              // If the object wasn't previously hovered, book it and call its handler
              handState.hovered.set(id, intersectionEvent)
              eventDispatcher('pointerover', intersectionEvent as IntersectionEvent)
              eventDispatcher('pointerenter', intersectionEvent as IntersectionEvent)
            } else if (hoveredItem.stopped) {
              // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
              intersectionEvent.stopPropagation()
            }
          }

          // Call pointer move
          eventDispatcher('pointermove', intersectionEvent as IntersectionEvent)
        } else {
          // All other events

          const hasEventListener = eventDispatcher.hasEventListener(name)

          if (hasEventListener) {
            if (!isClickEvent || handState.initialHits.includes(hit.eventObject)) {
              // Missed events have to come first
              pointerMissed(
                event,
                handState.interactiveObjects.filter((object) => !handState.initialHits.includes(object))
              )

              // Call the event
              eventDispatcher(name, intersectionEvent)
            }
          } else {
            // "Real" click event
            if (isClickEvent && handState.initialHits.includes(hit.eventObject)) {
              pointerMissed(
                event,
                handState.interactiveObjects.filter((object) => !handState.initialHits.includes(object))
              )
            }
          }
        }

        if (stopped) break dispatchEvents
      }
    }
  }

  const { start, stop } = useFrame(processHits, { autostart: false })

  watch([xrState.isPresenting, handState.enabled], ([isPresenting, enabled]) => {
    if (isPresenting && enabled) {
      start()
    } else {
      stop()
    }
  })
}
