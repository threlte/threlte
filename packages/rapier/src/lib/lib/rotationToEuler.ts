import type { Rotation } from '@threlte/core'
import { Euler } from 'three'

export const rotationToEuler = (rotation?: Rotation, euler?: Euler): Euler => {
  if (euler) {
    euler.set(rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0)
    return euler
  }
  return new Euler(rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0)
}
