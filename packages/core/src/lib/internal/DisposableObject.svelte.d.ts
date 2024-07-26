import type { Component, Snippet } from 'svelte'
import type { DisposableThreeObject } from '../types'

export type DisposableObjectProperties = {
  object?: DisposableThreeObject
  dispose?: boolean
  children?: Snippet
}

declare const DisposableObject: Component<DisposableObjectProperties>
export default DisposableObject
