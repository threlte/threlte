import { injectPlugin, isInstanceOf } from '@threlte/core'
import type { Material, MeshPhongMaterial, MeshStandardMaterial } from 'three'

type SupportedMaterial = MeshStandardMaterial | MeshPhongMaterial

export const useMaterials = () => {
  let setupCallback: undefined | ((material: SupportedMaterial) => void) = undefined

  const allMaterials: Set<SupportedMaterial> = new Set()

  const isSupportedMaterial = (material: unknown): material is SupportedMaterial => {
    return (
      isInstanceOf(material, 'MeshStandardMaterial') || isInstanceOf(material, 'MeshPhongMaterial')
    )
  }

  const addMaterial = (material: SupportedMaterial) => {
    if (allMaterials.has(material)) return
    allMaterials.add(material)
    setupCallback?.(material)
  }

  const extractMaterials = (ref: unknown) => {
    // first check if it's a material
    if (isSupportedMaterial(ref)) {
      addMaterial(ref)
    }

    // then check if it's a mesh
    else if (isInstanceOf(ref, 'Mesh')) {
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
  const onNewMaterial = (callback: undefined | ((material: Material) => void)) => {
    setupCallback = callback
  }

  /**
   * Material Management Plugin
   *
   * This plugin extracts materials from meshes and adds them to the materials
   * queue. It will not listen to prop or ref changes.
   */
  injectPlugin('csm', (args) => {
    // we need to wait for mounting since otherwise the meshes probably have
    // default materials applied
    $effect.pre(() => {
      extractMaterials(args.ref)
    })
  })

  $effect.pre(() => {
    return () => (setupCallback = undefined)
  })

  return { onNewMaterial, allMaterials }
}
