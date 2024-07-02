import { injectPlugin, watch } from '@threlte/core'
import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import { useInteractivity } from './context'
import type { ThrelteEvents } from './types'

export const interactivityEventNames: (keyof ThrelteEvents)[] = [
  'onclick',
  'oncontextmenu',
  'ondblclick',
  'onwheel',
  'onpointerup',
  'onpointerdown',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onpointermove',
  'onpointermissed'
]

export const injectInteractivityPlugin = (): void => {
  injectPlugin('interactivity', ({ ref, props }) => {
    if (!ref.isObject3D) return

    const context = useInteractivity()

    const refStore = writable<Object3D>(ref)

    watch(refStore, ($refStore) => {
      const hasEventHandlers = Object.entries(props).some(([key, value]) => {
        return value !== undefined && interactivityEventNames.includes(key as keyof ThrelteEvents)
      })

      if (!hasEventHandlers) return

      context.addInteractiveObject($refStore, props)
      return () => context.removeInteractiveObject($refStore)
    })

    return {
      onRefChange(ref) {
        refStore.set(ref)
      }
    }
  })
}
