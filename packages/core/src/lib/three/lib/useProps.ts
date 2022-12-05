import { useThrelte } from '../../hooks/useThrelte'
import { resolve } from './resolve'

const ignoredProps = ['$$scope', '$$slots', 'type', 'args', 'attach', 'instance']

/**
 * Only scalar values are memoized, objects and arrays are considered
 * non-equa by default, to ensure reactivity works as you would
 * expect in svelte.
 * @param value
 * @returns
 */
export const memoizeProp = (value: unknown): boolean => {
  // scalar values are memoized
  if (typeof value === 'string') return true
  if (typeof value === 'number') return true
  if (typeof value === 'boolean') return true
  if (typeof value === 'undefined') return true
  if (value === null) return true

  // objects and arrays cannot be reliably memoized
  return false
}

type PropOptions = {
  manualCamera?: boolean
}

export const useProps = <T extends any[]>(initialBaseProps: T) => {
  const baseProps = initialBaseProps

  const { invalidate } = useThrelte()

  const previousValues = new Map<string, any>()

  const setProp = <T>(instance: T, propertyPath: string, value: any, options: PropOptions) => {
    if (memoizeProp(value)) {
      const previousValue = previousValues.get(propertyPath)
      if (previousValue === value) {
        return
      }
      previousValues.set(propertyPath, value)
    }

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
        if (key === 'fov' && target.isPerspectiveCamera && !options.manualCamera) {
          // this is most likely a PerspectiveCamera, so we need to update the aspect ratio
          target.updateProjectionMatrix()
        }
      }
    }
  }

  const updateProps = <T>(instance: T, props: Record<string, any>, options: PropOptions) => {
    for (const key in props) {
      if (!ignoredProps.includes(key)) {
        setProp(instance, key, props[key], options)
      }
      invalidate()
    }
  }

  /**
   * Because reactive callbacks are not only called when the $$restProps change,
   * but also when regular props change, we have to run simple equality check to
   * see whether the actual props need to be updated.
   */
  const needUpdate = (...args: T) => {
    // we assume that the props need an update
    let needsUpdate = true

    // we check if the base props of the component have changed
    for (let i = 0; i < args.length; i += 1) {
      if (args[i] !== baseProps[i]) {
        // if they have changed, we don't need to update the props
        needsUpdate = false
        baseProps[i] = args[i]
        break
      }
    }
    return needsUpdate
  }

  return {
    updateProps,
    needUpdate
  }
}
