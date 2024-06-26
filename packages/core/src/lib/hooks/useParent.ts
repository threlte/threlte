import { getContext, setContext } from 'svelte'
import { type Writable } from 'svelte/store'
import { createObjectStore } from '../lib/createObjectStore'
import type { MaybeInstance } from '../components/T/types'

export type ThrelteParentContext<T> = Writable<T | undefined>

const key = Symbol('threlte-hierarchical-parent-context')

export const useParent = <T>() => {
  return getContext<ThrelteParentContext<T>>(key)
}

export const setParent = <T>(context: ThrelteParentContext<T>) => {
  return setContext(key, context)
}

export const createParentContext = <T>(ref: MaybeInstance<T> | undefined): Writable<T> => {
  const context = createObjectStore(ref as MaybeInstance<T> & { uuid: string })
  setContext(key, context)
  return context
}
