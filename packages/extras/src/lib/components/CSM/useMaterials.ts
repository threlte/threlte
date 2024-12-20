import { injectPlugin } from '@threlte/core'
import { onDestroy, onMount } from 'svelte'
import type { Mesh, MeshPhongMaterial, MeshStandardMaterial } from 'three'

type SupportedMaterial = MeshStandardMaterial | MeshPhongMaterial

export const useMaterials = () => {
  let setupCallback: undefined | ((material: SupportedMaterial) => void) = undefined

  const allMaterials: Set<SupportedMaterial> = new Set()

  const isSupportedMaterial = (material: any): material is SupportedMaterial => {
    return material.isMeshStandardMaterial || material.isMeshPhongMaterial
  }

  const isMesh = (ref: any): ref is Mesh => {
    return ref.isMesh
  }

  const addMaterial = (material: SupportedMaterial) => {
    if (allMaterials.has(material)) return
    allMaterials.add(material)
    setupCallback?.(material)
  }

  const extractMaterials = (ref: any) => {
    // first check if it's a material
    if (isSupportedMaterial(ref)) {
      addMaterial(ref)
    }

    // then check if it's a mesh
    else if (isMesh(ref)) {
      if (Array.isArray(ref.material)) {
        ref.material.forEach((material) => {
          if (isSupportedMaterial(material)) {
            addMaterial(material)
          }
        })
      } else {
        if (isSupportedMaterial(ref.material)) {
          addMaterial(ref.material)
        }
      }
    }
  }

  /**
   * Callback to set up a material for CSM
   */
  const onNewMaterial = (callback: undefined | ((material: THREE.Material) => void)) => {
    setupCallback = callback
  }

  /**
   * Material Management Plugin
   *
   * This plugin extracts materials from meshes and adds them to the materials
   * queue. It will not listen to prop or ref changes.
   */
  injectPlugin('csm', ({ ref }) => {
    // we need to wait for mounting since otherwise the meshes probably have
    // default materials applied
    onMount(() => {
      extractMaterials(ref)
    })
  })

  onDestroy(() => (setupCallback = undefined))

  return { onNewMaterial, allMaterials }
}
