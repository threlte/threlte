import type { ConditionalKeys, Primitive } from 'type-fest'

/**
 * We hold a list of prop keys that should be ommited from the object props
 * that are infered by the provided type.
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
export type MaybeInstance<Type extends any> = Type extends AnyClass ? InstanceType<Type> : Type

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
export type BaseProps<Type extends any> = {
  attach?: string | ((parent: any, self: MaybeInstance<Type>) => (() => void) | void)
}

/**
 * ### Disposable Props
 */
export type DisposableProps = {
  /**
   * If true, the object will be deeply disposed when the component unmounts.
   */
  dispose?: boolean
}

/**
 * ### Class Props
 */
export type ClassProps<Type extends any> = Type extends AnyClass
  ? {
      args?: any[] | ConstructorParameters<Type>
    }
  : Record<string, unknown>

// Ref Props
export type RefProps<Type extends any> = {
  ref?: MaybeInstance<Type>
}

/**
 * ### Camera Props
 */
export type CameraProps<Type extends any> = MaybeInstance<Type> extends { isCamera: true }
  ? {
      /**
       * By default, threlte will update the cameras aspect ratio or frustum
       * when the canvas is resized. If you want to manually control the
       * camera, set this to true.
       * @default true
       */
      manual?: boolean
      /**
       * Sets the camera as the default camera for the scene.
       * @default false
       */
      makeDefault?: boolean
    }
  : Record<string, unknown>

/**
 * ### Instance Props
 *
 * Enables the use of props that are infered from the provided type.
 */
export type InstanceProps<Type extends any> = Partial<
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

/**
 * ### `Props<Type>`
 *
 * This type is used as the Prop type for the components `<T>` and `<Three>`.
 *
 * @example Props<typeof PerspectiveCamera>
 * // { position: [number, number, number], fov: number, etc… }
 */
export type Props<Type extends any> = AnyProps &
  DisposableProps &
  RefProps<Type> &
  BaseProps<Type> &
  ClassProps<Type> &
  CameraProps<Type> &
  InstanceProps<Type>

// –––––––––––––––––––––––– SLOTS ––––––––––––––––––––––––

/**
 * ### `Slots<Type>`
 *
 * This type is used as the Slot type for the components `<T>` and `<Three>`.
 * @example Slots<typeof PerspectiveCamera>
 * // { default: { ref: PerspectiveCamera } }
 */
export type Slots<Type extends any> = {
  default: {
    ref: MaybeInstance<Type>
  }
}

// –––––––––––––––––––––––– EVENTS ––––––––––––––––––––––––

export type CreateEvent<Type extends any> = {
  create: {
    ref: MaybeInstance<Type>
    cleanup: (callback: () => void) => void
  }
}

/**
 * ### `Events<Type>`
 *
 * This type is used as the Events type for the components `<T>` and `<Three>`.
 * @example Events<typeof PerspectiveCamera>
 * // { create: { ref: PerspectiveCamera, cleanup: (callback: () => void) => void } }
 */
export type Events<Type extends any> = Record<string, unknown> & CreateEvent<Type>
