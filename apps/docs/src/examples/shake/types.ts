import type { SimplexNoise } from 'three/examples/jsm/Addons.js'

export type Axis = 'roll' | 'pitch' | 'yaw'

export type ShakeParams = Partial<Record<Axis, AxisParams>>

export type AxisParams = {
  frequency?: number
  intensity?: number
}

export type AxisItem = {
  noise: SimplexNoise
} & Required<AxisParams>
