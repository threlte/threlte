import type { AnyProp } from '../types.js'

export const isStringProp = (prop: AnyProp): prop is string => {
  return typeof prop === 'string'
}
