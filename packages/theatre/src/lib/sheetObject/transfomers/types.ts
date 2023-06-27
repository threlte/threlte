import type { UnknownShorthandCompoundProps } from '@theatre/core'

export type Transformer<
  T = any,
  Resolved extends UnknownShorthandCompoundProps[keyof UnknownShorthandCompoundProps] = any
> = {
  initialize: (value: T) => Resolved
  apply: (target: any, property: string, value: Resolved) => void
}
