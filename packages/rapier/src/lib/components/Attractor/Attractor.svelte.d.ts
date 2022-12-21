import { SvelteComponentTyped } from 'svelte'
import type { AttractorProperties } from '../../types/components'

type AttractorProps = {
  position: AttractorProperties['position']
  strength: NonNullable<AttractorProperties['strength']>
  range: NonNullable<AttractorProperties['range']>
  gravityType: NonNullable<AttractorProperties['gravityType']>
  gravitationalConstant: NonNullable<AttractorProperties['gravitationalConstant']>
}

export default class Attractor extends SvelteComponentTyped<AttractorProps> {}
