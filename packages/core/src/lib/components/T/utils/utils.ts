import type { Object3D } from 'three'
import type { AnyClass, MaybeInstance } from '../types'
import type { DisposableThreeObject } from '../../../types'

// Type Guards
const isClass = (type: unknown): type is AnyClass => {
  return typeof type === 'function' && /^\s*class\s+/.test(type.toString())
}

const argsIsConstructorParameters = (
  args: unknown
): args is ConstructorParameters<AnyClass> => {
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

export const extendsObject3D = (object: any): object is Object3D => {
  return 'isObject3D' in object
}

export const isDisposableObject = (object: any): object is DisposableThreeObject => {
  return 'dispose' in object
}
