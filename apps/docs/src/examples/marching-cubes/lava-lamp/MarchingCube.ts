import type { Color } from 'three'
import { Group } from 'three'

export class MarchingCube extends Group {
  constructor(
    public strength = 0.5,
    public subtract = 12,
    public color?: Color
  ) {
    super()
  }
}
