import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils'
import { createTransformer } from '../createTransformer'

export const degrees = createTransformer<number>().build({
  initialize(target) {
    return target * RAD2DEG
  },
  apply(target, path, value) {
    target[path] = value * DEG2RAD
  }
})
