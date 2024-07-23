import type { SvelteComponent, Snippet } from 'svelte'
import type { DisposableThreeObject } from '../types'

export type DisposableObjectProperties = {
  object?: DisposableThreeObject
  dispose?: boolean
  children?: Snippet
}

export default class DisposableObject extends SvelteComponent<DisposableObjectProperties> {}
