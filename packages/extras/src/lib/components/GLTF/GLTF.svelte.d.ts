import type { ThrelteGltf } from '../../types/types'
import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group } from 'three'
import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export type GltfProps = Props<Group> & {
  url: string
  draco?: DRACOLoader
  meshopt?: typeof MeshoptDecoder
  ktx?: KTX2Loader

  onload?: (gltf: ThrelteGltf) => void
  onunload?: () => void
  onerror?: (error: Error) => void
}

export default class Gltf extends SvelteComponent<GltfProps> {}
