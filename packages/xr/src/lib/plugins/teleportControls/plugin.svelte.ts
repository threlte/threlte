import { injectPlugin, isInstanceOf } from '@threlte/core'
import { useTeleportControls } from './context.js'

/**
 * Registers T components with "teleportSurface" or "teleportBlocker" attributes.
 */
export const injectTeleportControlsPlugin = (): void => {
  injectPlugin('threlte-teleport-controls', (args) => {
    if (!isInstanceOf(args.ref, 'Mesh')) return
    if (!('teleportSurface' in args.props)) return

    const { addSurface, removeSurface } = useTeleportControls()

    $effect(() => {
      const { ref } = args

      if (args.props.isSurface) {
        addSurface(ref, args.props)
      }

      return () => removeSurface(ref)
    })

    return {
      pluginProps: ['teleportSurface']
    }
  })

  injectPlugin('threlte-teleport-controls-blockers', (args) => {
    if (!isInstanceOf(args.ref, 'Mesh')) return
    if (!('teleportBlocker' in args.props)) return

    const { addBlocker, removeBlocker } = useTeleportControls()

    $effect(() => {
      const { ref } = args

      if (args.props.isBlocker) {
        addBlocker(ref)
      }

      return () => removeBlocker(ref)
    })

    return {
      pluginProps: ['teleportBlocker']
    }
  })
}
