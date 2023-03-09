import { createRawEventDispatcher, injectPlugin } from '@threlte/core'
import { Object3D } from 'three'
import type { EventMap } from './types'
import { useComponentEvents } from './useComponentEvents'

export const interactivityEventNames: (keyof EventMap)[] = [
  'click',
  'contextmenu',
  'dblclick',
  'wheel',
  'pointerup',
  'pointerdown',
  'pointerover',
  'pointerout',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointermissed'
]

export const injectInteractivityPlugin = (interactiveObjects: Set<Object3D>) => {
  injectPlugin('interactivity', ({ ref }) => {
    if (!(ref instanceof Object3D)) return

    let currentRef = ref

    let isListeningToEvents = false

    const eventDispatcher = createRawEventDispatcher()

    const addInteractivity = (ref: Object3D) => {
      ref.userData._threlte_interactivity_dispatcher = eventDispatcher
      interactiveObjects.add(currentRef)
    }

    const removeInteractivity = (ref: Object3D) => {
      interactiveObjects.delete(currentRef)
      delete ref.userData._threlte_interactivity_dispatcher
    }

    useComponentEvents(() => {
      isListeningToEvents = true
      addInteractivity(currentRef)
    }, interactivityEventNames as unknown as string[])

    return {
      onRefChange(ref: Object3D) {
        if (!isListeningToEvents || ref.uuid === currentRef.uuid) return

        currentRef = ref

        removeInteractivity(currentRef)
        addInteractivity(ref)
      }
    }
  })
}
