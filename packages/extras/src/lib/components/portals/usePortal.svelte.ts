import { Map, Set } from 'svelte/reactivity'
import type { Snippet } from 'svelte'
import { useThrelteUserContext } from '@threlte/core'

const createPortalContext = () => {
  const portals = new Map<string, Set<Snippet>>()

  const addPortal = (id: string) => {
    portals.set(id, new Set<Snippet>())
    return () => {
      portals.delete(id)
    }
  }

  const addChild = (id: string, child: Snippet) => {
    portals.get(id)?.add(child)
    return () => {
      portals.get(id)?.delete(child)
    }
  }

  return {
    addChild,
    addPortal,
    portals
  }
}

export const usePortal = () => {
  return useThrelteUserContext('threlte-portals', createPortalContext())
}
