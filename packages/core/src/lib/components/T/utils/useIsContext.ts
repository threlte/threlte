import type * as THREE from 'three'
import { getContext, setContext } from 'svelte'

/** Inlined from type-fest */
type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType
> = ObjectType[ValueType]

const key = Symbol('threlte-is-context')

export type ThreeObject = ValueOf<typeof THREE>

export const setIsContext = (is: ThreeObject) => {
  setContext(key, is)
}

export const useIsContext = <T>(): T => {
  return getContext<T>(key)
}
