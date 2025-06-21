import type { EventDispatcher } from 'three'
import type { MaybeInstance } from '../types'

type Props = Record<string, (arg: unknown) => void>

/**
 * Typeguard to check if a value is extending THREE.EventDispatcher
 * @param value
 * @returns
 */
const isEventDispatcher = <T>(
  value: MaybeInstance<T>
): value is MaybeInstance<T> & EventDispatcher<Record<string, unknown>> => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'addEventListener' in value &&
    'removeEventListener' in value
  )
}

export const useEvents = <T>(propKeys: string[], props: Props, getRef: () => MaybeInstance<T>) => {
  const ref = $derived(getRef())

  for (const key of propKeys) {
    const prop = $derived(props[key])

    $effect.pre(() => {
      if (!key.startsWith('on') || typeof prop !== 'function' || !isEventDispatcher(ref)) {
        return
      }

      const name = key.slice(2)
      ref.addEventListener(name, prop)
      return () => ref.removeEventListener(name, prop)
    })
  }
}
