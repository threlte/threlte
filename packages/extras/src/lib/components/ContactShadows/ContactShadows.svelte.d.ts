import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

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
  color?: THREE.ColorRepresentation
  depthWrite?: boolean
}

export default class ContactShadows extends SvelteComponentTyped<
  ContactShadowsProps,
  Events<Group>,
  Slots<Group>
> {}
