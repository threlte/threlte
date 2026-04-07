import type { AnyClass, MaybeInstance } from '../types.js'

/**
 * Short cicruits if the input is not a function, then calls toString on Function with guaranteed safe behavior
 */
const isClass = (input: unknown): input is AnyClass => {
  return typeof input === 'function' && Function.prototype.toString.call(input).startsWith('class ')
}

export const determineRef = <Type>(is: unknown, args: unknown): MaybeInstance<Type> => {
  if (isClass(is)) {
    if (Array.isArray(args)) {
      return new is(...args)
    } else {
      return new is()
    }
  }

  return is as MaybeInstance<Type>
}
