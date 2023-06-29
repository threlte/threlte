import { types } from '@theatre/core'
import { isPrimitive } from '../../utils/isPrimitive'
import { createTransformer } from '../createTransformer'

export const generic = createTransformer({
  transform(target) {
    if (isPrimitive(target)) {
      if (typeof target === 'number') {
        return types.number(target)
      } else if (typeof target === 'string') {
        return types.string(target)
      } else if (typeof target === 'boolean') {
        return types.boolean(target)
      }
    }
    return types.compound({
      ...target
    })
  },
  apply(target, path, value) {
    if (isPrimitive(target[path])) {
      target[path] = value
    } else {
      Object.assign(target[path], value)
    }
  }
})
