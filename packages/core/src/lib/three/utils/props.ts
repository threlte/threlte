import type { Instance, PropSetter } from './types'

const ignoredProps = ['$$scope', '$$slots', 'js', 'args', 'attach', 'object']

export const applyProps = (instance: Instance, allProps: Record<string, string>): void => {
  const { memoizedPropSetters } = instance._threlte_three

  Object.entries(allProps).forEach(([key, value]) => {
    if (ignoredProps.includes(key)) return

    const memoized = memoizedPropSetters[key]
    if (!memoized) {
      // first get the parent of the prop key
      let parent = instance as any
      let propertyKey = key
      const path = key.split('.')
      if (path.length > 1) {
        for (let i = 0; i < path.length - 1; i++) {
          parent = parent[path[i]]
        }
        propertyKey = path[path.length - 1]
      }

      // then set the setter function
      let fn: PropSetter

      // edge case of setScalar setters
      if (
        !Array.isArray(value) &&
        typeof value === 'number' &&
        typeof parent[propertyKey]?.setScalar === 'function'
      ) {
        fn = (value: number) => parent[propertyKey].setScalar(value)
      } else {
        if (typeof parent[propertyKey]?.set === 'function') {
          // if the property has a "set" function, we can use it
          if (Array.isArray(value)) {
            fn = (value: any) => parent[propertyKey].set(...value)
          } else {
            fn = (value: any) => parent[propertyKey].set(value)
          }
        } else {
          // otherwise, we just set the value
          fn = (value: any) => (parent[propertyKey] = value)
        }
      }

      memoizedPropSetters[key] = {
        fn,
        parent,
        propertyKey
      }
    }

    const { fn } = memoizedPropSetters[key]

    fn(value)
  })
}
