export const resolve = (on: any, propertyPath: string) => {
  const route = propertyPath.split('.')
  if (route.length === 1) {
    return {
      parent: on,
      key: route[0]
    }
  } else {
    let obj = on
    for (let index = 0; index < route.length - 1; index++) {
      obj = obj[route[index]]
    }
    return {
      parent: obj,
      key: route[route.length - 1]
    }
  }
}
