import { useThrelteUserContext } from '@threlte/core'
import type { Snippet } from 'svelte'
import { SvelteMap, SvelteSet } from 'svelte/reactivity'

type PortalContext = SvelteMap<string, SvelteSet<Snippet>>

const createPortalContext = (): PortalContext => {
  return new SvelteMap<string, SvelteSet<Snippet>>()
}

export const usePortalContext = () => {
  return useThrelteUserContext('threlte-portals', createPortalContext())
}
