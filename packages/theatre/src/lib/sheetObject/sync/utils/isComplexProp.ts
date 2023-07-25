import type { AnyProp, ComplexProp } from '../Sync.svelte'

export const isComplexProp = (prop: AnyProp): prop is ComplexProp => {
  return typeof prop === 'object'
}
