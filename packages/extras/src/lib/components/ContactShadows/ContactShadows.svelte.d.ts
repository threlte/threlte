import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
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

export type ContactShadowsEvents = Events<Group>

export type ContactShadowsSlots = Slots<Group>

export default class ContactShadows extends SvelteComponent<
  ContactShadowsProps,
  ContactShadowsEvents,
  ContactShadowsSlots
> {}
