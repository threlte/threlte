import { getContext } from 'svelte'
import type { Readable, Writable } from 'svelte/store'
// import type { ThrelteUserContext } from '../types/types'

type UserContextEntry = Record<string, any>
type UserContext = Record<string, UserContextEntry>
type ThrelteUserContext = { store: Writable<UserContext>; raw: UserContext }

export function useThrelteUserContext(): Readable<UserContext>
export function useThrelteUserContext<T extends UserContextEntry = UserContextEntry>(
  name: string
): T
export function useThrelteUserContext<T extends UserContextEntry = UserContextEntry>(
  name?: string
): T | Readable<UserContext> {
  const userCtx = getContext<ThrelteUserContext>('threlte-user-context')
  if (name) {
    return userCtx.raw[name] as T
  } else {
    const { subscribe } = userCtx.store
    return { subscribe }
  }
}

type Options = {
  existing: 'merge' | 'replace' | 'skip'
}

export function setThrelteUserContext<T extends UserContextEntry = UserContextEntry>(
  name: string,
  value: T,
  options: Options = { existing: 'skip' }
): void {
  const userCtx = getContext<ThrelteUserContext>('threlte-user-context')
  userCtx.store.update((ctx) => {
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
}
