import type { Props } from '@threlte/core'
import type { ColorRepresentation, MeshPhysicalNodeMaterial } from 'three/webgpu'

export type SliceMaterialProps = Props<MeshPhysicalNodeMaterial> & {
  arcAngle?: number
  sliceColor?: ColorRepresentation
  startAngle?: number
}
