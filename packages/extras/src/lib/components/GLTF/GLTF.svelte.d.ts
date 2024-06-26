import type { ThrelteGltf } from '../../types/types'
import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group } from 'three'

export type GltfProps = Props<Group> & {
  url: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string

  onload?: (gltf: ThrelteGltf) => void
  onunload?: () => void
  onerror?: (error: Error) => void
}

export default class Gltf extends SvelteComponent<GltfProps> {}
