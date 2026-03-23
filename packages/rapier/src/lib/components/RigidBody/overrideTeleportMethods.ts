import type { RigidBody } from '@dimforge/rapier3d-compat'
import type { Object3D } from 'three'

export type ExtractMethods<ObjectType> = Pick<
  ObjectType,
  {
    [Method in keyof ObjectType]: ObjectType[Method] extends (...args: any[]) => any
      ? Method
      : never
  }[keyof ObjectType]
>

type RigidBodyMethod = Exclude<keyof ExtractMethods<RigidBody>, undefined>

const overrideMethods: {
  position: RigidBodyMethod[]
  rotation: RigidBodyMethod[]
} = {
  position: ['setTranslation', 'setNextKinematicTranslation'],
  rotation: ['setRotation', 'setNextKinematicRotation']
}

/**
 * When using a fixed framerate, Threlte is interpolating the position and
 * rotation of RigidBody objects. Sometimes, this is not desirable, especially
 * when using methods on the rigidbody that teleport the object, e.g. should
 * lead to a sudden change in translation/rotation such as `rb.setTranslation`.
 * These methods are overridden to reset the physics simulation position and
 * rotation to the current object position and rotation.
 */
export const overrideTeleportMethods = (rb: RigidBody, object: Object3D) => {
  const originalMethods: Partial<Record<RigidBodyMethod, any>> = {}

  overrideMethods.position.forEach((method) => {
    originalMethods[method] = rb[method].bind(rb)
    const proxy = (...args: any[]) => {
      object.userData.physics.resetPosition = true
      return originalMethods[method](...args)
    }
    rb[method] = proxy
  })

  overrideMethods.rotation.forEach((method) => {
    originalMethods[method] = rb[method].bind(rb)
    const proxy = (...args: any[]) => {
      object.userData.physics.resetRotation = true
      return originalMethods[method](...args)
    }
    rb[method] = proxy
  })
}
