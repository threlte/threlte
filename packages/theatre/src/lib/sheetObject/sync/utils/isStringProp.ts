import type { AnyProp } from '../types'

export const isStringProp = (prop: AnyProp): prop is string => {
  return typeof prop === 'string'
}
