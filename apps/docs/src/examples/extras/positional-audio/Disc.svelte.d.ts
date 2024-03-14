import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Group } from 'three'

export default class Disc extends SvelteComponent<Props<Group>, Events<Group>, Slots<Group>> {}
