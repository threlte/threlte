import { EventDispatcher } from 'three'
import { useThrelte } from '../../../context/compounds/useThrelte.js'
import { resolvePropertyPath } from '../../../utilities/index.js'
import { untrack } from 'svelte'

const ignoredProps = new Set(['$$scope', '$$slots', 'type', 'args', 'attach', 'instance'])

/**
 * Only scalar values are memoized. Objects/functions/arrays are treated as dynamic
 * so Svelte-style reactivity remains intuitive.
 */
const memoizeProp = (value: unknown): boolean => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}

const setter = (target: any, key: any, value: any) => {
  if (
    !Array.isArray(value) &&
    typeof value === 'number' &&
    typeof target[key] === 'object' &&
    target[key] !== null &&
    typeof target[key]?.setScalar === 'function' &&
    // colors do have a setScalar function, but we don't want to use it, because
    // the hex notation (i.e. 0xff0000) is very popular and matches the number
    // type. So we exclude colors here.
    !target[key]?.isColor
  ) {
    // edge case of setScalar setters
    target[key].setScalar(value)
  } else {
    if (
      typeof target[key]?.set === 'function' &&
      typeof target[key] === 'object' &&
      target[key] !== null
    ) {
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
    if (memoizeProp(value)) {
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

    /**
     * If we can determine that this is an event listener prop,
     * attach it.
     */
    if (
      typeof value === 'function' &&
      key.startsWith('on') &&
      !propertyPath.includes('.') &&
      'addEventListener' in (target as EventDispatcher)
    ) {
      const dispatcher = target as EventDispatcher<Record<string, any>>
      const eventName = key.slice(2)

      dispatcher.addEventListener(eventName, value)

      return () => {
        dispatcher.removeEventListener?.(eventName, value)
      }
    }

    if (value !== undefined && value !== null) {
      setter(target, key, value)
    } else {
      target[key] = value
    }

    invalidate()
    return
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
