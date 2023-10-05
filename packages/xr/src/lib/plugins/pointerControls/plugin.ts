import { injectPlugin, watch } from '@threlte/core'
import { writable } from 'svelte/store'
import type { Mesh } from 'three'
import { usePointerControls } from './hook'
import { useComponentHasEventHandlers } from './useComponentEventHandlers'

export type PointerControlsOptions = {}

export const injectPointerControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', ({ ref }) => {
    if (!ref.isMesh) return

    const { addInteractiveObject, removeInteractiveObject } = usePointerControls()

    const refStore = writable<Mesh>(ref)

    const { hasEventHandlers } = useComponentHasEventHandlers()

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
