import { Vector3, type Event, type Object3D } from 'three'
import { watch } from '@threlte/core'
import type { ControlsContext, HandContext, Intersection, IntersectionEvent, events } from './types'
import { getInternalContext } from './context'
import { useController } from '../../hooks/useController'
import { useHand } from '../../hooks/useHand'
import { useXR } from '../../hooks/useXR'
import { useFixed } from '../../internal/useFixed'
import { pointerIntersection } from '../../internal/stores'

type PointerEventName = (typeof events)[number]

const getIntersectionId = (intersection: Intersection) => {
  return `${(intersection.eventObject || intersection.object).uuid}/${intersection.index}${
    intersection.instanceId ?? ''
  }`
}

const EPSILON = 0.0001

export const setupPointerControls = (
  context: ControlsContext,
  handContext: HandContext,
  fixedStep = 1 / 40
) => {
  const handedness = handContext.hand
  const controller = useController(handedness)
  const hand = useHand(handedness)
  const { dispatchers } = getInternalContext()

  let hits: Intersection[] = []
  let lastPosition = new Vector3()

  const handlePointerDown = (event: Event) => {
    // Save initial coordinates on pointer-down
    const [hit] = hits

    if (!hit) return

    handContext.initialClick = [hit.point.x, hit.point.y, hit.point.z]
    handContext.initialHits = hits.map((hit) => hit.eventObject)

    handleEvent('pointerdown', event)
  }

  const handlePointerUp = (event: Event) => {
    handleEvent('pointerup', event)
  }

  const handleClick = (event: Event) => {
    // If a click yields no results, pass it back to the user as a miss
    // Missed events have to come first in order to establish user-land side-effect clean up
    if (hits.length === 0) {
      pointerMissed(context.interactiveObjects, event)
    }

    handleEvent('click', event)
  }

  function cancelPointer(intersections: Intersection[]) {
    for (const [, hoveredObj] of handContext.hovered) {
      // When no objects were hit or the the hovered object wasn't found underneath the cursor
      // we call pointerout and delete the object from the hovered elements map
      if (
        intersections.length === 0 ||
        !intersections.some(
          (hit) =>
            hit.object === hoveredObj.object &&
            hit.index === hoveredObj.index &&
            hit.instanceId === hoveredObj.instanceId
        )
      ) {
        const { eventObject } = hoveredObj
        handContext.hovered.delete(getIntersectionId(hoveredObj))
        const eventDispatcher = dispatchers.get(eventObject)
        if (eventDispatcher) {
          // Clear out intersects, they are outdated by now
          const data = { ...hoveredObj, intersections }
          eventDispatcher('pointerout', data as IntersectionEvent)
          eventDispatcher('pointerleave', data as IntersectionEvent)

          // Deal with cancelation
          handContext.pointerOverTarget.set(false)
          cancelPointer([])
        }
      }
    }
  }

  const getHits = (): Intersection[] => {
    const intersections: Intersection[] = []
    const hits = context.raycaster.intersectObjects(context.interactiveObjects, true)
    const filtered =
      context.filter === undefined ? hits : context.filter(hits, context, handContext)

    pointerIntersection[handedness].set(filtered[0])

    // Bubble up the events, find the event source (eventObject)
    for (const hit of filtered) {
      let eventObject: Object3D | null = hit.object
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

  function pointerMissed(objects: Object3D[], event?: IntersectionEvent | undefined) {
    for (const object of objects) {
      dispatchers.get(object)?.('pointermissed', event)
    }
  }

  function processHits() {
    context.compute(context, handContext)
    return getHits()
  }

  const handleEvent = (name: PointerEventName, event?: Event | undefined) => {
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
            handContext.hovered.size > 0 &&
            Array.from(handContext.hovered.values()).some((i) => i.eventObject === hit.eventObject)
          ) {
            // Objects cannot flush out higher up objects that have already caught the event
            const higher = hits.slice(0, hits.indexOf(hit))
            cancelPointer([...higher, hit])
          }
        },
        delta: 0,
        nativeEvent: event,
        pointer: handContext.pointer.current,
        ray: context.raycaster.ray
      }

      const eventDispatcher = dispatchers.get(hit.eventObject)

      if (eventDispatcher === undefined) return

      if (isPointerMove) {
        // Move event ...
        handContext.pointer.update((value) => value.copy(intersectionEvent.point))

        if (
          eventDispatcher.hasEventListener('pointerover') ||
          eventDispatcher.hasEventListener('pointerenter') ||
          eventDispatcher.hasEventListener('pointerout') ||
          eventDispatcher.hasEventListener('pointerleave')
        ) {
          const id = getIntersectionId(intersectionEvent)
          const hoveredItem = handContext.hovered.get(id)
          if (hoveredItem === undefined) {
            // If the object wasn't previously hovered, book it and call its handler
            handContext.hovered.set(id, intersectionEvent)
            eventDispatcher('pointerover', intersectionEvent)

            eventDispatcher('pointerenter', intersectionEvent)
            handContext.pointerOverTarget.set(true)
          } else if (hoveredItem.stopped) {
            // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
            intersectionEvent.stopPropagation()
          }
        }

        // Call pointer move
        eventDispatcher('pointermove', intersectionEvent)
      } else if (
        (!isClickEvent || handContext.initialHits.includes(hit.eventObject)) &&
        eventDispatcher.hasEventListener(name)
      ) {
        // Missed events have to come first
        pointerMissed(
          context.interactiveObjects.filter((object) => !handContext.initialHits.includes(object)),
          event
        )

        // Call the event
        eventDispatcher(name, intersectionEvent)
      } else if (isClickEvent && handContext.initialHits.includes(hit.eventObject)) {
        pointerMissed(
          context.interactiveObjects.filter((object) => !handContext.initialHits.includes(object)),
          event
        )
      }

      if (stopped) break dispatchEvents
    }
  }

  const { start, stop } = useFixed(
    () => {
      hits = processHits()

      const targetRay = controller.current?.targetRay

      if (targetRay === undefined) return

      if (targetRay.position.distanceTo(lastPosition) > EPSILON) {
        handleEvent('pointermove')
      }

      lastPosition.copy(targetRay.position)
    },
    {
      fixedStep,
      autostart: false
    }
  )

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

  watch([useXR().isPresenting, handContext.enabled], ([isPresenting, enabled]) => {
    if (isPresenting && enabled) {
      start()
    } else {
      stop()
    }
  })
}
