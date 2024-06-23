import type { Events, Props } from '@threlte/core'
import type { SvelteComponent, Snippet } from 'svelte'
import type { PositionMesh } from './PositionMesh'
import type { Color } from 'three'

export type InstanceProps = Props<PositionMesh> & {
  id?: string
  color?: Parameters<Color['set']>[0]
  children?: InstanceSnippet
}

export type InstanceEvents = Events<PositionMesh>
export type InstanceSnippet = Snippet<[{ ref: PositionMesh }]>

export default class Instance extends SvelteComponent<InstanceProps, InstanceEvents> {}
