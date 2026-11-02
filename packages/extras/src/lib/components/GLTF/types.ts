import type { ThrelteGltf } from '../../types/types.js'
import type { Props } from '@threlte/core'
import type { AnimationClip, Camera, Group } from 'three'
import type { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { GLTF, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export interface GltfProps extends Props<Group> {
  /** The URL of the `.gltf` or `.glb` file to load. Changing it loads the new file. */
  url: string

  /**
   * A `DRACOLoader` for Draco-compressed geometry. Read once on mount.
   */
  dracoLoader?: DRACOLoader

  /**
   * The meshopt decoder for meshopt-compressed geometry. Read once on mount.
   */
  meshoptDecoder?: typeof MeshoptDecoder

  /**
   * A `KTX2Loader` for KTX2 textures. Read once on mount.
   */
  ktx2Loader?: KTX2Loader

  /** Called when a file has loaded, with the loaded glTF. */
  onload?: (gltf: ThrelteGltf) => void

  /** Called before a previously loaded glTF is replaced by a new `url`. */
  onunload?: () => void

  /** Called when loading fails. */
  onerror?: (error: Error) => void

  /** The loaded glTF, with its `nodes` and `materials` by name. */
  gltf?: ThrelteGltf | undefined

  /** The loaded glTF's default scene. */
  scene?: Group

  /** The loaded glTF's animation clips. */
  animations?: AnimationClip[]

  /** The loaded glTF's asset metadata, such as its generator and version. */
  asset?: GLTF['asset']

  /** The loaded glTF's cameras. */
  cameras?: Camera[]

  /** Every scene in the loaded glTF. */
  scenes?: Group[]

  /** The loaded glTF's custom `extras` data. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData?: Record<string, any>

  /** The `GLTFParser` that parsed the file. */
  parser?: GLTFParser

  // `nodes`/`materials` are typed as `Record<string, any>` for the same
  // reason as `useGltf`'s default `Graph`: they let consumers reach into the
  // scene graph (e.g. `nodes.SomeMesh.geometry`) without casting. Unlike the
  // hook, this component isn't generic, so there's no way to supply a typed
  // `Graph` — a strict type here would be unusable and impossible to override.
  /** The loaded glTF's materials, by name. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  materials?: Record<string, any>

  /** The loaded glTF's objects, by name. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes?: Record<string, any>
}
