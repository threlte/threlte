import { getContext, setContext } from 'svelte'
import { type Writable } from 'svelte/store'
import type { Object3D } from 'three'
import { createObjectStore } from '../lib/createObjectStore'

export type ThrelteParentContext = Writable<Object3D | undefined>

const key = Symbol('threlte-hierarchical-parent-context')

export const useParent = () => {
  return getContext<ThrelteParentContext>(key)
}

export const setParent = (context: ThrelteParentContext) => {
  return setContext(key, context)
}

export const createParentContext = (ref: Object3D | undefined) => {
  const context = createObjectStore(ref)
  setContext(key, context)
  return context
}
