import { injectPlugin, watch } from '@threlte/core'
import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import { useInteractivity } from './hook'
import type { ThrelteEvents } from './types'
import { useComponentHasEventHandlers } from './useComponentHasEventHandlers'

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
    if (!ref.isObject3D) return

    const { addInteractiveObject, removeInteractiveObject } = useInteractivity()

    const refStore = writable<Object3D>(ref)

    const { hasEventHandlers } = useComponentHasEventHandlers(interactivityEventNames)

    watch([hasEventHandlers, refStore], ([hasEventHandlers, ref]) => {
      // Because hasEventHandlers will only be set from false to true in the
      // lifecycle of the component, we can safely assume that we do not need to
      // remove the object from the list of interactive objects when
      // hasEventHandlers is false.
      if (!hasEventHandlers) return
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
