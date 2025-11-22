import type { CoefficientCombineRule, Collider } from '@dimforge/rapier3d-compat'
import type { Snippet } from 'svelte'
import type { Euler, Vector3 } from 'three'
import type { AutoCollidersShapes, ColliderEvents, CreateEvent } from '../../../types/types.js'

// ------------------ BASE ------------------

type BaseProps = {
  /**
   * The shape of the collider.
   */
  shape?: AutoCollidersShapes
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
  colliders?: Collider[]
  /** The total force magnitude beyond which a contact force event can be emitted. */
  contactForceEventThreshold?: number
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

export type AutoCollidersProps<TMassDef extends MassDef> = CreateEvent<Collider[]> &
  ColliderEvents &
  BaseProps &
  MassProps<TMassDef> & {
    children?: Snippet<
      [
        {
          colliders: Collider[]
          refresh: () => void
        }
      ]
    >
  }
