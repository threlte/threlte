import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group } from 'three'

export type CarProps = Props<Group>

export default class Car extends SvelteComponentTyped<CarProps, Events<Group>, Slots<Group>> {}
