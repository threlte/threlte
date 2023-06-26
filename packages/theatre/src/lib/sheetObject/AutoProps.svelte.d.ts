import type { SvelteComponent } from 'svelte'
import type { Props } from '@threlte/core'

type ObjectProp<T> = {
  ref?: T
}

type BooleanProps<T> = {
  [P in keyof Props<T>]?: any // should be string | boolean
}

type AllProps<T> = BooleanProps<T> & ObjectProp<T> & Record<string, any>

export default class AutoProps<T> extends SvelteComponent<
  AllProps<T>,
  Record<string, any>,
  Record<string, any>
> {}
