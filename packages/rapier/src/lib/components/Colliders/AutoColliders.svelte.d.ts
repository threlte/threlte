import type { CoefficientCombineRule, Collider } from '@dimforge/rapier3d-compat'
import { SvelteComponent } from 'svelte'
import type { Euler, Vector3 } from 'three'
import type { AutoCollidersShapes, ColliderEventMap } from '../../types/types'

// ------------------ BASE ------------------

type BaseProps = {
  shape?: AutoCollidersShapes
  restitution?: number
  restitutionCombineRule?: CoefficientCombineRule
  friction?: number
  frictionCombineRule?: CoefficientCombineRule
  sensor?: boolean
  colliders?: Collider[]
  contactForceEventThreshold?: number
  refresh?: () => void
}

// ------------------ MASS ------------------

type Density = {
  density: number

  mass?: never
  centerOfMass?: never
  principalAngularInertia?: never
  angularInertiaLocalFrame?: never
}

type Mass = {
  mass: number
  density?: never
  centerOfMass?: never
  principalAngularInertia?: never
  angularInertiaLocalFrame?: never
}

type MassProperties = {
  mass: number
  centerOfMass: Parameters<Vector3['set']>
  principalAngularInertia: Parameters<Vector3['set']>
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

export type AutoCollidersProps<TMassDef extends MassDef> = BaseProps & MassProps<TMassDef>

type AutoCollidersSlots = {
  default: {
    colliders: Collider[]
    refresh: () => void
  }
}

export default class AutoColliders<TMassDef extends MassDef> extends SvelteComponent<
  AutoCollidersProps<TMassDef>,
  ColliderEventMap,
  AutoCollidersSlots
> {}
