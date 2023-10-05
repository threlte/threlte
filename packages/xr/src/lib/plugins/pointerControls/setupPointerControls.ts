import { getContext } from 'svelte'
import type * as THREE from 'three'
import { watch, type createRawEventDispatcher, useFrame } from '@threlte/core'
import type { HandState, Intersection, IntersectionEvent, State, ThrelteXREvents, events } from './types'
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

type PointerEventName = typeof events[number]

export const setupPointerControls = (state: State, handState: HandState) => {
  const handedness = handState.hand

  const xrState = useXR()
  const controller = useController(handedness)
  const hand = useHand(handedness)

  let hits: Intersection[]

  const handlePointerDown = (event: THREE.Event) => {
    hits = processHits()

    // Save initial coordinates on pointer-down
    console.log(hits)
    // handState.initialClick[0] = [event.offsetX, event.offsetY, 0]
    handState.initialHits = hits.map((hit) => hit.eventObject)
  }

  const handlePointerUp = (event: THREE.Event) => {
    hits = processHits()
  }

  const handleClick = (event) => {
    // const delta = calculateDistance(event)
    const delta = 1

    // If a click yields no results, pass it back to the user as a miss
    // Missed events have to come first in order to establish user-land side-effect clean up
    if (hits.length === 0 && delta <= 2) {
      pointerMissed(event, state.interactiveObjects)
    }

    handleEvent(event, 'click')
  }

  function calculateDistance(intersection: THREE.Intersection) {
    const dx = intersection.point.x - handState.initialClick[0]
    const dy = intersection.point.y - handState.initialClick[1]
    const dz = intersection.point.z - handState.initialClick[2]
    return Math.round(Math.hypot(dx, dy, dz))
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
    const hits = state.raycaster.intersectObjects(state.interactiveObjects, true)
    const filtered = state.filter === undefined ? hits : state.filter(hits, state, handState)

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
    state.compute(state, handState)

    const hits = getHits()

    return hits
  }

  const handlePointerEnter = () => {
    handState.pointerOverTarget.set(true)
  }

  const handlePointerLeave = () => {
    // Deal with cancelation
    handState.pointerOverTarget.set(false)
    cancelPointer([])
  }

  const handleEvent = (event: THREE.Event, name: PointerEventName) => {
    const isPointerMove = name === 'pointermove'
    const isClickEvent = name === 'click' || name === 'contextmenu'

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
            handState.hovered.size > 0 &&
            Array.from(handState.hovered.values()).some((i) => i.eventObject === hit.eventObject)
          ) {
            // Objects cannot flush out higher up objects that have already caught the event
            const higher = hits.slice(0, hits.indexOf(hit))
            cancelPointer([...higher, hit])
          }
        },
        // delta,
        nativeEvent: event,
        // pointer: handState.pointer.current,
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
              state.interactiveObjects.filter((object) => !handState.initialHits.includes(object))
            )

            // Call the event
            eventDispatcher(name, intersectionEvent)
          }
        } else {
          // "Real" click event
          if (isClickEvent && handState.initialHits.includes(hit.eventObject)) {
            pointerMissed(
              event,
              state.interactiveObjects.filter((object) => !handState.initialHits.includes(object))
            )
          }
        }
      }

      if (stopped) break dispatchEvents
    }
  }

  const { start, stop } = useFrame(() => {}, { autostart: false })

  watch(controller, (input) => {
    input?.targetRay.addEventListener('selectstart', handlePointerDown)
    input?.targetRay.addEventListener('selectend', handlePointerUp)
    input?.targetRay.addEventListener('select', handleClick)
    return () => {
      input?.targetRay.removeEventListener('selectstart', handlePointerDown)
      input?.targetRay.removeEventListener('selectend', handlePointerUp)
      input?.targetRay.removeEventListener('select', handleClick)
    }
  })

  watch(hand, (input) => {
    input?.hand.addEventListener('pinchstart', handlePointerDown)
    input?.hand.addEventListener('pinchend', handlePointerUp)
    input?.hand.addEventListener('pinchend', handleClick)
    return () => {
      input?.hand.removeEventListener('pinchstart', handlePointerDown)
      input?.hand.removeEventListener('pinchend', handlePointerUp)
      input?.hand.removeEventListener('pinchend', handleClick)
    }
  })

  watch([xrState.isPresenting, handState.enabled], ([isPresenting, enabled]) => {
    if (isPresenting && enabled) {
      start()
    } else {
      stop()
    }
  })
}
