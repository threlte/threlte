import { SvelteComponentTyped } from 'svelte'
import type { AttractorProperties } from '../../types/components'
import { Props, type Events, type Slots } from '@threlte/core'
import type { Group } from 'three'

type AttractorProps = Props<Group> & {
  strength: NonNullable<AttractorProperties['strength']>
  range: NonNullable<AttractorProperties['range']>
  gravityType: NonNullable<AttractorProperties['gravityType']>
  gravitationalConstant: NonNullable<AttractorProperties['gravitationalConstant']>
}

type AttractorEvents = Events<Group>

type AttractorSlots = Slots<Group>

export default class Attractor extends SvelteComponentTyped<
  AttractorProps,
  AttractorEvents,
  AttractorSlots
> {}
