import { injectPlugin, watch } from '@threlte/core'
import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import { usePointerControls } from './hook'
import { events, type ThrelteXREvents } from './types'

export const injectPointerControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', ({ ref, props }) => {
    if (!ref.isObject3D) return

    const { addInteractiveObject, removeInteractiveObject } = usePointerControls()

    const refStore = writable<Object3D>(ref)

    watch(refStore, ($refStore) => {
      const hasEventHandlers = Object.entries(props).some(([key, value]) => {
        return value !== undefined && events.includes(key as keyof ThrelteXREvents)
      })

      if (!hasEventHandlers) return

      addInteractiveObject($refStore, props)
      return () => removeInteractiveObject($refStore)
    })

    return {
      onRefChange(ref) {
        refStore.set(ref)
      }
    }
  })
}
