import { onDestroy } from 'svelte'
import { writable, type Updater, type Writable } from 'svelte/store'

/**
 * A store that only ever updates if the objects are actually different.
 * Accepts any object that has a property "uuid" (i.e. most Three.js objects).
 *
 * ### Example
 *
 * ```ts
 * const store = createObjectStore(object)
 * store.set(sameObject) // will not update
 * store.set(otherObject) // will update
 * ```
 *
 * @param object
 * @returns store
 */
export function createObjectStore<T extends { uuid: string } | undefined>(
  object: T,
  onChange?: (newObject: T, oldObject: T) => void
): Writable<T>
export function createObjectStore<T extends { uuid: string }>(
  object: T,
  onChange?: (newObject: T, oldObject: T) => void
): Writable<T>
export function createObjectStore<T extends { uuid: string } | undefined>(
  object: T,
  onChange?: (newObject: T, oldObject: T) => void
): Writable<T> {
  const objectStore = writable(object)
  let unwrappedObject = object
  const unsubscribeObjectStore = objectStore.subscribe((o) => (unwrappedObject = o))
  onDestroy(unsubscribeObjectStore)

  const set = (newObject: T) => {
    if (newObject?.uuid === unwrappedObject?.uuid) return
    const oldObject = unwrappedObject
    objectStore.set(newObject)
    onChange?.(newObject, oldObject)
  }

  const update = (callback: Updater<T>) => {
    const newObject = callback(unwrappedObject)
    if (newObject?.uuid === unwrappedObject?.uuid) return
    const oldObject = unwrappedObject
    objectStore.set(newObject)
    onChange?.(newObject, oldObject)
  }

  return {
    ...objectStore,
    set,
    update
  }
}
