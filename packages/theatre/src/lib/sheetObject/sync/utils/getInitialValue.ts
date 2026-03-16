import { resolvePropertyPath } from '@threlte/core'
import type { AnyProp } from '../types.js'
import { getDefaultTransformer } from '../../transfomers/getDefaultTransformer.js'
import { isComplexProp } from './isComplexProp.js'

export const getInitialValue = (
  propertyPath: string,
  propertyValue: AnyProp,
  targetObject: any
) => {
  const { target, key } = resolvePropertyPath(targetObject, propertyPath)

  const rawValue = target[key]

  const customTransformer = isComplexProp(propertyValue) ? propertyValue.transformer : undefined
  const transformer = customTransformer ?? getDefaultTransformer(target, key, propertyPath)

  const value = transformer?.transform(rawValue)

  return {
    value,
    transformer
  }
}
