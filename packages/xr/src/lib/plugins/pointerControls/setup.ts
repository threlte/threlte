import { Vector3 } from 'three'
import { watch } from '@threlte/core'
import type { ControlsContext, HandContext, Intersection, IntersectionEvent, events } from './types'
import { useController } from '../../hooks/useController'
import { useHand } from '../../hooks/useHand'
import { useXR } from '../../hooks/useXR'
import { useFixed } from '../../internal/useFixed'
import { getInternalContext } from './context'

type PointerEventName = typeof events[number]

const getIntersectionId = (intersection: Intersection) => {
  return `${(intersection.eventObject || intersection.object).uuid}/${intersection.index}${intersection.instanceId ?? ''}`
}

const EPSILON = 0.001

export const setupPointerControls = (state: ControlsContext, handState: HandContext, fixedStep = 1 / 40) => {
  const handedness = handState.hand
  const xrState = useXR()
  const controller = useController(handedness)
  const hand = useHand(handedness)
  const { dispatchers } = getInternalContext()

  let hits: Intersection[] = []
  let lastPosition = new Vector3()

  const handlePointerDown = (event: THREE.Event) => {
    // Save initial coordinates on pointer-down
    const [hit] = hits

    if (!hit) return

    handState.initialClick = [hit.point.x, hit.point.y, hit.point.z]
    handState.initialHits = hits.map((hit) => hit.eventObject)

    handleEvent('pointerdown', event)
  }

  const handlePointerUp = (event: THREE.Event) => {
    handleEvent('pointerup', event)
  }

  const handleClick = (event: THREE.Event) => {
    // If a click yields no results, pass it back to the user as a miss
    // Missed events have to come first in order to establish user-land side-effect clean up
    if (hits.length === 0) {
      pointerMissed(event, state.interactiveObjects)
    }

    handleEvent('click', event)
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
        const eventDispatcher = dispatchers.get(eventObject)
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
        if (dispatchers.has(eventObject)) {
          intersections.push({ ...hit, eventObject })
        }

        eventObject = eventObject.parent
      }
    }

    return intersections
  }

  function pointerMissed(event: IntersectionEvent, objects: THREE.Object3D[]) {
    for (const object of objects) {
      dispatchers.get(object)?.('pointermissed', event)
    }
  }

  function processHits () {
    state.compute(state, handState)
    return getHits()
  }

  const handlePointerEnter = () => {
    handState.pointerOverTarget.set(true)
  }

  const handlePointerLeave = () => {
    // Deal with cancelation
    handState.pointerOverTarget.set(false)
    cancelPointer([])
  }

  const handleEvent = (name: PointerEventName, event: THREE.Event | null) => {
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
        delta: 0,
        nativeEvent: event,
        pointer: handState.pointer.current,
        ray: state.raycaster.ray
      }

      const eventDispatcher = dispatchers.get(hit.eventObject)

      if (eventDispatcher === undefined) return

      if (isPointerMove) {
        // Move event ...
        handState.pointer.update((value) => value.copy(intersectionEvent.point))

        if (
          eventDispatcher.hasEventListener('pointerover') ||
          eventDispatcher.hasEventListener('pointerenter') ||
          eventDispatcher.hasEventListener('pointerout') ||
          eventDispatcher.hasEventListener('pointerleave')
        ) {
          const id = getIntersectionId(intersectionEvent)
          const hoveredItem = handState.hovered.get(id)
          if (hoveredItem === undefined) {
            // If the object wasn't previously hovered, book it and call its handler
            handState.hovered.set(id, intersectionEvent)
            eventDispatcher('pointerover', intersectionEvent)
            eventDispatcher('pointerenter', intersectionEvent)
          } else if (hoveredItem.stopped) {
            // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
            intersectionEvent.stopPropagation()
          }
        }

        // Call pointer move
        eventDispatcher('pointermove', intersectionEvent)

      } else if ((!isClickEvent || handState.initialHits.includes(hit.eventObject)) && eventDispatcher.hasEventListener(name)) {

        // Missed events have to come first
        pointerMissed(
          event,
          state.interactiveObjects.filter((object) => !handState.initialHits.includes(object))
        )

        // Call the event
        eventDispatcher(name, intersectionEvent)

      } else if (isClickEvent && handState.initialHits.includes(hit.eventObject)) {

        pointerMissed(
          event,
          state.interactiveObjects.filter((object) => !handState.initialHits.includes(object))
        )
      }

      if (stopped) break dispatchEvents
    }
  }

  const { start, stop } = useFixed(() => {
    hits = processHits()

    const targetRay = controller.current?.targetRay

    if (targetRay === undefined) return

    if (targetRay.position.distanceTo(lastPosition) > EPSILON) {
      handleEvent('pointermove', null)
    }

    lastPosition.copy(targetRay.position)
  }, {
    fixedStep,
    autostart: false,
  })

  watch(controller, (input) => {
    if (input === undefined) return
    input.targetRay.addEventListener('selectstart', handlePointerDown)
    input.targetRay.addEventListener('selectend', handlePointerUp)
    input.targetRay.addEventListener('select', handleClick)
    return () => {
      input.targetRay.removeEventListener('selectstart', handlePointerDown)
      input.targetRay.removeEventListener('selectend', handlePointerUp)
      input.targetRay.removeEventListener('select', handleClick)
    }
  })

  // watch(hand, (input) => {
  //   if (input === undefined) return
  //   input.hand.addEventListener('pinchstart', handlePointerDown)
  //   input.hand.addEventListener('pinchend', handlePointerUp)
  //   input.hand.addEventListener('pinchend', handleClick)
  //   return () => {
  //     input.hand.removeEventListener('pinchstart', handlePointerDown)
  //     input.hand.removeEventListener('pinchend', handlePointerUp)
  //     input.hand.removeEventListener('pinchend', handleClick)
  //   }
  // })

  watch([xrState.isPresenting, handState.enabled], ([isPresenting, enabled]) => {
    if (isPresenting && enabled) {
      start()
    } else {
      stop()
    }
  })
}
