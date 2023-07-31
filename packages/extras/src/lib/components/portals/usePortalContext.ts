import { currentWritable, useThrelteUserContext, type CurrentWritable } from '@threlte/core'
import { derived, type Readable } from 'svelte/store'
import type { Object3D } from 'three'

type PortalContext = {
  portals: CurrentWritable<Map<string, Object3D>>
  addPortal: (object: Object3D, id: string) => void
  removePortal: (id: string) => void
  getPortal: (id: string) => Readable<Object3D | undefined>
  hasPortal: (id: string) => boolean
}

const createPortalContext = () => {
  const ctx: PortalContext = {
    portals: currentWritable(new Map()),
    addPortal(object, id) {
      ctx.portals.update((portals) => {
        if (portals.has(id)) {
          console.warn(`Portal with id ${id} already exists. Skipping portal creation.`)
        } else {
          portals.set(id, object)
        }
        return portals
      })
    },
    removePortal(id) {
      ctx.portals.update((portals) => {
        if (!portals.has(id)) {
          console.warn(`Portal with id ${id} does not exist. Skipping portal removal.`)
        } else {
          portals.delete(id)
        }
        return portals
      })
    },
    getPortal(id) {
      return derived(ctx.portals, (portals) => portals.get(id))
    },
    hasPortal(id) {
      return ctx.portals.current.has(id)
    }
  }
  return ctx
}

export const usePortalContext = () => {
  return useThrelteUserContext('threlte-portals', createPortalContext())
}
