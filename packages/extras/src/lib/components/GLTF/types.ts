import type { ThrelteGltf } from '../../types/types.js'
import type { Props } from '@threlte/core'
import type { Group } from 'three'
import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export interface GltfProps extends Props<Group> {
  url: string
  dracoLoader?: DRACOLoader
  meshoptDecoder?: typeof MeshoptDecoder
  ktx2Loader?: KTX2Loader

  onload?: (gltf: ThrelteGltf) => void
  onunload?: () => void
  onerror?: (error: Error) => void

  gltf?: ThrelteGltf | undefined
  // `nodes`/`materials` are typed as `Record<string, any>` for the same
  // reason as `useGltf`'s default `Graph`: they let consumers reach into the
  // scene graph (e.g. `nodes.SomeMesh.geometry`) without casting. Unlike the
  // hook, this component isn't generic, so there's no way to supply a typed
  // `Graph` — a strict type here would be unusable and impossible to override.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  materials?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes?: Record<string, any>
}
