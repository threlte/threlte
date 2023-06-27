import { types } from '@theatre/core'
import type { Transformer } from '../types'

export const normalized: Transformer = {
  initialize(value) {
    return types.number(value, {
      range: [0, 1]
    })
  },
  apply(target, path, value) {
    target[path] = value
  }
}
