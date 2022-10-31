import { resolve } from './resolve'

const ignoredProps = ['$$scope', '$$slots', 'type', 'args', 'attach', 'instance']

export const useProps = () => {
  const setProp = <T>(instance: T, propertyPath: string, value: any) => {
    const { key, target } = resolve(instance, propertyPath)

    if (
      !Array.isArray(value) &&
      typeof value === 'number' &&
      typeof target[key]?.setScalar === 'function'
    ) {
      // edge case of setScalar setters
      target[key].setScalar(value)
    } else {
      if (typeof target[key]?.set === 'function') {
        // if the property has a "set" function, we can use it
        if (Array.isArray(value)) {
          target[key].set(...value)
        } else {
          target[key].set(value)
        }
      } else {
        // otherwise, we just set the value
        target[key] = value
      }
    }
  }

  const updateProps = <T>(instance: T, props: Record<string, any>) => {
    for (const key in props) {
      if (!ignoredProps.includes(key)) {
        setProp(instance, key, props[key])
      }
    }
  }

  return {
    updateProps
  }
}
