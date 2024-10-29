import { injectPlugin, isInstanceOf, observe } from '@threlte/core'
import { useTeleportControls } from './context'

/**
 * Registers T components with "teleportSurface" or "teleportBlocker" attributes.
 */
export const injectTeleportControlsPlugin = (): void => {
  injectPlugin('threlte-teleport-controls', (args) => {
    if (!isInstanceOf(args.ref, 'Mesh')) return

    const isSurface = $derived('teleportSurface' in args.props && !!args.props.teleportSurface)
    const isBlocker = $derived('teleportBlocker' in args.props && !!args.props.teleportBlocker)

    const surfaceRef = $derived(isSurface ? args.ref : undefined)
    const blockerRef = $derived(isBlocker ? args.ref : undefined)

    if (!isSurface && !isBlocker) return

    const { addBlocker, addSurface, removeBlocker, removeSurface } = useTeleportControls()

    observe.pre(
      () => [surfaceRef, blockerRef],
      ([surfaceRef, blockerRef]) => {
        if (surfaceRef) {
          addSurface(surfaceRef, args.props)
          return removeSurface(surfaceRef)
        } else if (blockerRef) {
          addBlocker(blockerRef)
          return removeBlocker(blockerRef)
        }
      }
    )

    return {
      pluginProps: ['teleportSurface', 'teleportBlocker']
    }
  })
}
