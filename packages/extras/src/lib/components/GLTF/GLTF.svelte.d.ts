import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

export type GltfProps = Props<Group> & {
  url: string
  useDraco?: string | boolean
  useMeshopt?: boolean
  ktxTranscoderPath?: string
}

export type GltfEvents = Events<Group>
export type GltfSlots = Slots<Group>

export default class Gltf extends SvelteComponentTyped<GltfProps, GltfEvents, GltfSlots> {}
