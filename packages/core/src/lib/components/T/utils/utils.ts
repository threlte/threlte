import type { Object3D } from 'three'
import type { AnyClass, MaybeInstance } from '../types'
import type { DisposableThreeObject } from '../../../types'

const classRegex = /^\s*class\s+/

// Type Guards
const isClass = (input: unknown): input is AnyClass => {
  if (typeof input !== 'function') {
    return false
  }

  return classRegex.test(input.toString())
}

const argsIsConstructorParameters = (args: unknown): args is ConstructorParameters<AnyClass> => {
  return Array.isArray(args)
}

export const determineRef = <Type>(is: unknown, args: unknown): MaybeInstance<Type> => {
  if (isClass(is)) {
    if (argsIsConstructorParameters(args)) {
      return new is(...args)
    } else {
      return new is()
    }
  }

  return is as MaybeInstance<Type>
}
