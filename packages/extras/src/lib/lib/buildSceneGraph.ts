import type { Object3D } from 'three'

export type Nodes = Record<string, any>
export type Materials = Record<string, any>

export type SceneGraph = {
  nodes: Nodes
  materials: Materials
}

export const buildSceneGraph = <Graph extends SceneGraph = any>(object: Object3D): Graph => {
  const data: Graph = { nodes: {}, materials: {} } as Graph
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) data.nodes[obj.name as any] = obj
      if (obj.material && !data.materials[obj.material.name])
        data.materials[obj.material.name as any] = obj.material
    })
  }
  return data as Graph
}
