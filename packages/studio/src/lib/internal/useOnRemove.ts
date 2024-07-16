import { onDestroy } from 'svelte'
import * as THREE from 'three'

// eslint-disable-next-line @typescript-eslint/unbound-method
export const remove = THREE.Object3D.prototype.remove

// eslint-disable-next-line @typescript-eslint/unbound-method
export const clear = THREE.Object3D.prototype.clear

type Callback = (object: THREE.Object3D) => void

export const removeFns = new Set<Callback>()

THREE.Object3D.prototype.remove = function (...objects: THREE.Object3D[]) {
  remove.call(this, ...objects)

  for (const fn of removeFns) {
    for (const object of objects) {
      fn(object)
    }
  }

  return this
}

THREE.Object3D.prototype.clear = function () {
  clear.call(this)

  for (const fn of removeFns) {
    for (const child of this.children) {
      fn(child)
    }
  }

  return this
}

export const useOnRemove = (callback: Callback) => {
  removeFns.add(callback)

  onDestroy(() => removeFns.delete(callback))
}
