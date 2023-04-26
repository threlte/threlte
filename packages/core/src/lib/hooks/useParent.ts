import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'
import type { Object3D } from 'three'

export type ThrelteParentContext = Writable<Object3D | undefined>

export const useParent = () => {
  return getContext<ThrelteParentContext>('threlte-hierarchical-parent-context')
}
