import type { Events, Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { Group, Object3D } from 'three'

export type BillboardProps = Props<Group> & {
  follow?: boolean | Object3D
  children: BillboardSnippet
}

export type BillboardEvents = Events<Group>
export type BillboardSnippet = Snippet<[{ ref: Group }]>

export default class Billboard extends SvelteComponent<BillboardProps, BillboardEvents> {}
