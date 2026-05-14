import { EventDispatcher } from 'three'
import { useScheduler } from '../../../context/fragments/scheduler.svelte.js'
import { untrack } from 'svelte'

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
  const current = target[key]
  const valueIsArray = Array.isArray(value)

  if (
    !valueIsArray &&
    typeof value === 'number' &&
    typeof current === 'object' &&
    current !== null &&
    typeof current.setScalar === 'function' &&
    // Colors have setScalar, but the hex notation (e.g. 0xff0000) is popular
    // and matches the number type, so route colors through .set() instead.
    !current.isColor
  ) {
    current.setScalar(value)
  } else if (typeof current === 'object' && current !== null && typeof current.set === 'function') {
    if (valueIsArray) current.set(...value)
    else current.set(value)
  } else {
    target[key] = value
  }
}

export const useProps = <Type>(
  object: () => Type,
  props: () => Record<string, unknown>,
  pluginProps: () => string[] | undefined
) => {
  const { invalidate } = useScheduler()

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

    // Inlined resolvePropertyPath. Avoids function + object allocation tax
    let target: any = instance
    let key = propertyPath
    const hasDot = propertyPath.includes('.')
    if (hasDot) {
      const path = propertyPath.split('.')
      key = path.pop() as string
      for (let i = 0; i < path.length; i++) {
        target = target[path[i]]
        if (target == null) {
          console.error(`Cannot resolve property path "${propertyPath}": "${path[i]}" is ${target}`)
          return
        }
      }
    }

    if (
      typeof value === 'function' &&
      key.startsWith('on') &&
      !hasDot &&
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

    // Clear memoized props when the instance or props reference changes,
    // preventing unbounded growth from previous instances.
    memoizedProps.clear()

    untrack(() => {
      for (const key in _props) {
        // Skip plugin-reserved props at setup time. `pluginProps` is captured
        // once at component init and never mutates, so there's no reason to
        // re-check on every prop change.
        if (_pluginProps?.includes(key)) continue
        $effect.pre(() => setProp(_object, key, _props[key]))
      }
    })
  })
}
