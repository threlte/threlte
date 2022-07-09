import { createEventDispatcher } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from './useLoader'
import type { ThrelteGltf } from '../types/types'
import { buildSceneGraph } from '../lib/buildSceneGraph'

type UseGltfOptions = {
  useDraco?: boolean | string
}

createEventDispatcher

export const useGltf = <Nodes extends string = any, Materials extends string = any>(
  url: string,
  options?: UseGltfOptions
): {
  gltf: Writable<ThrelteGltf<Nodes, Materials> | undefined>
} => {
  const gltf = writable<ThrelteGltf<Nodes, Materials> | undefined>(undefined)

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
    if (data.scene) Object.assign(data, buildSceneGraph(data.scene))
    gltf.set(data as ThrelteGltf<Nodes, Materials>)
  })

  return {
    gltf
  }
}
