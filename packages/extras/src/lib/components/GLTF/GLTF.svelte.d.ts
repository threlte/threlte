import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group } from 'three'

export type GltfProps = Props<Group> & {
  url: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string
}

export default class Gltf extends SvelteComponent<GltfProps> {}
