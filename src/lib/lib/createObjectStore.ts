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
export const createObjectStore = <T extends Object3D>(object: T): Writable<T> => {
  const objectStore = writable(object)

  const set = (newObject: T) => {
    if (newObject.uuid === get(objectStore).uuid) return
    objectStore.set(newObject)
  }

  return {
    ...objectStore,
    set
  }
}
