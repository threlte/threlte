import { createEventDispatcher } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import type { Material, Object3D } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '../../hooks/useLoader'

type UseGltfOptions = {
  useDraco?: boolean | string
}

export type SceneGraph<Nodes extends string = any, Materials extends string = any> = {
  nodes: { [name in Nodes]?: Object3D }
  materials: { [name in Materials]?: Material }
}

export type ExtendedGltf<Nodes extends string, Materials extends string> = GLTF &
  SceneGraph<Nodes, Materials>

const buildGraph = <Nodes extends string, Materials extends string>(
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

createEventDispatcher

export const useGltf = <Nodes extends string = any, Materials extends string = any>(
  url: string,
  options?: UseGltfOptions
): {
  gltf: Writable<ExtendedGltf<Nodes, Materials> | undefined>
} => {
  const gltf = writable<ExtendedGltf<Nodes, Materials> | undefined>(undefined)

  const loader = useLoader(GLTFLoader, () => new GLTFLoader())
  if (options?.useDraco) {
    const dracoDecoderPath =
      typeof options.useDraco === 'string'
        ? options.useDraco
        : 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'
    const dracoLoader = useLoader(DRACOLoader, () =>
      new DRACOLoader().setDecoderPath(dracoDecoderPath)
    )
    loader.setDRACOLoader(dracoLoader)
  }

  loader.load(url, (data: GLTF) => {
    if (data.scene) Object.assign(data, buildGraph(data.scene))
    gltf.set(data as ExtendedGltf<Nodes, Materials>)
  })

  return {
    gltf
  }
}
