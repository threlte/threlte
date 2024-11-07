import { Group } from 'three'
import type { MarchingPlaneAxis } from './types'

export class MarchingPlane extends Group {
  constructor(
    public axis: MarchingPlaneAxis = 'x',
    public strength = 0.5,
    public subtract = 12
  ) {
    super()
  }
}
