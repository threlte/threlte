import type { Material, Mesh, Object3D } from 'three'

export type Nodes = Record<string, Object3D>
export type Materials = Record<string, Material>

export type SceneGraph = {
  nodes: Nodes
  materials: Materials
}

export const buildSceneGraph = <Graph extends SceneGraph>(object: Object3D): Graph => {
  const data: Graph = { nodes: {}, materials: {} } as Graph

  const addMaterial = (material: Material) => {
    if (!data.materials[material.name]) {
      data.materials[material.name] = material
    }
  }

  if (object) {
    object.traverse((child) => {
      if (child.name) {
        data.nodes[child.name] = child
      }

      const material = (child as Mesh).material as Material | Material[] | undefined

      if (Array.isArray(material)) {
        for (const mat of material) {
          addMaterial(mat)
        }
      } else if (material) {
        addMaterial(material)
      }
    })
  }
  return data as Graph
}
