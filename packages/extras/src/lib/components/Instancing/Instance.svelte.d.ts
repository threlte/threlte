import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { PositionMesh } from './PositionMesh'
import type { Color } from 'three'

export type InstanceProps = Props<PositionMesh> & {
  id?: string
  color?: Parameters<Color['set']>[0]
}

export default class Instance extends SvelteComponent<InstanceProps> {}
