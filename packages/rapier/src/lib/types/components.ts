import type { CoefficientCombineRule, ColliderDesc } from '@dimforge/rapier3d-compat'
import type { Position, Rotation, TransformableObjectProperties } from '@threlte/core'
import type { RigidBodyTypeString } from '../lib/parseRigidBodyType'
import type { AutoCollidersShapes, ColliderShapes, CollisionGroupsBitMask } from './types'

export type Boolean3Array = [x: boolean, y: boolean, z: boolean]

export type Vector3Array = [x: number, y: number, z: number]

export type GravityType = 'static' | 'linear' | 'newtonian'

export type RigidBodyProperties = Omit<TransformableObjectProperties, 'object'> & {
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
  linearVelocity?: Position

  /** The angular velocity of this body.
   * Default: zero velocity.
   */
  angularVelocity?: Rotation

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

  /**
   * Dominance is a non-realistic, but sometimes useful, feature.
   * It can be used to make one rigid-body immune to forces
   * originating from contacts with some other bodies.
   *
   * Number in the range -127 to 127, default is 0
   */
  dominance?: number

  /**
   * Damping lets you slow down a rigid-body automatically. This can be used to
   * achieve a wide variety of effects like fake air friction. Larger values of
   * damping coefficients lead to a stronger slow-downs. Their default
   * values are 0.0 (no damping at all).
   */
  linearDamping?: number

  /**
   * Damping lets you slow down a rigid-body automatically. This can be used to
   * achieve a wide variety of effects like fake air friction. Larger values of
   * damping coefficients lead to a stronger slow-downs. Their default
   * values are 0.0 (no damping at all).
   */
  angularDamping?: number
}

export type ColliderProperties<Shape extends ColliderShapes> = Omit<
  TransformableObjectProperties,
  'object'
> & {
  shape: Shape

  /**
   * Arguments to pass to the collider specific to shape
   */
  args: Parameters<typeof ColliderDesc[Shape]>

  /**
   * The mass of this rigid body.
   * The mass and density is automatically calculated based on the shape of the collider.
   * Generally, it's not recommended to adjust the mass properties as it could lead to
   * unexpected behaviors.
   * More info https://rapier.rs/docs/user_guides/javascript/colliders#mass-properties
   */
  mass?: number

  density?: number

  /**
   * The center of mass of this rigid body
   */
  centerOfMass?: Position

  /**
   * Principal angular inertia of this rigid body
   */
  principalAngularInertia?: Position

  /**
   * Restitution controls how elastic (aka. bouncy) a contact is. Le elasticity of a contact is controlled by the restitution coefficient
   */
  restitution?: number

  /**
   * What happens when two bodies meet. See https://rapier.rs/docs/user_guides/javascript/colliders#friction.
   */
  restitutionCombineRule?: CoefficientCombineRule

  /**
   * Friction is a force that opposes the relative tangential motion between two rigid-bodies with colliders in contact.
   * A friction coefficient of 0 implies no friction at all (completely sliding contact) and a coefficient
   * greater or equal to 1 implies a very strong friction. Values greater than 1 are allowed.
   */
  friction?: number

  /**
   * What happens when two bodies meet. See https://rapier.rs/docs/user_guides/javascript/colliders#friction.
   */
  frictionCombineRule?: CoefficientCombineRule

  /**
   * A sensor does not participate in  physics simulation and is
   * used as a trigger e.g. to check whether another RigidBody
   * entered an area.
   */
  sensor?: boolean
}

export type AutoCollidersProperties = Omit<ColliderProperties<AutoCollidersShapes>, 'args'>

export type CollisionGroupsProperties =
  | {
      groups: CollisionGroupsBitMask
    }
  | {
      filter: CollisionGroupsBitMask
      memberships: CollisionGroupsBitMask
    }

export type AttractorProperties = Omit<TransformableObjectProperties, 'object'> & {
  /**
   * The radius for the Attractor's sphere of influence within which rigid-bodies will be affected.
   * Default: 10.0
   */
  range?: number
  /**
   * The strength factor applied to the impulse affecting rigid-bodies within range. For newtonian
   * calculations, strength is treated as m1 mass.
   * Default: 1.0
   */
  strength?: number
  /**
   * The method of calculating gravity on rigid bodies within range.
   * 'static' = the same force (strength) is applied on bodies within range, regardless of distance
   * 'linear' = force is calculated as strength * distance / range (force decreases the farther a body is from the attractor position)
   * 'newtonian' = force is calculated as gravitationalConstant * mass1 * mass2 / Math.pow(distance, 2)
   * Default: 'static'
   */
  gravityType?: GravityType
  /**
   * The gravitational constant used to calculate force in newtonian calculations. Most people probably won't use this,
   * but it provides an option for more realistic physics simulations.
   * Default: 6.673e-11
   */
  gravitationalConstant?: number
}
