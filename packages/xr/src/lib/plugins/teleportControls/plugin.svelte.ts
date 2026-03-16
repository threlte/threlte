import { injectPlugin, isInstanceOf } from '@threlte/core'
import { useTeleportControls } from './context.js'
import type { Mesh } from 'three'

/**
 * Registers T components with "teleportSurface" or "teleportBlocker" attributes.
 */
export const injectTeleportControlsPlugin = (): void => {
  injectPlugin('threlte-teleport-controls-surfaces', (args) => {
    if (!isInstanceOf(args.ref, 'Mesh')) return
    if (!('teleportSurface' in args.props)) return

    let ref = $state<Mesh | undefined>(args.ref)
    let isSurface = $state<boolean>(args.props.teleportSurface)

    const { addSurface, removeSurface } = useTeleportControls()

    $effect(() => {
      if (!ref) return

      const mesh = ref

      if (isSurface) {
        addSurface(mesh, args.props)
      } else {
        removeSurface(mesh)
      }

      return () => removeSurface(mesh)
    })

    return {
      pluginProps: ['teleportSurface'],
      onRefChange: (nextRef: Mesh) => {
        ref = nextRef
        return () => {
          ref = undefined
        }
      },
      onPropsChange: (props: { teleportSurface: boolean }) => {
        isSurface = props.teleportSurface
      }
    }
  })

  injectPlugin('threlte-teleport-controls-blockers', (args) => {
    if (!isInstanceOf(args.ref, 'Mesh')) return
    if (!('teleportBlocker' in args.props)) return

    let ref = $state<Mesh | undefined>(args.ref)
    let isBlocker = $state<boolean>(args.props.teleportBlocker)

    const { addBlocker, removeBlocker } = useTeleportControls()

    $effect(() => {
      if (!ref) return

      const mesh = ref

      if (isBlocker) {
        addBlocker(mesh)
      } else {
        removeBlocker(mesh)
      }

      return () => removeBlocker(mesh)
    })

    return {
      pluginProps: ['teleportBlocker'],
      onRefChange: (nextRef: Mesh) => {
        ref = nextRef
        return () => {
          ref = undefined
        }
      },
      onPropsChange: (props: { teleportBlocker: boolean }) => {
        isBlocker = props.teleportBlocker
      }
    }
  })
}
