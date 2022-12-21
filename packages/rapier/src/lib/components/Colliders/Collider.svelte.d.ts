import type {
  CoefficientCombineRule,
  Collider as rapierCollider,
  ColliderDesc
} from '@dimforge/rapier3d-compat'
import type { Position, TransformableObjectProperties, Rotation } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'

// ------------------ BASE ------------------

type BaseProps = {
  position?: TransformableObjectProperties['position']
  rotation?: TransformableObjectProperties['rotation']
  scale?: TransformableObjectProperties['scale']
  lookAt?: TransformableObjectProperties['lookAt']
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
  centerOfMass: Position
  principalAngularInertia: Position
  angularInertiaLocalFrame: Rotation

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
