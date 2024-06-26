import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group, ColorRepresentation } from 'three'

export type ContactShadowsProps = Props<Group> & {
  opacity?: number
  width?: number
  height?: number
  blur?: number
  far?: number
  smooth?: boolean
  resolution?: number
  frames?: number
  scale?: number | [x: number, y: number]
  color?: ColorRepresentation
  depthWrite?: boolean
}

export default class ContactShadows extends SvelteComponent<ContactShadowsProps> {}
