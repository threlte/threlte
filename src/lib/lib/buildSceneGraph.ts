import type { Material, Object3D } from 'three'

export type SceneGraph<Nodes extends string = any, Materials extends string = any> = {
  nodes: { [name in Nodes]?: Object3D }
  materials: { [name in Materials]?: Material }
}

export const buildSceneGraph = <Nodes extends string, Materials extends string>(
  object: THREE.Object3D
): SceneGraph<Nodes, Materials> => {
  const data: SceneGraph = { nodes: {}, materials: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) data.nodes[obj.name] = obj
      if (obj.material && !data.materials[obj.material.name])
        data.materials[obj.material.name] = obj.material
    })
  }
  return data as SceneGraph<Nodes, Materials>
}
