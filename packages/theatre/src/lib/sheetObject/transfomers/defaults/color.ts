import { types } from '../../../theatre'
import { createTransformer } from '../createTransformer'

export const color = createTransformer({
  transform(value) {
    return types.rgba({ r: value.r, g: value.g, b: value.b, a: 1 })
  },
  apply(target, path, value) {
    target[path].r = value.r
    target[path].g = value.g
    target[path].b = value.b
  }
})
