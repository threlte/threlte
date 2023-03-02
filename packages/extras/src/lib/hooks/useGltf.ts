import { useLoader, type AsyncWritable } from '@threlte/core'
import { createEventDispatcher } from 'svelte'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { buildSceneGraph, type SceneGraph } from '../lib/buildSceneGraph'
import type { ThrelteGltf } from '../types/types'

type UseGltfOptions = {
  useDraco?: boolean | string
  useMeshopt?: boolean
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
): AsyncWritable<ThrelteGltf<Graph>> => {
  const loader = useLoader(GLTFLoader, {
    extend(loader) {
      if (options?.useDraco) {
        const dracoDecoderPath =
          typeof options.useDraco === 'string'
            ? options.useDraco
            : 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'

        const dracoLoader = new DRACOLoader().setDecoderPath(dracoDecoderPath)
        loader.setDRACOLoader(dracoLoader)
      }

      if (options?.useMeshopt) {
        loader.setMeshoptDecoder(MeshoptDecoder)
      }
    }
  })

  return loader.load(url, {
    transform(result) {
      return {
        ...result,
        ...buildSceneGraph(result.scene)
      }
    }
  })
}
