import type { AxisItem, AxisParams, ShakeParams } from './types'
import type { Object3D } from 'three'
import { SimplexNoise } from 'three/examples/jsm/Addons.js'
import { useTask } from '@threlte/core'

const createAxis = ({ frequency, intensity }: AxisParams = {}): AxisItem => {
  const noise = new SimplexNoise()
  return {
    frequency: frequency ?? 0.1,
    intensity: intensity ?? 0.1,
    noise
  }
}

export const useShake = (params: ShakeParams = {}) => {
  const pitch = createAxis(params.pitch)
  const roll = createAxis(params.roll)
  const yaw = createAxis(params.yaw)

  let time = 0

  const shake = (ref: Object3D, autoStart = true) => {
    const { x, y, z } = ref.rotation
    return useTask(
      (delta) => {
        time += delta
        ref.rotation.set(
          x + pitch.intensity * pitch.noise.noise(pitch.frequency * time, 1),
          y + yaw.intensity * yaw.noise.noise(yaw.frequency * time, 1),
          z + roll.intensity * roll.noise.noise(roll.frequency * time, 1)
        )
      },
      { autoStart }
    )
  }
  return {
    pitch,
    roll,
    shake,
    yaw
  }
}
