import type { RigidBody } from '@dimforge/rapier3d-compat'
import type { Object3D } from 'three'

/**
 * When using a fixed framerate, Threlte is interpolating the position and
 * rotation of RigidBody objects. Sometimes, this is not desirable, especially
 * when using methods on the rigidbody that teleport the object, e.g. should
 * lead to a sudden change in translation/rotation such as `rb.setTranslation`.
 * These methods are overridden to reset the physics simulation position and
 * rotation to the current object position and rotation.
 */
export const overrideTeleportMethods = (rb: () => RigidBody, object: () => Object3D) => {
  $effect(() => {
    const currentRb = rb()
    const currentObject = object()

    const { setTranslation, setNextKinematicTranslation, setRotation, setNextKinematicRotation } =
      currentRb

    currentRb.setTranslation = (tra, wakeUp) => {
      currentObject.userData.physics.resetPosition = true
      setTranslation.call(currentRb, tra, wakeUp)
    }
    currentRb.setNextKinematicTranslation = (t) => {
      currentObject.userData.physics.resetPosition = true
      setNextKinematicTranslation.call(currentRb, t)
    }
    currentRb.setRotation = (rot, wakeUp) => {
      currentObject.userData.physics.resetRotation = true
      setRotation.call(currentRb, rot, wakeUp)
    }
    currentRb.setNextKinematicRotation = (rot) => {
      currentObject.userData.physics.resetRotation = true
      setNextKinematicRotation.call(currentRb, rot)
    }

    return () => {
      currentRb.setTranslation = setTranslation
      currentRb.setNextKinematicTranslation = setNextKinematicTranslation
      currentRb.setRotation = setRotation
      currentRb.setNextKinematicRotation = setNextKinematicRotation
    }
  })
}
