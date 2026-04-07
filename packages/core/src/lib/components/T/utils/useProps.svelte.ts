import { EventDispatcher } from 'three'
import { useThrelte } from '../../../context/compounds/useThrelte.js'
import { resolvePropertyPath } from '../../../utilities/resolvePropertyPath.js'
import { untrack } from 'svelte'

const ignoredProps = new Set(['$$scope', '$$slots', 'type', 'args', 'attach', 'instance'])

/**
 * Only scalar values are memoized. Objects/functions/arrays are treated as dynamic
 * so Svelte-style reactivity remains intuitive.
 */
const canMemoizeProp = (value: unknown): boolean => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}

export const useProps = <Type>(
  object: () => Type,
  props: () => Record<string, unknown>,
  pluginProps: () => string[] | undefined
) => {
  const { invalidate } = useThrelte()

  /**
   * Skip redundant scalar assignments for the same instance + path.
   */
  const memoizedProps = new Map<
    string,
    {
      instance: any
      value: any
    }
  >()

  const setProp = <T>(instance: T, propertyPath: string, value: any) => {
    if (canMemoizeProp(value)) {
      const memoizedProp = memoizedProps.get(propertyPath)
      if (memoizedProp && memoizedProp.instance === instance && memoizedProp.value === value) {
        return
      }
      memoizedProps.set(propertyPath, {
        instance,
        value
      })
    } else {
      /**
       * Clear scalar memo entry when this path receives a non-scalar, so if it later
       * becomes scalar again we don't carry stale assumptions.
       */
      memoizedProps.delete(propertyPath)
    }

    const { key, target } = resolvePropertyPath(instance, propertyPath)

    const prop = target[key]
    const valueIsArray = Array.isArray(value)

    /**
     * If we can determine that this is an event listener prop,
     * attach it.
     */
    if (
      prop === undefined &&
      typeof value === 'function' &&
      key.startsWith('on') &&
      'addEventListener' in target
    ) {
      const dispatcher = target as EventDispatcher<Record<string, any>>
      const eventName = key.slice(2)

      dispatcher.addEventListener(eventName, value)

      return () => {
        dispatcher.removeEventListener?.(eventName, value)
      }
    }

    if (
      !valueIsArray &&
      typeof value === 'number' &&
      typeof prop === 'object' &&
      prop !== null &&
      typeof prop?.setScalar === 'function' &&
      // colors do have a setScalar function, but we don't want to use it, because
      // the hex notation (i.e. 0xff0000) is very popular and matches the number
      // type. So we exclude colors here.
      !prop?.isColor
    ) {
      // edge case of setScalar setters
      prop.setScalar(value)
    } else if (typeof prop?.set === 'function' && typeof prop === 'object' && prop !== null) {
      // if the property has a "set" function, we can use it
      if (valueIsArray) {
        prop.set(...value)
      } else {
        prop.set(value)
      }
    } else if (typeof prop === 'function') {
      if (typeof value === 'function') {
        target[key] = value
      } else if (valueIsArray) {
        prop.call(target, ...value)
      } else {
        prop.call(target, value)
      }
    } else {
      // otherwise, we just set the value
      target[key] = value
    }

    return invalidate()
  }

  $effect.pre(() => {
    const _object = object()
    const _props = props()
    const _pluginProps = pluginProps()

    untrack(() => {
      for (const key in _props) {
        $effect.pre(() => {
          if (_pluginProps?.includes(key) || ignoredProps.has(key)) {
            return
          }

          return setProp(_object, key, _props[key])
        })
      }
    })
  })
}
