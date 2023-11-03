import { writable } from 'svelte/store'
import { watch } from '@threlte/core'
import { injectPlugin } from '@threlte/core'
import { useTeleportControls } from './hook'

export const injectTeleportControlsPlugin = (): void => {
  const noop = () => {}

  injectPlugin('threlte-pointer-controls', ({ ref, props }) => {
    if (!ref.isMesh) return

    const isSurface = 'teleportSurface' in props
    const isBlocker = 'teleportBlocker' in props
    if (!isSurface && !isBlocker) return

    const { addBlocker, addSurface, removeBlocker, removeSurface } = useTeleportControls()
    const refStore = writable<THREE.Mesh>(ref)
    const propsStore = writable(props)

    watch([refStore, propsStore], ([nextRef, nextProps]) => {
      if (isSurface) {
        if (nextProps.teleportSurface === false) {
          removeSurface(nextRef)
          return noop
        } else {
          addSurface(nextRef)
          return () => removeSurface(nextRef)
        }
      } else if (isBlocker) {
        if (props.teleportBlocker === false) {
          removeBlocker(nextRef)
          return noop
        } else {
          addBlocker(nextRef)
          return () => removeBlocker(nextRef)
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