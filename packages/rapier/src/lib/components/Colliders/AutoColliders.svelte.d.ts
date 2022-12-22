import type { CoefficientCombineRule, Collider } from '@dimforge/rapier3d-compat'
import type { Position, Rotation } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Euler, Vector3 } from 'three'
import type { AutoCollidersShapes } from '../../types/types'

// ------------------ BASE ------------------

type BaseProps = {
  shape?: AutoCollidersShapes
  position?: Parameters<Vector3['set']>
  rotation?: Parameters<Euler['set']>
  scale?: Parameters<Vector3['set']>
  restitution?: number
  restitutionCombineRule?: CoefficientCombineRule
  friction?: number
  frictionCombineRule?: CoefficientCombineRule
  sensor?: boolean
  colliders?: Collider[]
  contactForceEventThreshold?: number
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

export default class AutoColliders<TMassDef extends MassDef> extends SvelteComponentTyped<
  AutoCollidersProps<TMassDef>
> {}
