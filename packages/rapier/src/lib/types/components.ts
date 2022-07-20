import type { RigidBody, TempContactManifold } from '@dimforge/rapier3d-compat'
import type { RigidBodyTypeString } from '../lib/parseBodyType'

export type RigidBodyAutoCollider = 'ball' | 'cuboid' | 'hull' | 'trimesh' | false

export type Boolean3Array = [x: boolean, y: boolean, z: boolean]

export type Vector3Array = [x: number, y: number, z: number]

export type RigidBodyProperties = {
  /**
   * Specify the type of this rigid body
   */
  type?: RigidBodyTypeString

  /** Whether or not this body can sleep.
   * default: true
   */
  canSleep?: boolean

  /** The linear velocity of this body.
   * default: zero velocity
   */
  linearVelocity?: Vector3Array

  /** The angular velocity of this body.
   * Default: zero velocity.
   */
  angularVelocity?: Vector3Array

  /**
   * The scaling factor applied to the gravity affecting the rigid-body.
   * Default: 1.0
   */
  gravityScale?: number

  /**
   * Whether or not Continous Collision Detection is enabled for this rigid-body.
   * https://rapier.rs/docs/user_guides/javascript/rigid_bodies#continuous-collision-detection
   * @default false
   */
  ccd?: boolean

  /**
   * Initial position of the RigidBody
   */
  position?: Vector3Array

  /**
   * Initial rotation of the RigidBody
   */
  rotation?: Vector3Array

  /**
   * Automatically generate colliders based on meshes inside this
   * rigid body.
   *
   * You can change the default setting globally by setting the colliders
   * prop on the <Physics /> component.
   *
   * Setting this to false will disable automatic colliders.
   */
  colliders?: RigidBodyAutoCollider | false

  /**
   * Set the friction of auto-generated colliders.
   * This does not affect any non-automatic child collider-components.
   */
  friction?: number

  /**
   * Set the restitution (bounciness) of auto-generated colliders.
   * This does not affect any non-automatic child collider-components.
   */
  restitution?: number

  /**
   * Callback when this rigidbody collides with another rigidbody
   */
  // eslint-disable-next-line no-empty-pattern
  onCollisionEnter?({}: {
    target: RigidBody
    manifold: TempContactManifold
    flipped: boolean
  }): void

  /**
   * Callback when this rigidbody stops colliding with another rigidbody
   */
  // eslint-disable-next-line no-empty-pattern
  onCollisionExit?({}: { target: RigidBody }): void

  onSleep?(): void

  onWake?(): void

  /**
   * Locks all rotations that would have resulted from forces on the created rigid-body.
   */
  lockRotations?: boolean

  /**
   * Locks all translations that would have resulted from forces on the created rigid-body.
   */
  lockTranslations?: boolean

  /**
   * Allow rotation of this rigid-body only along specific axes.
   */
  enabledRotations?: Boolean3Array

  /**
   * Allow rotation of this rigid-body only along specific axes.
   */
  enabledTranslations?: Boolean3Array
}
