import type { AnyProp, ComplexProp } from '../types'

export const isComplexProp = (prop: AnyProp): prop is ComplexProp => {
  return typeof prop === 'object'
}
