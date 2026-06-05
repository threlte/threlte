import { injectPlugin } from '@threlte/core'
import { useTeleportControls } from './context.js'

/**
 * Registers T components with "teleportSurface" or "teleportBlocker" attributes.
 */
export const injectTeleportControlsPlugin = (): void => {
  injectPlugin('threlte-teleport-controls-surfaces', (args) => {
    const { addSurface, removeSurface } = useTeleportControls()

    $effect(() => {
      const currentProps = args.props
      const currentRef = args.ref

      if (currentProps.teleportSurface) {
        addSurface(currentRef, currentProps)
      }

      return () => removeSurface(currentRef)
    })

    return {
      pluginProps: ['teleportSurface']
    }
  })

  injectPlugin('threlte-teleport-controls-blockers', (args) => {
    const { addBlocker, removeBlocker } = useTeleportControls()

    $effect(() => {
      const currentRef = args.ref

      if (args.props.teleportBlocker) {
        addBlocker(currentRef)
      }

      return () => removeBlocker(currentRef)
    })

    return {
      pluginProps: ['teleportBlocker']
    }
  })
}
