import type { Instance } from './types'

export const resolve = (instance: Instance, propertyPath: string) => {
  let target = instance._threlte_three.parent
  const route = propertyPath.split('.')
  if (route.length === 1) {
    return {
      target,
      key: route[0]
    }
  } else {
    for (let index = 0; index < route.length - 1; index++) {
      target = target[route[index]]
    }
    return {
      target: target,
      key: route[route.length - 1]
    }
  }
}
