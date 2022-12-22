import type {
  CoefficientCombineRule,
  Collider as rapierCollider,
  ColliderDesc
} from '@dimforge/rapier3d-compat'
import { SvelteComponentTyped } from 'svelte'
import type { Euler, Vector3 } from 'three'

// ------------------ BASE ------------------

type BaseProps = {
  position?: Parameters<Vector3['set']>
  rotation?: Parameters<Euler['set']>
  scale?: Parameters<Vector3['set']>
  restitution?: number
  restitutionCombineRule?: CoefficientCombineRule
  friction?: number
  frictionCombineRule?: CoefficientCombineRule
  sensor?: boolean
  collider?: rapierCollider
  contactForceEventThreshold?: number
}

// ------------------ SHAPE ------------------

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

type Args<TShape extends Shape> = Parameters<typeof ColliderDesc[TShape]>

type ShapeProps<TShape extends Shape> = {
  shape: TShape
  args: Args<TShape>
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

export type ColliderProps<TShape extends Shape, TMassDef extends MassDef> = BaseProps &
  ShapeProps<TShape> &
  MassProps<TMassDef>

export default class Collider<
  TShape extends Shape,
  TMassDef extends MassDef
> extends SvelteComponentTyped<ColliderProps<TShape, TMassDef>> {}
