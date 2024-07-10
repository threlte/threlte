import type { Mesh } from 'three'
import { writable } from 'svelte/store'
import { watch } from '@threlte/core'
import { injectPlugin } from '@threlte/core'
import { useTeleportControls } from './context'

/**
 * Registers T components with "teleportSurface" or "teleportBlocker" attributes.
 */
export const injectTeleportControlsPlugin = (): void => {
  const noop = () => {}

  injectPlugin('threlte-teleport-controls', ({ ref, props }) => {
    if (!ref.isMesh) return

    const isSurface = 'teleportSurface' in props
    const isBlocker = 'teleportBlocker' in props

    if (!isSurface && !isBlocker) return

    const { addBlocker, addSurface, removeBlocker, removeSurface } = useTeleportControls()
    const refStore = writable<Mesh>(ref)
    const propsStore = writable(props)

    watch([refStore, propsStore], ([$refStore, $propsStore]) => {
      if (isSurface) {
        if ($propsStore.teleportSurface === false) {
          removeSurface($refStore)
          return noop
        } else {
          addSurface($refStore, props)
          return () => removeSurface($refStore)
        }
      } else if (isBlocker) {
        if (props.teleportBlocker === false) {
          removeBlocker($refStore)
          return noop
        } else {
          addBlocker($refStore)
          return () => removeBlocker($refStore)
        }
      } else {
        return noop
      }
    })

    return {
      onRefChange(ref) {
        refStore.set(ref)
      },
      onPropsChange(props) {
        propsStore.set(props)
      }
    }
  })
}
