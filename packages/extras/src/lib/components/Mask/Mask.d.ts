import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Mesh } from 'three'

export type MaskProps = Props<Mesh> & {
  /** Each mask must have an id, you can have compound masks referring to the same id */
  id?: number
  /** If colors of the masks own material will leak through. */
  colorWrite?: boolean
  /** If depth  of the masks own material will leak through. */
  depthWrite?: boolean
}

export type MaskEvents = Events<Mesh>

export type MaskSlots = Slots<Mesh>

export default class Mask extends SvelteComponent<MeshLineProps, MeshLineEvents, MeshLineSlots> {}
