import { useThrelteUserContext } from '@threlte/core'
import { SvelteMap } from 'svelte/reactivity'
import type { Object3D } from 'three'

type PortalContext = {
  addPortal: (object: Object3D, id: string) => void
  removePortal: (id: string) => void
  hasPortal: (id: string) => boolean
  getPortal: (id: string) => { current: Object3D | undefined }
}

const createPortalContext = () => {
  const portals = new SvelteMap<string, Object3D>()

  const ctx: PortalContext = {
    addPortal(object, id) {
      if (portals.has(id)) {
        console.warn(`Portal with id ${id} already exists. Skipping portal creation.`)
      } else {
        portals.set(id, object)
      }
    },
    removePortal(id) {
      if (!portals.has(id)) {
        console.warn(`Portal with id ${id} does not exist. Skipping portal removal.`)
      } else {
        portals.delete(id)
      }
    },
    getPortal(id) {
      return {
        get current() {
          return portals.get(id)
        }
      }
    },
    hasPortal(id) {
      return portals.has(id)
    }
  }
  return ctx
}

export const usePortalContext = () => {
  return useThrelteUserContext('threlte-portals', createPortalContext())
}
