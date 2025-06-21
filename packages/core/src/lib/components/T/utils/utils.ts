import type { AnyClass, MaybeInstance } from '../types'

const classRegex = /^\s*class\s+/

// Type Guards
const isClass = (input: unknown): input is AnyClass => {
  if (typeof input !== 'function') {
    return false
  }

  return classRegex.test(input.toString())
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
