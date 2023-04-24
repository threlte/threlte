import type { SvelteComponentTyped } from 'svelte'
import type { DisposableThreeObject } from '../types'

export type DisposableObjectProperties = {
  object?: DisposableThreeObject
  dispose?: boolean
}

export default class DisposableObject extends SvelteComponentTyped<DisposableObjectProperties> {}
