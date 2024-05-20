import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Group } from 'three'
import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export type GltfProps = Props<Group> & {
  url: string
  draco?: DRACOLoader
  meshopt?: typeof MeshoptDecoder
  ktx?: KTX2Loader
}

export type GltfEvents = Events<Group>
export type GltfSlots = Slots<Group>

export default class Gltf extends SvelteComponent<GltfProps, GltfEvents, GltfSlots> {}
