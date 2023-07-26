import type { types } from '@theatre/core'

export type Transformer<Value = any, TransformedValue = any> = {
  /**
   * The `transform` function is used to transform the value of a certain
   * Three.js objects proerty to a property that Theatre.js can use in an
   * `ISheetObject`. To ensure compatibility with the rest of the package, the
   * return value must be any one of the functions available at Theatre.js'
   * `types`.
   */
  transform: (value: Value) => ReturnType<(typeof types)[keyof typeof types]>
  /**
   * The `apply` function is used to apply the value to the target. `target` is
   * the parent object of the property (usually a Three.js object), `path` is
   * the name of the property and `value` is the value to apply.
   */
  apply: (target: any, property: string, value: TransformedValue) => void
}
