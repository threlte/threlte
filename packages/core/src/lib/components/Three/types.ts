import type {
  AnyProps,
  BaseProps,
  CameraProps,
  ClassProps,
  DisposableProps,
  InstanceProps,
  MaybeInstance,
  RefProps
} from '../types/sharedTypes'

/**
 * ### `Props<Type>`
 *
 * This type is used as the Prop type for the components `<T>` and `<Three>`.
 */
export type Props<Type extends any> = AnyProps &
  DisposableProps &
  RefProps<Type> &
  BaseProps<Type> &
  ClassProps<Type> &
  CameraProps<Type> &
  InstanceProps<Type>

/**
 * ### `Slots<Type>`
 *
 * This type is used as the Slot type for the components `<T>` and `<Three>`.
 */
export type Slots<Type extends any> = {
  default: {
    ref: MaybeInstance<Type>
  }
}

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
 */
export type Events<Type extends any> = Record<string, unknown> & CreateEvent<Type>
