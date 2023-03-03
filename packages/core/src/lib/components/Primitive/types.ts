import type {
  AnyProps,
  BaseProps,
  CameraProps,
  DisposableProps,
  InstanceProps
} from '../types/sharedTypes'

export type ObjectProps<Type extends any> = {
  object?: Type
}

/**
 * ### `PrimitiveProps<Type>`
 *
 * This type is used as the Props type for the component `<Primitive>`.
 */
export type PrimitiveProps<Type extends any> = AnyProps &
  DisposableProps &
  ObjectProps<Type> &
  BaseProps<Type> &
  CameraProps<Type> &
  InstanceProps<Type>

/**
 * ### `PrimitiveEvents<Type>`
 *
 * This type is used as the Events type for the component `<Primitive>`.
 */
export type PrimitiveEvents<Type extends any> = Record<string, unknown>

/**
 * ### `PrimitiveSlots<Type>`
 *
 * This type is used as the Slots type for the component `<Primitive>`.
 */
export type PrimitiveSlots<Type extends any> = {
  default: {
    ref: Type
  }
}
