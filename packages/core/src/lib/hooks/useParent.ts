import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import type { Object3D } from 'three'

export type ThrelteParentContext = Writable<Object3D | undefined>

const key = Symbol('threlte-hierarchical-parent-context')

export const useParent = () => {
  return getContext<ThrelteParentContext>(key)
}

export const createParentContext = (ref: Object3D | undefined) => {
  const context = writable(ref)
  setContext(key, context)
  return context
}
