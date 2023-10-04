import { injectPlugin } from '@threlte/core'
import { onMount } from 'svelte'
import type { Mesh, MeshPhongMaterial, MeshStandardMaterial, SkinnedMesh } from 'three'

export const useMaterials = () => {
  const isSupportedMaterial = (
    material: any
  ): material is MeshStandardMaterial | MeshPhongMaterial => {
    return material.isMeshStandardMaterial || material.isMeshPhongMaterial
  }

  const materialsQueue: Set<MeshStandardMaterial | MeshPhongMaterial> = new Set()
  const allMaterials: Set<MeshStandardMaterial | MeshPhongMaterial> = new Set()

  const addMaterial = (material: MeshStandardMaterial | MeshPhongMaterial) => {
    materialsQueue.add(material)
    allMaterials.add(material)
  }

  const removeMaterial = (material: MeshStandardMaterial | MeshPhongMaterial) => {
    materialsQueue.delete(material)
    allMaterials.delete(material)
  }

  const isMesh = (ref: any): ref is Mesh | SkinnedMesh => {
    return ref.isMesh || ref.isSkinnedMesh
  }

  const extractMaterials = (ref: any) => {
    let materials: (MeshStandardMaterial | MeshPhongMaterial)[] = []
    // first check if it's a material
    if (isSupportedMaterial(ref)) {
      materials.push(ref)
    }
    // then check if it's a mesh
    if (isMesh(ref)) {
      if (Array.isArray(ref.material)) {
        ref.material.forEach((material) => {
          if (isSupportedMaterial(material)) {
            materials.push(material)
          }
        })
      } else {
        if (isSupportedMaterial(ref.material)) {
          materials.push(ref.material)
        }
      }
    }
    return materials
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
      const materials = extractMaterials(ref)
      materials.forEach((material) => addMaterial(material))
      return () => {
        materials.forEach((material) => removeMaterial(material))
      }
    })
  })

  return { materialsQueue, allMaterials }
}
