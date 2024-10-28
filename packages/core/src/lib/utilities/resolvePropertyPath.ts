/**
 * ### `resolvePropertyPath`
 *
 * This function resolves a property path to a target object and the property
 * key. The property path can include dots to indicate nested objects.
 *
 *  ```ts
 * const object = { position: { x: 0 } }
 * const { target, key } = resolvePropertyPath(object, 'position.x')
 *
 * // target is { x: 0 }
 * // key is 'x'
 * ```
 */
export const resolvePropertyPath = (target: any, propertyPath: string) => {
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
