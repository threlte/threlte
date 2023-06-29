import type { AnyProp, ComplexProp } from '../AutoProps.svelte'

export const isComplexProp = (prop: AnyProp): prop is ComplexProp => {
  return typeof prop === 'object'
}
