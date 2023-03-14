import { getContext } from 'svelte'
import { derived, type Readable } from 'svelte/store'
import type { CurrentWritable } from '../lib/storeUtils'
import type { ThrelteUserContext } from '../types/types'

type UserContextEntry = Record<string, any>
type UserContext = Record<string, UserContextEntry>

/**
 * ### `useThrelteUserContext`
 *
 * Returns the user context store. The Threlte user context store is a store
 * that can be used to store arbitrary data from anywhere in the Threlte app.
 *
 * Use the function `setThrelteUserContext` to set the user context.
 *
 * If a name is provided, the function returns a derived store that only
 * contains the value of the provided user context name.
 *
 * ```ts
 * import { useThrelteUserContext, setThrelteUserContext } from '@threlte/core'
 *
 * setThrelteUserContext('some-context', { foo: 'bar' })
 *
 * const userCtx = useThrelteUserContext() // -> CurrentReadable<{ 'some-context': { foo: 'bar' } }>
 * // or
 * const userCtx = useThrelteUserContext('some-context') // -> CurrentReadable<{ foo: 'bar' }>
 * ```
 */
export function useThrelteUserContext(): CurrentWritable<UserContext>
export function useThrelteUserContext<T extends UserContextEntry = UserContextEntry>(
  name: string
): Readable<T | undefined>
export function useThrelteUserContext<T extends UserContextEntry = UserContextEntry>(
  name?: string
): Readable<T | undefined> | CurrentWritable<UserContext> {
  const userCtx = getContext<ThrelteUserContext>('threlte-user-context')
  if (!name) {
    return userCtx
  } else {
    return derived(userCtx, (ctx) => ctx[name] as T)
  }
}

type SetThrelteUserContextOptions = {
  existing: 'merge' | 'replace' | 'skip'
}

/**
 * ### `setThrelteUserContext`
 *
 * Sets the user context store. The Threlte user context store is a store
 * that can be used to store arbitrary data from anywhere in the Threlte app.
 *
 * Use the function `useThrelteUserContext` to get the user context.
 *
 * ```ts
 * import { useThrelteUserContext, setThrelteUserContext } from '@threlte/core'
 *
 * setThrelteUserContext('some-context', { foo: 'bar' })
 *
 * const userCtx = useThrelteUserContext() // -> CurrentReadable<{ 'some-context': { foo: 'bar' } }>
 * // or
 * const userCtx = useThrelteUserContext('some-context') // -> Readable<{ foo: 'bar' }>
 * ```
 *
 * ### Options
 *
 * By default, if a name already exists in the user context, the new value
 * will be skipped. This can be changed by providing the `options` argument.
 *
 * ```ts
 * import { useThrelteUserContext, setThrelteUserContext } from '@threlte/core'
 *
 * setThrelteUserContext('some-context', { foo: 'bar' })
 * setThrelteUserContext('some-context', { foo: 'baz' }, { existing: 'replace' })
 *
 * const userCtx = useThrelteUserContext('some-context') // -> Readable<{ foo: 'baz' }>
 * ```
 */
export function setThrelteUserContext<T extends UserContextEntry = UserContextEntry>(
  name: string,
  value: T,
  options: SetThrelteUserContextOptions = { existing: 'skip' }
) {
  const userCtx = getContext<ThrelteUserContext>('threlte-user-context')
  userCtx.update((ctx) => {
    if (name in ctx) {
      if (options.existing === 'skip') return ctx
      if (options.existing === 'merge') {
        Object.assign(ctx[name], value)
        return ctx
      }
    }
    // also handles options.existing === 'replace'
    ctx[name] = value
    return ctx
  })
  return userCtx
}
