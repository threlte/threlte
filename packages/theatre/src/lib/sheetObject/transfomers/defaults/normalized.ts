import { types } from '../../../theatre'
import { createTransformer } from '../createTransformer'

export const normalized = createTransformer({
  transform(value) {
    return types.number(value, {
      range: [0, 1]
    })
  },
  apply(target, path, value) {
    target[path] = value
  }
})
