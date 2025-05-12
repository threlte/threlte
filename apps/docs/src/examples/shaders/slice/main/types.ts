import type { Props } from '@threlte/core'
import type { ColorRepresentation, MeshPhysicalNodeMaterial, Node } from 'three/webgpu'

export type SliceMaterialProps = Props<MeshPhysicalNodeMaterial> & {
  arcAngle?: number
  sliceColor?: ColorRepresentation
  startAngle?: number
}

export type AngleInputs = { startAngle: Node; arcAngle: Node }
