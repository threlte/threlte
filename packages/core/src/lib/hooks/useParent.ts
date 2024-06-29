import { getContext, setContext } from 'svelte'
import { type Writable } from 'svelte/store'
import { createObjectStore } from '../lib/createObjectStore'

export type ThrelteParentContext = Writable<unknown>

const key = Symbol('threlte-hierarchical-parent-context')

export const useParent = () => {
  return getContext<ThrelteParentContext>(key)
}

export const setParent = (context: ThrelteParentContext) => {
  return setContext(key, context)
}

export const createParentContext = <T extends { uuid: string } | undefined>(): Writable<T> => {
  const context = createObjectStore<T>()
  setContext(key, context)
  return context
}
