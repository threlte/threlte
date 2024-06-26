import { getContext } from 'svelte'
import { derived, type Readable } from 'svelte/store'
import type { CurrentWritable } from '../lib/storeUtils'

export type ThrelteUserContext = CurrentWritable<Record<string | symbol, unknown>>

type UserContextEntry = Record<string, any>
type UserContext = Record<string, UserContextEntry>

type SetThrelteUserContextOptions = {
  existing: 'merge' | 'replace' | 'skip'
}

/**
 * ### `useThrelteUserContext`
 *
 * The `UserContext` is a store scoped to the context of your root `<Canvas>` component and can be used to
 * store and retrieve arbitrary data from anywhere in the Threlte app.
 * Because it's scoped, it's especially interesting for authoring reusable components and inter-component communication.
 *
 * `useThrelteUserContext` can set and get the user context store.
 *
 * ### Get the user context store
 *
 * If no `namespace` is provided, the whole user context store is returned.
 *
 * ```svelte
 * <script>
 *   import { useThrelteUserContext } from '@threlte/core'
 *
 *   const userCtx = useThrelteUserContext()
 *   console.log($userCtx) // -> { 'some-context': { foo: 'bar' } }
 * </script>
 * ```
 *
 * If a `namespace` is provided, the hook returns a derived store.
 *
 * ```svelte
 * <script>
 *   import { useThrelteUserContext } from '@threlte/core'
 *
 *   const ctx = useThrelteUserContext('some-context')
 *   console.log($ctx) // -> { foo: 'bar' }
 * </script>
 * ```
 *
 * ### Set the user context store
 *
 * ```svelte
 * <script>
 *   import { useThrelteUserContext } from '@threlte/core'
 *
 *   const getCtx = () => {
 *     return {
 *       foo: 'bar'
 *     }
 *   }
 *
 *   const ctx = useThrelteUserContext('some-context', getCtx)
 *   console.log(ctx) // -> { foo: 'bar' }
 * </script>
 * ```
 *
 * By default, when a context is set at a given namespace, setting it again will be ignored.
 * You can override this behaviour:
 *
 * ```svelte
 * <script>
 *   import { useThrelteUserContext } from '@threlte/core'
 *
 *   const getCtx = () => {
 *     return {
 *       foo: 'bar'
 *     }
 *   }
 *
 *   const ctx = useThrelteUserContext('some-context', getCtx, { exising: 'merge' })
 *   console.log(ctx) // -> { foo: 'bar' }
 * </script>
 * ```
 */

export function useThrelteUserContext<UC extends UserContext = UserContext>(): Readable<UC>
export function useThrelteUserContext<UCT extends UserContextEntry = UserContextEntry>(
  namespace: string
): Readable<UCT>
export function useThrelteUserContext<UCT extends UserContextEntry = UserContextEntry>(
  namespace: string,
  value: UCT,
  options?: SetThrelteUserContextOptions
): UCT
export function useThrelteUserContext<
  UCorUCT extends UserContext | UserContextEntry,
  Value extends UserContextEntry,
  Result = UCorUCT extends UserContext
    ? Readable<UCorUCT>
    : Value extends UserContextEntry
      ? UserContextEntry
      : Readable<UserContextEntry>
>(namespace?: string, value?: Value, options?: SetThrelteUserContextOptions): Result {
  const userCtxStore =
    getContext<CurrentWritable<Record<string | symbol, unknown>>>('threlte-user-context')
  if (!userCtxStore) {
    throw new Error(
      'No user context store found, did you invoke this function outside of your main <Canvas> component?'
    )
  }

  // return the plain user context store
  if (!namespace) {
    return {
      subscribe: userCtxStore.subscribe
    } as Result
  }

  // return a specific user context entry
  if (namespace && !value) {
    return derived(userCtxStore, (ctx) => ctx[namespace]) as Result
  }

  // we are possibly setting a new user context entry here
  userCtxStore.update((ctx) => {
    if (namespace in ctx) {
      // skip is the default value
      if (!options || options.existing === 'skip') return ctx

      if (options.existing === 'merge') {
        Object.assign(ctx[namespace], value)
        return ctx
      }
    }

    // also handles options.existing === 'replace'
    ctx[namespace] = value
    return ctx
  })

  return userCtxStore.current[namespace] as Result
}
