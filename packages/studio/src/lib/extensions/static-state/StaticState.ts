import { onDestroy } from 'svelte'
import { staticStateMetaKey } from '../../config'
import { addStaticState, removeStaticState } from './staticStates'
import type { StaticStateMeta } from '../../types'

export const register = Symbol('register')
export const unregister = Symbol('unregister')
export const accessors = Symbol('accessors')

export abstract class StaticState {
  [staticStateMetaKey]!: StaticStateMeta;

  [accessors]: string[] = []

  constructor() {
    // iterate over all properties and add them to the static state

    // get the descriptors of the prototype
    const descriptors = Object.getOwnPropertyDescriptors(this.constructor.prototype)
    const getters: string[] = []
    const setters: string[] = []

    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (descriptor.get) {
        getters.push(key)
      }
      if (descriptor.set) {
        setters.push(key)
      }
    }

    // find pairs of getters and setters
    this[accessors] = getters.filter((getter) => setters.includes(getter))

    this[register]()

    try {
      onDestroy(() => {
        this[unregister]()
      })
    } catch {
      // ignore
    }
  }

  [register]() {
    addStaticState(this)
  }

  [unregister]() {
    removeStaticState(this)
  }
}
