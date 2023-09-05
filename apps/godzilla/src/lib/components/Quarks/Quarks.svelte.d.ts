import { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import { Group } from 'three'

type QuarksProps = Props<Group> & {
	url: string
}
type QuarksEvents = Events<Group>
type QuarksSlots = Slots<Group>

export default class Quarks extends SvelteComponent<QuarksProps, QuarksEvents, QuarksSlots> {}
