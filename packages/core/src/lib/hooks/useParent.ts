import type * as THREE from 'three'
import { getContext, setContext } from 'svelte'
import { type Writable } from 'svelte/store'
import type { Object3D } from 'three'
import { createObjectStore } from '../lib/createObjectStore'
import type { ValueOf } from 'type-fest'

type ThreeObject = ValueOf<typeof THREE>

export type ThrelteParentContext = Writable<ThreeObject | undefined>

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
