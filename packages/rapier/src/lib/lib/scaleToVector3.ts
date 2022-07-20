import type { Scale } from '@threlte/core'
import { Vector3 } from 'three'

export const scaleToVector3 = (scale?: Scale, v3?: Vector3): Vector3 => {
  if (v3) {
    if (typeof scale === 'number') {
      v3.set(scale, scale, scale)
    } else {
      v3.set(scale?.x ?? 1, scale?.y ?? 1, scale?.z ?? 1)
    }
    return v3
  }

  if (typeof scale === 'number') {
    return new Vector3(scale, scale, scale)
  }
  return new Vector3(scale?.x ?? 1, scale?.y ?? 1, scale?.z ?? 1)
}
