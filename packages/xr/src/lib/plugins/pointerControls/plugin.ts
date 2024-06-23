import { injectPlugin, watch } from '@threlte/core'
import { writable } from 'svelte/store'
import type { Object3D } from 'three'
import { usePointerControls } from './hook'

export const injectPointerControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', ({ ref, props }) => {
    if (!ref.isObject3D) return

    const { addInteractiveObject, removeInteractiveObject } = usePointerControls()

    const refStore = writable<Object3D>(ref)

    watch(refStore, ($refStore) => {
      if (props === undefined) return
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
