import { injectPlugin } from '@threlte/core'
import { onDestroy } from 'svelte'

export const navMeshes: THREE.Object3D[] = []

type Props = {
  teleportSurface: boolean
}

const addSurface = (mesh: THREE.Mesh) => {
  const registered = navMeshes.some((navMesh) => navMesh.uuid === mesh.uuid)

  if (!registered) {
    navMeshes.push(mesh)
  }
}

const removeSurface = (mesh: THREE.Mesh) => {
  const index = navMeshes.indexOf(mesh)
  if (index > -1) {
    navMeshes.splice(index, 1)
  }
}

export const teleportPlugin = () => 
  injectPlugin<Props>('teleport-controls', ({ ref, props }) => {
    let currentRef: THREE.Mesh = ref
    let currentProps = props

    if (!(currentRef as THREE.Mesh).isMesh) return
    if (!('teleportSurface' in props)) return

    onDestroy(() => navMeshes.splice(0, navMeshes.length))

    return {
      pluginProps: ['teleportSurface'],
      onRefChange(ref) {
        removeSurface(currentRef)

        currentRef = ref

        if (currentProps.teleportSurface) {
          addSurface(currentRef)
        }

        return () => removeSurface(currentRef)
      },
      onPropsChange(props) {
        currentProps = props

        if (currentProps.teleportSurface) {
          addSurface(currentRef)
        } else {
          removeSurface(currentRef)
        }
      },
    }
  })
