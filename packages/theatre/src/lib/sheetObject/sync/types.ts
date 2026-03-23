import type { Snippet } from 'svelte'
import type { ConditionalKeys, Primitive } from 'type-fest'
import type { Transformer } from '../transfomers/types.js'

/* COPIED FROM @threlte/core START */
type OmittedPropKeys =
  | 'type'
  | 'args'
  | 'attach'
  | 'manual'
  | 'makeDefault'
  | 'id'
  | 'children'
  | `is${string}` // isMesh, isObject3D, etc
  | 'parent'
  | 'uuid'
  | 'name'
type AnyClass = new (...args: any) => any
type AnyFn = (...args: any) => any
type MaybeInstance<Type> = Type extends AnyClass ? InstanceType<Type> : Type
type InstanceProps<Type> = Partial<
  Omit<
    MaybeInstance<Type> extends Primitive
      ? Record<string, unknown>
      : {
          [K in keyof MaybeInstance<Type>]?: MaybeInstance<Type>[K] extends {
            set: (...args: any[]) => any
          }
            ?
                | Parameters<MaybeInstance<Type>[K]['set']>
                | Parameters<MaybeInstance<Type>[K]['set']>[0]
            : MaybeInstance<Type>[K] extends AnyFn
              ? never
              : MaybeInstance<Type>[K]
        },
    ConditionalKeys<MaybeInstance<Type>, AnyFn> | OmittedPropKeys
  >
>
/* COPIED FROM @threlte/core END */

type ObjectProp<T> = {
  type?: T
}

export type ComplexProp = {
  transformer?: Transformer
  label?: string
  key?: string
}

export type AnyProp = string | boolean | ComplexProp

type AnyProps<T> = {
  [P in keyof InstanceProps<T>]?: AnyProp
}

export type SyncProps<T> = AnyProps<T> &
  ObjectProp<T> &
  Record<string, AnyProp | T> & {
    children?: Snippet<[{ capture: () => void }]>
  }
