import type { AnyProp, ComplexProp } from '../types.js'

export const isComplexProp = (prop: AnyProp): prop is ComplexProp => {
  return typeof prop === 'object'
}
