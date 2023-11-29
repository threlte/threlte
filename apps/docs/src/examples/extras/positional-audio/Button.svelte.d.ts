import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

export default class Button extends SvelteComponentTyped<
  Props<Group>,
  Events<Group>,
  Slots<Group>
> {}
