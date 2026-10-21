import type * as THREE from 'three'

/**
 * Omit the keys that have a value of `never`.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number
 *   y: never
 * }
 * type Bar = OmitNever<Foo> // { x: number }
 * ```
 */
type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] }

/**
 * A type that contains all the classes in THREE that have a static `isFoo` property.
 */
type ThreeClassTypes = OmitNever<{
  [K in keyof typeof THREE]: (typeof THREE)[K] extends abstract new (...args: any[]) => any
    ? InstanceType<(typeof THREE)[K]> extends { [P in `is${K}`]: boolean }
      ? (typeof THREE)[K]
      : never
    : (typeof THREE)[K] extends { new (...args: any[]): any }
      ? InstanceType<(typeof THREE)[K]> extends { [P in `is${K}`]: boolean }
        ? (typeof THREE)[K]
        : never
      : never
}>

type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * `InstanceType` resolves a generic class' type parameters to their constraint
 * — or to `unknown` when they have none — never to their defaults, which
 * TypeScript cannot read. `InstanceType<typeof Texture>` is therefore
 * `Texture<unknown>`, and narrowing to it discards the image type an object
 * already had.
 *
 * So prefer the constituents of `Obj` that are already instances of the class,
 * and fall back to the widened instance type only when `Obj` has none.
 */
type NarrowToInstance<Obj, Instance> =
  IsAny<Obj> extends true
    ? Instance
    : [Extract<Obj, Instance>] extends [never]
      ? Obj & Instance
      : Extract<Obj, Instance>

/**
 * Check if an object is an instance of a given THREE class. Can be used as a
 * type guard and as an alternative to `instanceof` which is prone to error and
 * slower. It uses the `isFoo` property that THREE classes have to determine if
 * an object is of a particular class.
 *
 * @example
 * ```ts
 * const obj = new THREE.Object3D()
 * isInstanceOf(obj, 'Object3D') // true
 * ```
 *
 * @param obj - The object to check.
 * @param type - The class name to check against.
 * @returns `true` if the object is an instance of the class, `false` otherwise.
 */
export const isInstanceOf = <T extends keyof ThreeClassTypes, Obj = unknown>(
  obj: Obj,
  type: T
): obj is Extract<NarrowToInstance<Obj, InstanceType<ThreeClassTypes[T]>>, Obj> => {
  return (obj as Record<string, unknown> | null | undefined)?.[`is${type}`] === true
}
