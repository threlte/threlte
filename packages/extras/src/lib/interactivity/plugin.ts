import { injectPlugin, watch } from '@threlte/core'
import { derived, writable } from 'svelte/store'
import { Object3D } from 'three'
import { useInteractivity } from './hook'
import type { ThrelteEvents } from './types'
import { useComponentEvents } from './useComponentEvents'

export const interactivityEventNames: (keyof ThrelteEvents)[] = [
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

export const injectInteractivityPlugin = (): void => {
  injectPlugin('interactivity', ({ ref }) => {
    if (!(ref instanceof Object3D)) return

    const { addInteractiveObject, removeInteractiveObject } = useInteractivity()

    const refStore = writable<Object3D>(ref)

    const { callbacks } = useComponentEvents(undefined, interactivityEventNames)
    const isListeningToEvents = derived(callbacks, (callbacks) => Object.keys(callbacks).length > 0)

    watch([isListeningToEvents, refStore], ([isListeningToEvents, ref]) => {
      if (!isListeningToEvents) return
      addInteractiveObject(ref)
      return () => removeInteractiveObject(ref)
    })

    return {
      onRefChange(ref) {
        refStore.set(ref)
      }
    }
  })
}
