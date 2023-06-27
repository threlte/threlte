import { types } from '@theatre/core'
import { createTransformer } from '../createTransformer'

export const side = createTransformer<number>().build({
  initialize(value) {
    return types.stringLiteral(
      value === 0 ? 'f' : value === 1 ? 'b' : 'd',
      { f: 'Front', b: 'Back', d: 'Double' },
      { as: 'switch' }
    )
  },
  apply(target, path, value) {
    target[path] = value === 'f' ? 0 : value === 'b' ? 1 : 2
  }
})
