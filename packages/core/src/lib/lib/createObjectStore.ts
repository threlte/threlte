import { onDestroy } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import type { Object3D } from 'three'

/**
 * A store that only ever updates if the objects are actually different.
 * ### Example
 *
 * ```ts
 * const store = createObjectStore(object)
 * store.set(sameObject) // will not update
 * store.set(otherObject) // will update
 * ```
 * @param object
 * @returns store
 */
export function createObjectStore<T extends Object3D | undefined>(object: T): Writable<T>
export function createObjectStore<T extends Object3D>(object: T): Writable<T>
export function createObjectStore<T extends Object3D | undefined>(object: T): Writable<T> {
  const objectStore = writable(object)
  let unwrappedObject = object
  const unsubscribeObjectStore = objectStore.subscribe((o) => (unwrappedObject = o))
  onDestroy(unsubscribeObjectStore)

  const set = (newObject: T) => {
    if (!newObject || !unwrappedObject) return objectStore.set(newObject)
    if (newObject.uuid === unwrappedObject.uuid) return
    objectStore.set(newObject)
  }

  return {
    ...objectStore,
    set
  }
}
