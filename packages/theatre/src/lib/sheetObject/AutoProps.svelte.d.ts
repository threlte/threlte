import type { SvelteComponentTyped } from 'svelte'
import type { Props } from '@threlte/core'

type ObjectProp<T> = {
  ref?: T
}

type BooleanProps<T> = {
  [P in keyof Props<T>]?: any
}

type AllProps<T> = BooleanProps<T> & ObjectProp<T> & Record<string, any>

export default class AutoProps<T = any> extends SvelteComponentTyped<
  AllProps<T>,
  Record<string, never>,
  Record<string, never>
> {}
