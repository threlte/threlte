import type { CoefficientCombineRule, ColliderDesc } from '@dimforge/rapier3d-compat'
import type { Position, TransformableObjectProperties } from '@threlte/core'
import type { AutoCollidersShapes, ColliderShapes, CollisionGroupsBitMask } from './types'

export type Vector3Array = [x: number, y: number, z: number]

export type GravityType = 'static' | 'linear' | 'newtonian'

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
