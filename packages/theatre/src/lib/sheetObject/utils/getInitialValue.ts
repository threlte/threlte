import { resolvePropertyPath } from '@threlte/core'
import type { AnyProp } from '../AutoProps.svelte'
import { getDefaultTransformer } from '../transfomers/getDefaultTransformer'

export const getInitialValue = (
  propertyPath: string,
  propertyValue: AnyProp,
  targetObject: any
) => {
  const { target, key } = resolvePropertyPath(targetObject, propertyPath)

  let value = target[key]

  const transformer =
    typeof propertyValue === 'object' && propertyValue.transformer
      ? propertyValue.transformer
      : getDefaultTransformer(targetObject, key, propertyPath)

  value = transformer?.initialize(value)

  return {
    value,
    transformer
  }
}
