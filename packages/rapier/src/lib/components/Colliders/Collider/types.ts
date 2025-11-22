import type {
  CoefficientCombineRule,
  Collider,
  ColliderDesc,
  Collider as RapierCollider
} from '@dimforge/rapier3d-compat'
import type { Snippet } from 'svelte'
import type { Euler, Vector3 } from 'three'
import type { ColliderEvents, CreateEvent } from '../../../types/types.js'

// ------------------ BASE ------------------

type Type = 'static' | 'dynamic'

type BaseProps = {
  /**
   * If a collider is *not* attached to a RigidBody and its type is `static`,
   * its transform is only applied once on initialization. If the transform
   * should be updated every frame, set the type to `dynamic`.
   */
  type?: Type
  /** The restitution coefficient of this collider. */
  restitution?: number
  /** he rule used to combine the restitution coefficients of two colliders involved in a contact. */
  restitutionCombineRule?: CoefficientCombineRule
  /** The friction coefficient of this collider. */
  friction?: number
  /** The rule used to combine the friction coefficients of two colliders involved in a contact. */
  frictionCombineRule?: CoefficientCombineRule
  /** Whether this collider is a sensor. A sensor collider does not generate
   * contacts. They only generate intersection events when one sensor collider
   * and another collider start/stop touching. Sensor colliders are generally
   * used to detect when something enters an area. Note that, for symmetry with
   * non-sensor colliders, sensors do contribute to the mass of a rigid-body
   * they are attached to.
   */
  sensor?: boolean
  collider?: RapierCollider
  /** The total force magnitude beyond which a contact force event can be emitted. */
  contactForceEventThreshold?: number
}

// ------------------ SHAPE ------------------

/**
 * The shape of the collider.
 */
export type Shape =
  | 'ball'
  | 'capsule'
  | 'segment'
  | 'triangle'
  | 'roundTriangle'
  | 'polyline'
  | 'trimesh'
  | 'cuboid'
  | 'roundCuboid'
  | 'heightfield'
  | 'cylinder'
  | 'roundCylinder'
  | 'cone'
  | 'roundCone'
  | 'convexHull'
  | 'convexMesh'
  | 'roundConvexHull'
  | 'roundConvexMesh'

type Args<TShape extends Shape> = Parameters<(typeof ColliderDesc)[TShape]>

type ShapeProps<TShape extends Shape> = {
  shape: TShape
  args: Args<TShape>
}

// ------------------ MASS ------------------

type Density = {
  /** The density of this collider. */
  density: number
  mass?: never
  centerOfMass?: never
  principalAngularInertia?: never
  angularInertiaLocalFrame?: never
}
type Mass = {
  /** The mass of this collider. */
  mass: number
  density?: never
  centerOfMass?: never
  principalAngularInertia?: never
  angularInertiaLocalFrame?: never
}
type MassProperties = {
  /** The mass of this collider. */
  mass: number
  /** The center of mass of this collider. */
  centerOfMass: Parameters<Vector3['set']>
  /** The principal angular inertia of this collider. */
  principalAngularInertia: Parameters<Vector3['set']>
  /** The angular inertia local frame of this collider. */
  angularInertiaLocalFrame: Parameters<Euler['set']>
  density?: never
}

type NoMassProperties = {
  density?: never
  mass?: never
  centerOfMass?: never
  principalAngularInertia?: never
  angularInertiaLocalFrame?: never
}

export type MassDef = Density | Mass | MassProperties | NoMassProperties

type MassProps<TMassDef extends MassDef> = TMassDef extends Density
  ? Density
  : TMassDef extends MassProperties
    ? MassProperties
    : TMassDef extends Mass
      ? Mass
      : NoMassProperties

// ------------------ COLLIDER ------------------

export type ColliderProps<TShape extends Shape, TMassDef extends MassDef> = CreateEvent<Collider> &
  ColliderEvents &
  BaseProps &
  ShapeProps<TShape> &
  MassProps<TMassDef> & {
    children?: Snippet<[{ collider?: RapierCollider }]>
  }
