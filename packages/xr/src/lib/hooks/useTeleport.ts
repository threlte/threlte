import { Matrix4, Quaternion, Vector3, type Vector3Tuple } from 'three'
import { useThrelte } from '@threlte/core'
import { useXROrigin } from './useXROrigin.svelte.js'

const defaultOrientation = new Quaternion()
const offset = { x: 0, y: 0, z: 0 }
const targetPosition = new Vector3()
const localOffset = new Vector3()
const worldOffset = new Vector3()
const originWorldPosition = new Vector3()
const parentWorldQuaternion = new Quaternion()
const localQuaternion = new Quaternion()
const inverseParentQuaternion = new Quaternion()
const localBasis = new Matrix4()
const worldBasis = new Matrix4()
const inverseParentMatrix = new Matrix4()

/**
 * Returns a callback that teleports the player to a target position and optional orientation.
 *
 * When used inside `<XROrigin>`, the origin group is translated directly — the
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
  const xrOrigin = useXROrigin()

  return (position: Vector3 | Vector3Tuple, orientation = defaultOrientation) => {
    const currentOrigin = xrOrigin.current
    if (currentOrigin !== undefined) {
      if (Array.isArray(position)) {
        targetPosition.set(position[0], position[1], position[2])
      } else {
        targetPosition.copy(position)
      }

      const parent = currentOrigin.parent
      const space = xr.getReferenceSpace()
      const pose = space === null ? undefined : xr.getFrame()?.getViewerPose(space)

      localOffset.set(0, 0, 0)
      if (pose !== undefined && pose !== null) {
        localOffset.set(pose.transform.position.x, 0, pose.transform.position.z)
      }

      if (parent === null) {
        localQuaternion.copy(orientation)
        worldBasis.compose(originWorldPosition.set(0, 0, 0), localQuaternion, currentOrigin.scale)
        worldOffset.copy(localOffset).applyMatrix4(worldBasis)
        currentOrigin.position.copy(targetPosition).sub(worldOffset)
        currentOrigin.quaternion.copy(localQuaternion)
      } else {
        parent.updateWorldMatrix(true, false)
        parent.getWorldQuaternion(parentWorldQuaternion)

        inverseParentQuaternion.copy(parentWorldQuaternion).invert()
        localQuaternion.copy(inverseParentQuaternion).multiply(orientation)

        localBasis.compose(originWorldPosition.set(0, 0, 0), localQuaternion, currentOrigin.scale)
        worldBasis.copy(parent.matrixWorld).multiply(localBasis)
        worldOffset.copy(localOffset).applyMatrix4(worldBasis)

        originWorldPosition.copy(targetPosition).sub(worldOffset)
        inverseParentMatrix.copy(parent.matrixWorld).invert()
        currentOrigin.position.copy(originWorldPosition.applyMatrix4(inverseParentMatrix))
        currentOrigin.quaternion.copy(localQuaternion)
      }

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
