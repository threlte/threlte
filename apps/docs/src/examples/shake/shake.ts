import type { AxisItem, ShakeParams } from './types'
import type { Object3D } from 'three'
import type { ThrelteUseTaskOptions } from '@threlte/core'
import { SimplexNoise } from 'three/examples/jsm/Addons.js'
import { useTask } from '@threlte/core'

const createAxis = (frequency: number, intensity: number): AxisItem => {
  const noise = new SimplexNoise()
  return {
    frequency,
    intensity,
    noise
  }
}

export const useShake = (params: ShakeParams = {}) => {
  const defaultFrequency = 0.1
  const defaultIntensity = 0.1

  const pitch = createAxis(
    params.pitch?.frequency ?? defaultFrequency,
    params.pitch?.intensity ?? defaultIntensity
  )
  const roll = createAxis(
    params.roll?.frequency ?? defaultFrequency,
    params.roll?.intensity ?? defaultIntensity
  )
  const yaw = createAxis(
    params.yaw?.frequency ?? defaultFrequency,
    params.yaw?.frequency ?? defaultIntensity
  )

  let time = 0

  const shake = (ref: Object3D, options: ThrelteUseTaskOptions = {}) => {
    const { x, y, z } = ref.rotation
    return useTask((delta) => {
      time += delta
      ref.rotation.set(
        x + pitch.intensity * pitch.noise.noise(pitch.frequency * time, 1),
        y + yaw.intensity * yaw.noise.noise(yaw.frequency * time, 1),
        z + roll.intensity * roll.noise.noise(roll.frequency * time, 1)
      )
    }, options)
  }
  return {
    pitch,
    roll,
    shake,
    yaw
  }
}
