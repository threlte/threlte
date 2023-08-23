import { useLoader, useThrelte, type AsyncWritable } from '@threlte/core'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { buildSceneGraph, type SceneGraph } from '../lib/buildSceneGraph'
import type { ThrelteGltf } from '../types/types'

type UseGltfOptions = {
  useDraco?: boolean | string | DRACOLoader
  useMeshopt?: boolean
  ktxTranscoderPath?: string
}

let defaultDracoLoaderInstance: DRACOLoader | undefined

const useDefaultDracoLoader = (dracoDecoderPath?: string) => {
  const path = dracoDecoderPath || 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'
  console.log('using draco')
  if (!defaultDracoLoaderInstance)
    defaultDracoLoaderInstance = new DRACOLoader().setDecoderPath(path)
  return defaultDracoLoaderInstance
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
  const { renderer } = useThrelte()
  const opts = typeof urlOrOptions === 'string' ? options : urlOrOptions
  const loader = useLoader(GLTFLoader, {
    extend(loader) {
      if (opts?.useDraco) {
        if (typeof opts.useDraco === 'string' || typeof opts.useDraco === 'boolean') {
          // default draco
          const dracoLoader = useDefaultDracoLoader(
            typeof opts.useDraco === 'string' ? opts.useDraco : undefined
          )
          loader.setDRACOLoader(dracoLoader)
        } else {
          // user's draco
          loader.setDRACOLoader(opts.useDraco)
        }
      }

      if (opts?.useMeshopt) {
        loader.setMeshoptDecoder(MeshoptDecoder)
      }

      if (opts?.ktxTranscoderPath) {
        const ktx2Loader = new KTX2Loader()
        ktx2Loader.setTranscoderPath(opts?.ktxTranscoderPath)
        ktx2Loader.detectSupport(renderer)
        loader.setKTX2Loader(ktx2Loader)
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
