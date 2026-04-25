import { Vector3, type Event, type Object3D, type Points } from 'three'
import { fromStore } from 'svelte/store'
import type {
  ControlsContext,
  HandContext,
  Intersection,
  IntersectionEvent,
  events
} from './types.js'
import { getInternalContext } from './context.js'
import { useController } from '../../hooks/useController.svelte.js'
import { addSubscriber } from '../../internal/inputSources.svelte.js'
import { useFixed } from '../../internal/useFixed.js'
import { isPresenting, pointerIntersection } from '../../internal/state.svelte.js'

type PointerEventName = (typeof events)[number]

// Hover identity must match the dedup key used in `getHits`, otherwise the ID
// changes mid-hover (e.g. the hit's face index changes as the ray sweeps a
// plain mesh) and the object flickers between pointerout/pointerenter every
// frame.
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

const EPSILON = 0.0001

// Starts high enough to stay clear of browser-assigned DOM pointerIds in the
// same session. Incremented per setupPointerControls call so each hand — and
// each reconnect — gets a distinct id.
let nextPointerId = 1001

export const setupPointerControls = (
  context: ControlsContext,
  handContext: HandContext,
  fixedStep = 1 / 40
) => {
  const handedness = handContext.hand
  const pointerId = nextPointerId++
  const controller = fromStore(useController(handedness))
  const enabled = fromStore(handContext.enabled)
  const { dispatchers } = getInternalContext()

  let hits: Intersection[] = []

  const lastPosition = new Vector3()

  const handlePointerDown = (event: Event) => {
    // Save initial coordinates on pointer-down
    const [hit] = hits

    if (!hit) return

    handContext.initialClick = [hit.point.x, hit.point.y, hit.point.z]
    handContext.initialHits = hits.map((hit) => hit.eventObject)

    handleEvent('onpointerdown', event)
  }

  const handlePointerUp = (event: Event) => {
    handleEvent('onpointerup', event)
  }

  const handleClick = (event: Event) => {
    handleEvent('onclick', event)
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
        // Clear out intersects, they are outdated by now
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
    const intersections: Intersection[] = []
    const rawHits = handContext.raycaster.intersectObjects(
      context.interactiveObjects,
      true
    ) as Intersection[]
    const seen = new Set<string>()
    // Deduplicate hits by object. When recursive=true, intersectObjects searches
    // each registered object's full subtree, so a child that is itself registered
    // appears once per registered ancestor — causing duplicate events. The key is
    // context-sensitive so that legitimate multi-hit objects are preserved:
    //   InstancedMesh — each instance is a distinct target, key by instanceId
    //   Points        — each point is a distinct target, key by point index
    //   Mesh / other  — uuid only; multiple face hits are the same surface
    const hits = rawHits.filter((hit) => {
      const key =
        hit.instanceId !== undefined
          ? `${hit.object.uuid}|${hit.instanceId}`
          : (hit.object as Points).isPoints
            ? `${hit.object.uuid}|${hit.index}`
            : hit.object.uuid
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    const filtered =
      handContext.filter === undefined ? hits : handContext.filter(hits, context, handContext)

    pointerIntersection[handedness] = filtered[0]

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

  function pointerMissed(objects: Object3D[], event?: Event | undefined) {
    for (const object of objects) {
      dispatchers.get(object)?.pointermissed?.(event)
    }
  }

  function processHits() {
    handContext.compute(context, handContext)
    return getHits()
  }

  const handleEvent = (name: PointerEventName, event?: Event | undefined) => {
    const isPointerMove = name === 'onpointermove'
    const isClickEvent = name === 'onclick' || name === 'oncontextmenu'

    // Fire pointermissed for objects that were not under the pointer at pointerdown.
    // Must come before the dispatch loop so user-land cleanup runs first.
    if (isClickEvent) {
      pointerMissed(
        context.interactiveObjects.filter((object) => !handContext.initialHits.includes(object)),
        event
      )
    }

    // Update hover state before dispatch so that pointerout/pointerleave fire
    // before pointerover/pointerenter on newly hit objects.
    if (isPointerMove) cancelPointer(hits)

    let stopped = false

    // loop through all hits and dispatch events
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
            // Objects cannot flush out higher up objects that have already caught the event
            const higher = hits.slice(0, hits.indexOf(hit))
            cancelPointer([...higher, hit])
          }
        },
        delta: 0,
        nativeEvent: event,
        pointer: handContext.pointer.current,
        ray: handContext.raycaster.ray
      }

      if (isPointerMove) {
        // Move event ...
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
            // If the object wasn't previously hovered, book it and call its handler
            handContext.hovered.set(id, intersectionEvent)
            events.onpointerover?.(intersectionEvent)

            events.onpointerenter?.(intersectionEvent)
            handContext.pointerOverTarget.set(true)
          } else if (hoveredItem.stopped) {
            // If the object was previously hovered and stopped, we shouldn't allow other items to proceed
            intersectionEvent.stopPropagation()
          }
        }

        // Call pointer move
        events.onpointermove?.(intersectionEvent)
      } else if (events[name] !== undefined) {
        // All other events
        if (!isClickEvent || handContext.initialHits.includes(hit.eventObject)) {
          events[name]?.(intersectionEvent)
        }
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
        handleEvent('onpointermove')
      }

      lastPosition.copy(targetRay.position)
    },
    {
      fixedStep,
      autoStart: false
    }
  )

  $effect.pre(() => {
    if (isPresenting.current && enabled.current) {
      start()
    } else {
      stop()
    }
  })

  $effect.pre(() => {
    if (!enabled.current) return
    return addSubscriber({
      type: 'controller',
      handedness,
      callbacks: {
        onselectstart: handlePointerDown as never,
        onselectend: handlePointerUp as never,
        onselect: handleClick as never
      }
    })
  })

  $effect.pre(() => {
    if (!enabled.current) return
    return addSubscriber({
      type: 'hand',
      handedness,
      callbacks: {
        onpinchstart: handlePointerDown as never,
        onpinchend: ((event: Event) => {
          handlePointerUp(event)
          handleClick(event)
        }) as never
      }
    })
  })
}
