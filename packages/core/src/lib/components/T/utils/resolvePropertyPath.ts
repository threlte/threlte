/**
 * ### `resolvePropertyPath`
 *
 * Threlte supports props called "pierced props" that allow you to set
 * properties on nested objects. This function resolves a property path to a
 * target object and the property key. The property path can include dots to indicate
 * nested objects.
 *
 * ```svelte
 * <T.PerspectiveCamera position.x={10} />
 * ```
 *
 * … resolves to …
 *
 * ```ts
 * const { target, key } = resolvePropertyPath(camera, 'position.x')
 * target[key] = 10
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
