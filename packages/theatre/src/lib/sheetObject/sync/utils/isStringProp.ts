import type { AnyProp } from '../Sync.svelte'

export const isStringProp = (prop: AnyProp): prop is string => {
  return typeof prop === 'string'
}
