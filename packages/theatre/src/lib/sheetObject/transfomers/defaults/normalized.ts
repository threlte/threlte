import { types } from '../../../theatre.js'
import { createTransformer } from '../createTransformer.js'

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
