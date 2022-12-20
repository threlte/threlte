import type {
  CoefficientCombineRule,
  Collider as rapierCollider,
  ColliderDesc
} from '@dimforge/rapier3d-compat'
import type { Position, Rotation, TransformableObjectProperties } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'

type Shape =
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

type Args = Parameters<typeof ColliderDesc[Shape]>

interface Props {
  shape: Shape
  args: Args
  position?: NonNullable<TransformableObjectProperties['position']>
  rotation?: TransformableObjectProperties['rotation']
  scale?: NonNullable<TransformableObjectProperties['scale']>
  lookAt?: NonNullable<TransformableObjectProperties['lookAt']>
  restitution?: number
  restitutionCombineRule?: CoefficientCombineRule
  friction?: number
  frictionCombineRule?: CoefficientCombineRule
  sensor?: boolean
  collider?: rapierCollider
  contactForceEventThreshold?: number
}

type Density = number | undefined
export type Mass<Density> = Density extends undefined ? number | undefined : undefined
export type MassProperties<Density, Mass> = Density extends undefined
  ? Mass extends undefined
    ? {
        mass: number
        centerOfMass: Position
        principalAngularInertia: Position
        angularInertiaLocalFrame: Rotation
      }
    : undefined
  : undefined

interface WithDensity extends Props {
  density?: Density
}

interface WithMass<Density> extends Props {
  mass?: Mass<Density>
}

interface WithMassProperties<Density> extends WithMass<Density> {
  massProperties?: MassProperties<Density, Mass<Density>>
}

export type ColliderProps<Density> = WithDensity | WithMass<Density> | WithMassProperties<Density>

export default class Collider<Density> extends SvelteComponentTyped<ColliderProps<Density>> {}
