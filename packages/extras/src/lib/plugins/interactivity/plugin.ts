import { createRawEventDispatcher, injectPlugin } from '@threlte/core'
import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { Object3D } from 'three'
import { useComponentEvents } from './useComponentEvents'

export const eventNames = [
  'click',
  'contextmenu',
  'doubleclick',
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
    const isListeningToEventsStore = writable(false)

    const { eventNames: componentEventNames } = useComponentEvents()

    onDestroy(
      componentEventNames.subscribe((componentEventNames) => {
        isListeningToEventsStore.set(
          componentEventNames.filter((value) => eventNames.includes(value)).length > 0
        )
      })
    )

    onDestroy(
      isListeningToEventsStore.subscribe((isListening) => {
        isListeningToEvents = isListening
        if (isListening) {
          interactiveObjects.add(currentRef)
        }
      })
    )

    const setupEventDispatcher = (ref: Object3D) => {
      ref.userData._threlte_interactivity_dispatcher = createRawEventDispatcher()
    }

    const deleteEventDispatcher = (ref: Object3D) => {
      delete ref.userData._threlte_interactivity_dispatcher
    }

    setupEventDispatcher(currentRef)

    return {
      onRefChange(ref: Object3D) {
        if (!isListeningToEvents) return
        if (ref.uuid !== currentRef.uuid) return

        currentRef = ref

        deleteEventDispatcher(currentRef)
        interactiveObjects.delete(currentRef)

        setupEventDispatcher(ref)
        interactiveObjects.add(ref)
      }
    }
  })
}
