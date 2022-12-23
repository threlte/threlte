import type { TransformableObjectProperties } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { ColorRepresentation } from 'three'

export type InstanceProps = Omit<TransformableObjectProperties, 'object'> & {
  color?: ColorRepresentation
  id?: string
}

export default class Instance extends SvelteComponentTyped<InstanceProps> {}
