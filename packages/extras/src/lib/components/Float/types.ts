import type { Props } from '@threlte/core'
import type { Group } from 'three'

export interface FloatProps extends Props<Group> {
  /**
   * How fast the children bob up and down. A tuple sets the speed per axis.
   * @default 1
   */
  speed?: number | [x: number, y: number, z: number]

  /**
   * Multiplies how far the children move. A tuple sets it per axis.
   * @default 1
   */
  floatIntensity?: number | [x: number, y: number, z: number]

  /**
   * The minimum and maximum offset, in world units. A single pair floats
   * along the y-axis only, and three pairs set the range of the x, y and z
   * axes.
   * @default [-0.1, 0.1]
   */
  floatingRange?: [number, number] | [x: [number, number], y: [number, number], z: [number, number]]

  /**
   * How far the children rock back and forth. `0` disables rotation. A tuple
   * sets it per axis.
   * @default 0
   */
  rotationIntensity?: number | [x: number, y: number, z: number]

  /**
   * How fast the children rock back and forth. A tuple sets it per axis.
   * @default 0
   */
  rotationSpeed?: number | [x: number, y: number, z: number]

  /**
   * The starting point of the animation, so several floating objects don't
   * move in sync.
   * @default Math.random() * 10000
   */
  seed?: number
}
