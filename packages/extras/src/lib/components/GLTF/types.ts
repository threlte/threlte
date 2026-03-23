import type { ThrelteGltf } from '../../types/types.js'
import type { Props } from '@threlte/core'
import type { Group } from 'three'
import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export type GltfProps = Props<Group> & {
  url: string
  dracoLoader?: DRACOLoader
  meshoptDecoder?: typeof MeshoptDecoder
  ktx2Loader?: KTX2Loader

  onload?: (gltf: ThrelteGltf) => void
  onunload?: () => void
  onerror?: (error: Error) => void
}
