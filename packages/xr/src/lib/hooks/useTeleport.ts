import { Quaternion, type Vector3, type Vector3Tuple } from 'three'
import { useThrelte } from '@threlte/core'
import { xrOrigin } from './useXROrigin.svelte.js'

/**
 * Returns a callback that teleports the player to a target position and optional orientation.
 *
 * When used inside an `<XROrigin>` subtree, the origin group is translated directly — the
 * user's feet end up at the target, and their room-scale offset from the origin is preserved.
 *
 * When used outside `<XROrigin>`, the underlying `XRReferenceSpace` is mutated to compensate
 * for the viewer's current position so the feet end up at the target regardless of where the
 * user has walked in their physical space.
 *
 * @example
 * const teleport = useTeleport()
 * teleport([5, 0, 5])
 *
 * const quat = new THREE.Quaternion()
 * teleport(new THREE.Vector3(5, 0, 5), quat)
 */
export const useTeleport = () => {
  const { xr } = useThrelte().renderer
  const defaultOrientation = new Quaternion()
  const offset = { x: 0, y: 0, z: 0 }

  return (position: Vector3 | Vector3Tuple, orientation = defaultOrientation) => {
    const origin = xrOrigin.current
    if (origin !== undefined) {
      if (Array.isArray(position)) {
        origin.position.set(position[0], position[1], position[2])
      } else {
        origin.position.copy(position)
      }
      origin.quaternion.copy(orientation)
      return
    }

    const space = xr.getReferenceSpace()

    if (space === null) return

    if (Array.isArray(position)) {
      offset.x = -position[0]
      offset.y = -position[1]
      offset.z = -position[2]
    } else {
      offset.x = -position.x
      offset.y = -position.y
      offset.z = -position.z
    }

    const pose = xr.getFrame()?.getViewerPose(space)
    if (pose !== undefined) {
      offset.x += pose.transform.position.x
      offset.z += pose.transform.position.z
    }

    const teleportOffset = new XRRigidTransform(offset, orientation)
    xr.setReferenceSpace(space.getOffsetReferenceSpace(teleportOffset))
  }
}
