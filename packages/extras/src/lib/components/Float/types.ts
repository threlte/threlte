import type { Props } from '@threlte/core'
import type { Group } from 'three'

export type FloatProps = Props<Group> & {
  /**
   * @default 1
   */
  speed?: number | [x: number, y: number, z: number]

  /**
   * @default 1
   */
  floatIntensity?: number | [x: number, y: number, z: number]

  /**
   * @default [-0.1, 0.1]
   */
  floatingRange?: [number, number] | [x: [number, number], y: [number, number], z: [number, number]]

  /**
   * @default 0
   */
  rotationIntensity?: number | [x: number, y: number, z: number]

  /**
   * @default 0
   */
  rotationSpeed?: number | [x: number, y: number, z: number]

  /**
   * @default Math.random() * 1000
   */
  seed?: number
}
