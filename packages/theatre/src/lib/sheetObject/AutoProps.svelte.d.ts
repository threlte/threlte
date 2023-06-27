import type { InstanceProps } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Transformer } from './transfomers/types'

type ObjectProp<T> = {
  ref?: T
}

export type ComplexProp = {
  transformer?: Transformer
  initialValue?: any
  label?: string
}

export type AnyProp = string | boolean | ComplexProp

type AnyProps<T> = {
  [P in keyof InstanceProps<T>]?: AnyProp
}

type AllProps<T> = AnyProps<T> & ObjectProp<T> & Record<string, any>

export default class AutoProps<T> extends SvelteComponent<
  AllProps<T>,
  Record<string, any>,
  Record<string, any>
> {}
