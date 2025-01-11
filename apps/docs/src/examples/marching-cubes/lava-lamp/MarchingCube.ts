import { Color, Group } from 'three'

export class MarchingCube extends Group {
  constructor(
    public color = new Color(),
    public strength = 0.5,
    public subtract = 12
  ) {
    super()
  }
}
