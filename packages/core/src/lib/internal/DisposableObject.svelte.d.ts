import type { SvelteComponent } from 'svelte'
import type { DisposableThreeObject } from '../types'

export type DisposableObjectProperties = {
  object?: DisposableThreeObject
  dispose?: boolean
}

export default class DisposableObject extends SvelteComponent<DisposableObjectProperties> {}
