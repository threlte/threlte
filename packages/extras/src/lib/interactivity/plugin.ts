import { injectPlugin, watch } from '@threlte/core'
import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import { useInteractivity } from './context'
import type { ThrelteEvents } from './types'

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
  injectPlugin('interactivity', ({ ref, props }) => {
    if (!ref.isObject3D) return

    const context = useInteractivity()

    const refStore = writable<Object3D>(ref)

    watch(refStore, ($refStore) => {
      if (props.$$events === undefined) return

      const hasEventHandlers = Object.keys(props.$$events).some((value) =>
        interactivityEventNames.includes(value as keyof ThrelteEvents)
      )

      if (!hasEventHandlers) return

      context.addInteractiveObject($refStore, props.$$events)
      return () => context.removeInteractiveObject($refStore)
    })

    return {
      onRefChange(ref) {
        refStore.set(ref)
      }
    }
  })
}
