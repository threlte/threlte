import { injectPlugin } from '@threlte/core'
import { onDestroy, onMount } from 'svelte'
import type { Mesh, Material, SkinnedMesh } from 'three'

export const useMaterials = () => {
  let callback: null | ((material: Material) => void) = null

  const allMaterials: Set<Material> = new Set()

  const isMaterial = (material: any): material is Material => {
    return material.isMaterial
  }

  const isMesh = (ref: any): ref is Mesh | SkinnedMesh => {
    return ref.isMesh || ref.isSkinnedMesh
  }

  const addMaterial = (material: Material) => {
    if (allMaterials.has(material)) return
    allMaterials.add(material)
    callback?.(material)
  }

  const extractMaterials = (ref: any) => {
    // first check if it's a material
    if (isMaterial(ref)) {
      addMaterial(ref)
    }

    // then check if it's a mesh
    else if (isMesh(ref)) {
      if (Array.isArray(ref.material)) {
        ref.material.forEach((material) => {
          addMaterial(material)
        })
      } else {
        addMaterial(ref.material)
      }
    }
  }

  const onNewMaterial = (fn: null | ((material: THREE.Material) => void)) => {
    callback = fn
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

  onDestroy(() => (callback = null))

  return { onNewMaterial, allMaterials }
}
