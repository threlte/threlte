import { createRawEventDispatcher } from '@threlte/core'
import { getTeleportContext } from './context'

export const useTeleportControls = () => {
  const context = getTeleportContext()
  const eventDispatcher = createRawEventDispatcher()
  
  const addSurface = (mesh: THREE.Mesh) => {
    // check if the object is already in the list
    if (context.surfaces.indexOf(mesh) > -1) {
      return
    }

    context.dispatchers.set(mesh, eventDispatcher)
    context.surfaces.push(mesh)
  }

  const removeSurface = (mesh: THREE.Mesh) => {
    const index = context.surfaces.indexOf(mesh)
    context.surfaces.splice(index, 1)
    context.dispatchers.delete(mesh)
  }

  const addBlocker = (mesh: THREE.Mesh) => {
    // check if the object is already in the list
    if (context.surfaces.indexOf(mesh) > -1) {
      return
    }

    context.blockers.push(mesh)
  }

  const removeBlocker = (mesh: THREE.Mesh) => {
    const index = context.blockers.indexOf(mesh)
    context.blockers.splice(index, 1)
  }

  return { addSurface, removeSurface, addBlocker, removeBlocker }
}