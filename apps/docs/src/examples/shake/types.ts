import type { SimplexNoise } from 'three/examples/jsm/Addons.js'

export type Axis = 'roll' | 'pitch' | 'yaw'

export type AxisParams = {
  frequency: number
  intensity: number
}

export type ShakeParams = Partial<Record<Axis, Partial<AxisParams>>>

export type AxisItem = {
  noise: SimplexNoise
} & AxisParams
