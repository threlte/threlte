import { writable } from 'svelte/store'
import { watch } from '@threlte/core'
import { injectPlugin } from '@threlte/core'
import { useTeleportControls } from './hook'

const noop = () => {}

export const injectTeleportControlsPlugin = (): void => {
  injectPlugin('threlte-pointer-controls', ({ ref, props }) => {
    if (!ref.isMesh) return

    const isSurface = 'teleportSurface' in props
    const isBlocker = 'teleportBlocker' in props
    if (!isSurface && !isBlocker) return

    const { addBlocker, addSurface, removeBlocker, removeSurface } = useTeleportControls()
    const refStore = writable<THREE.Mesh>(ref)
    const propsStore = writable(props)

    watch([refStore, propsStore], ([ref, props]) => {
      if (isSurface) {
        if (props.teleportSurface === false) {
          removeSurface(ref)
          return noop
        } else {
          addSurface(ref)
          return () => removeSurface(ref)
        }
      } else if (isBlocker) {
        if (props.teleportBlocker === false) {
          removeBlocker(ref)
          return noop
        } else {
          addBlocker(ref)
          return () => removeBlocker(ref)
        }
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