import * as THREE from 'three'
import { intersectObjects } from '../internal/raycast'
import { onDestroy } from 'svelte'

// eslint-disable-next-line @typescript-eslint/unbound-method
export const add = THREE.Object3D.prototype.add

type Callback = (object: THREE.Object3D) => void

export const addFns = new Set<Callback>()

THREE.Object3D.prototype.add = function (...objects: THREE.Object3D[]) {
  add.call(this, ...objects)

  for (const object of objects) {
    intersectObjects.push(object)
  }

  for (const fn of addFns) {
    for (const object of objects) {
      fn(object)
    }
  }

  return this
}

export const useOnAdd = (callback: Callback) => {
  addFns.add(callback)
  onDestroy(() => addFns.delete(callback))
}
