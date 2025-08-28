import type { Snippet } from 'svelte'
import type { Object3D } from 'three'

/** Inlined from type-fest */
type ConditionalKeys<Base, Condition> = {
  // Map through all the keys of the given base type.
  [Key in keyof Base]-?: Base[Key] extends Condition // Pick only keys with types extending the given `Condition` type.
    ? // Retain this key since the condition passes.
      Key
    : // Discard this key since the condition fails.
      never

  // Convert the produced object into a union type of the keys which passed the conditional test.
}[keyof Base]

/** Inlined from type-fest */
type Primitive = null | undefined | string | number | boolean | symbol | bigint

/**
 * We hold a list of prop keys that should be omitted from the object props
 * that are inferred by the provided type.
 */
export type OmittedPropKeys =
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

export type AnyClass = new (...args: any) => any
export type AnyFn = (...args: any) => any

/**
 * This type returns an InstanceType if the provided type is a class, otherwise
 * it returns the type itself.
 */
export type MaybeInstance<Type> = Type extends AnyClass ? InstanceType<Type> : Type

// –––––––––––––––––––––––– PROPS ––––––––––––––––––––––––

/**
 * ### Any Props
 *
 * Enables the use of arbitrary props.
 */
export type AnyProps = Record<string, any>

/**
 * ### Base Props
 */
export type BaseProps<Type, ChildrenArgs extends unknown[] = [{ ref: MaybeInstance<Type> }]> = {
  /**
   * If true, the object will be deeply disposed when the component unmounts.
   */
  dispose?: boolean

  attach?:
    | string
    | Object3D
    | ((args: {
        ref: MaybeInstance<Type>
        parent: unknown
        parentObject3D: Object3D
      }) => void | (() => void))
    | false
    | undefined

  children?: Snippet<ChildrenArgs>

  oncreate?: CreateEvent<MaybeInstance<Type>>
}

/**
 * ### Class Props
 */
export type ClassProps<Type> = Type extends AnyClass
  ? {
      args?: any[] | ConstructorParameters<Type>
    }
  : {
      args?: never
    }

// Ref Props
export type RefProps<Type> = {
  ref?: MaybeInstance<Type>
}

/**
 * ### Camera Props
 */
export type CameraProps<Type> =
  MaybeInstance<Type> extends { isCamera: true }
    ? {
        /**
         * By default, Threlte will update the cameras aspect ratio or frustum
         * when the canvas is resized. If you want to manually control the
         * camera, set this to true.
         * @default false
         */
        manual?: boolean
        /**
         * Sets the camera as the default camera for the scene.
         * @default false
         */
        makeDefault?: boolean
      }
    : {
        makeDefault?: never
        manual?: never
      }

/**
 * ### Instance Props
 *
 * Enables the use of props that are inferred from the provided type.
 *
 * ```ts
 * type PerspectiveCameraProps = InstanceProps<typeof PerspectiveCamera>
 * // { fov: number, aspect: number, etc… }
 * ```
 */
export type InstanceProps<Type> = Partial<
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

// –––––––––––––––––––––––– EVENTS ––––––––––––––––––––––––

export type EventProps<Type> = Type extends {
  addEventListener: (type: any, listener: (args: any[]) => void) => any
}
  ? {
      [Key in Parameters<Type['addEventListener']>[0] & string as `on${Key}`]?: (
        event: ExtractPayload<Key, Type>
      ) => void
    }
  : Record<string, unknown>

type ExtractPayload<
  Event extends string,
  Type extends { addEventListener: (type: string, listener: (args: any[]) => void) => any }
> = Parameters<Extract<Type['addEventListener'], (type: Event, listener: any) => any>>[1] extends (
  event: infer EventData
) => any
  ? EventData
  : never

type CreateEvent<Type> = (ref: Type) => void | (() => void)

// –––––––––––––––––––––––– PROPS ––––––––––––––––––––––––

/**
 * ### `Props<Type>`
 *
 * This type is used as the Prop type for the component `<T>`.
 *
 * @example Props<typeof PerspectiveCamera>
 * // { position: [number, number, number], fov: number, etc… }
 */
export type Props<
  Type,
  ChildrenArgs extends unknown[] = [{ ref: MaybeInstance<Type> }]
> = AnyProps &
  RefProps<Type> &
  BaseProps<Type, ChildrenArgs> &
  ClassProps<Type> &
  CameraProps<Type> &
  InstanceProps<Type> &
  EventProps<MaybeInstance<Type>> &
  Threlte.UserProps

/**
 * ### `TProps<Type>`
 *
 * This type is internally used as the Prop type for the component `<T>`.
 */
export type TProps<Type> = {
  is: Type
} & Props<Type>
