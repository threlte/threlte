import { isPrimitive } from '../../utils/isPrimitive'
import type { Transformer } from '../types'

export const generic: Transformer = {
  initialize(target) {
    if (isPrimitive(target)) {
      return target
    } else {
      return { ...target }
    }
  },
  apply(target, path, value) {
    if (isPrimitive(target[path])) {
      target[path] = value
    } else {
      Object.assign(target[path], value)
    }
  }
}
