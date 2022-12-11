import { Color, Euler } from 'three'
import { RAD2DEG } from 'three/src/math/MathUtils'
import { types } from '../theatre'
import { isPrimitive } from './typeGuards'
import type { PropTransform } from './types'

/**
 * Resolves a property path to the target and the key.
 * @param target
 * @param propertyPath
 * @returns
 */
export const resolve = (target: any, propertyPath: string) => {
  if (propertyPath.includes('.')) {
    const path = propertyPath.split('.')
    const key = path.pop() as string
    for (let i = 0; i < path.length; i += 1) {
      target = target[path[i]]
    }
    return {
      target,
      key
    }
  } else {
    return {
      target,
      key: propertyPath
    }
  }
}

export const parseAutoPropKeyByPath = (path: string) => {
  return path
    .split('.')
    .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
    .join('')
}

/**
 * The values behind properties with these keys are assumed to be normalized, so
 * in the range [0, 1].
 */
const normalizedValueKeys = ['opacity', 'metalness', 'roughness']

/**
 * Auto props need an initial value to be initialized correctly. This value has
 * to be retrieved from the target and in some special cases the value needs to
 * be parsed differently.
 * @param target
 * @param key
 * @returns
 */
export const getAutoPropValue = (
  parent: any,
  path: string
): {
  transform: PropTransform
  value: any
} => {
  const { key, target } = resolve(parent, path)

  // Throw error when key is not found in target
  if (!(key in target)) {
    throw new Error(`Key ${key} not found in target`)
  }
  let type: PropTransform = 'none'
  let value = target[key]
  if (normalizedValueKeys.includes(key)) {
    value = types.number(value, { range: [0, 1] })
  } else if (value instanceof Color) {
    // Colors get an RGBA interface
    value = types.rgba({
      r: value.r,
      g: value.g,
      b: value.b,
      a: 1
    })
  } else if (value instanceof Euler) {
    // Euler angles will be displayed in degrees
    type = 'euler'
    value = {
      x: value.x * RAD2DEG,
      y: value.y * RAD2DEG,
      z: value.z * RAD2DEG
    }
  } else if (!isPrimitive(value)) {
    value = { ...value }
  }
  return {
    transform: type,
    value
  }
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
