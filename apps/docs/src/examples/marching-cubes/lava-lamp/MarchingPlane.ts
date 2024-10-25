import { Group } from 'three'

export type MarchingPlaneAxis = 'x' | 'y' | 'z'

export class MarchingPlane extends Group {
  constructor(
    public axis: MarchingPlaneAxis = 'x',
    public strength = 0.5,
    public subtract = 12
  ) {
    super()
  }
}
