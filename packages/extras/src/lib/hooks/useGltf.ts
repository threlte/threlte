import { createEventDispatcher } from 'svelte'
import { writable, type Writable } from 'svelte/store'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@threlte/core'
import type { ThrelteGltf } from '../types/types'
import {
  buildSceneGraph,
  type Nodes,
  type Materials,
  type SceneGraph
} from '../lib/buildSceneGraph'
import { DefaultLoadingManager } from 'three'

type UseGltfOptions = {
  useDraco?: boolean | string
}

createEventDispatcher

export const useGltf = <
  Graph extends SceneGraph = {
    nodes: Record<string, any>
    materials: Record<string, any>
  }
>(
  url: string,
  options?: UseGltfOptions
): {
  gltf: Writable<ThrelteGltf<Graph> | undefined>
} => {
  const gltf = writable<ThrelteGltf<Graph> | undefined>(undefined)

  const loader = useLoader(GLTFLoader, () => new GLTFLoader(DefaultLoadingManager))
  if (options?.useDraco) {
    const dracoDecoderPath =
      typeof options.useDraco === 'string'
        ? options.useDraco
        : 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'
    const dracoLoader = useLoader(DRACOLoader, () =>
      new DRACOLoader(DefaultLoadingManager).setDecoderPath(dracoDecoderPath)
    )
    loader.setDRACOLoader(dracoLoader)
  }

  loader.load(url, (data: GLTF) => {
    if (data.scene) Object.assign(data, buildSceneGraph<Graph>(data.scene))
    gltf.set(data as ThrelteGltf<Graph>)
  })

  return {
    gltf
  }
}
