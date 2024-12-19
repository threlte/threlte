import type { Props } from '@threlte/core'
import type {
  ColorRepresentation,
  MeshPhysicalNodeMaterial,
  NodeRepresentation
} from 'three/webgpu'

export type SliceMaterialProps = Props<MeshPhysicalNodeMaterial> & {
  arcAngle?: number
  sliceColor?: ColorRepresentation
  startAngle?: number
}

export type AngleInputs = { startAngle: NodeRepresentation; arcAngle: NodeRepresentation }
