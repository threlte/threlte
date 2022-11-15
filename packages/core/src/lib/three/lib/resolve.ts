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
