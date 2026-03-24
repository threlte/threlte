import { useLoader, type AsyncWritable } from '@threlte/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { buildSceneGraph, type SceneGraph } from '../lib/buildSceneGraph.js'
import type { ThrelteGltf } from '../types/types.js'

type UseGltfOptions = {
  dracoLoader?: DRACOLoader | undefined
  meshoptDecoder?: typeof MeshoptDecoder | undefined
  ktx2Loader?: KTX2Loader | undefined
}

export function useGltf(options?: UseGltfOptions): {
  load: <
    Graph extends SceneGraph = {
      nodes: Record<string, any>
      materials: Record<string, any>
    }
  >(
    url: string
  ) => AsyncWritable<ThrelteGltf<Graph>>
}
export function useGltf<
  Graph extends SceneGraph = {
    nodes: Record<string, any>
    materials: Record<string, any>
  }
>(url: string, options?: UseGltfOptions): AsyncWritable<ThrelteGltf<Graph>>
export function useGltf<
  Graph extends SceneGraph = {
    nodes: Record<string, any>
    materials: Record<string, any>
  }
>(
  urlOrOptions?: string | UseGltfOptions,
  options?: UseGltfOptions
):
  | AsyncWritable<ThrelteGltf<Graph>>
  | {
      load: <
        Graph extends SceneGraph = {
          nodes: Record<string, any>
          materials: Record<string, any>
        }
      >(
        url: string
      ) => AsyncWritable<ThrelteGltf<Graph>>
    } {
  const opts = typeof urlOrOptions === 'string' ? options : urlOrOptions
  const loader = useLoader(GLTFLoader, {
    extend(loader) {
      if (opts?.dracoLoader) {
        loader.setDRACOLoader(opts.dracoLoader)
      }

      if (opts?.meshoptDecoder) {
        loader.setMeshoptDecoder(opts.meshoptDecoder)
      }

      if (opts?.ktx2Loader) {
        loader.setKTX2Loader(opts.ktx2Loader)
      }
    }
  })

  const load = (url: string) => {
    return loader.load(url, {
      transform(result) {
        return {
          ...result,
          ...buildSceneGraph(result.scene)
        }
      }
    })
  }

  const url = typeof urlOrOptions === 'string' ? urlOrOptions : undefined

  if (url) {
    return load(url)
  } else {
    return {
      load
    }
  }
}
