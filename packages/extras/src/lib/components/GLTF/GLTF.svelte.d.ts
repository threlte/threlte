import type { Events, Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { Group } from 'three'

export type GltfProps = Props<Group> & {
  url: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string
  children?: GltfSnippet
}

export type GltfEvents = Events<Group>
export type GltfSnippet = Snippet<[{ ref: Group }]>

export default class Gltf extends SvelteComponent<GltfProps, GltfEvents> {}
