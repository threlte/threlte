import { createRawEventDispatcher, useThrelte } from '@threlte/core'
import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import type * as THREE from 'three'

export type DomEvent = PointerEvent | MouseEvent | WheelEvent

export interface Intersection extends THREE.Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: THREE.Object3D
}

const getRawEventDispatcher = (object: THREE.Object3D) => {
  return object.userData._threlte_interactivity_dispatcher as
    | ReturnType<typeof createRawEventDispatcher>
    | undefined
}

const DOM_EVENTS = [
  ['click', false],
  ['contextmenu', false],
  ['dblclick', false],
  ['wheel', true],
  ['pointerdown', true],
  ['pointerup', true],
  ['pointerleave', true],
  ['pointermove', true],
  ['pointercancel', true],
  ['lostpointercapture', true]
] as const

type DomEventName = typeof DOM_EVENTS[number][0]

export const setupInteractivity = (interactiveObjects: Set<THREE.Object3D>) => {
  const { camera: cameraStore, renderer, size: SizeStore } = useThrelte()

  let camera = get(cameraStore)
  onDestroy(cameraStore.subscribe((value) => (camera = value)))

  let size = get(SizeStore)
  onDestroy(SizeStore.subscribe((value) => (size = value)))

  if (!renderer) {
    throw new Error('No renderer found. Make sure to call interactivity in a child of <Canvas>.')
  }

  const target = renderer.domElement

  function cancelPointer(intersections: Intersection[]) {
    // cancel pointer
    console.log('cancel pointer')
  }

  const getEventHandler = (name: DomEventName): ((event: DomEvent) => void) => {
    // Deal with cancelation
    if (name === 'pointerleave' || name === 'pointercancel') {
      return () => cancelPointer([])
    }

    return (event: DomEvent) => {
      const isPointerMove = name === 'pointermove'
      const isClickEvent = name === 'click' || name === 'contextmenu' || name === 'dblclick'
      // do stuff
      console.log('do pointer stuff')
    }
  }

  const setPointer = (event: DomEvent) => {
    // pointer.set((event.offsetX / size.width) * 2 - 1, -(event.offsetY / size.height) * 2 + 1)
  }

  DOM_EVENTS.forEach(([eventName, passive]) => {
    target.addEventListener(eventName, getEventHandler(eventName), { passive })
  })

  onDestroy(() => {
    DOM_EVENTS.forEach(([eventName]) => {
      target.removeEventListener(eventName, getEventHandler(eventName))
    })
  })
}
