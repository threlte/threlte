import type { types } from '@theatre/core'

export type Transformer<Value = any, TransformedValue = any> = {
  transform: (value: Value) => ReturnType<(typeof types)[keyof typeof types]>
  apply: (target: any, property: string, value: TransformedValue) => void
}
