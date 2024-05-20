import type { ValueOf } from 'type-fest'
import type * as THREE from 'three'
import { getContext, setContext } from 'svelte'

const key = Symbol('threlte-is-context')

// Determine if a type is a class constructor
type IsClass<T> = T extends new (...args: unknown[]) => unknown ? T : never

// Pick properties that are classes from an object
type ClassProperties<T> = {
  [K in keyof T]: IsClass<T[K]>
}

// Filter out non-class properties (i.e., properties that are `never`)
type NonNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}

export type ThreeObject = ValueOf<NonNever<ClassProperties<typeof THREE>>>

export const setIsContext = (is: ThreeObject) => {
  setContext<ThreeObject>(key, is)
}

export const useIsContext = (): ThreeObject => {
  return getContext<ThreeObject>(key)
}
