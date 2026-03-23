import { getContext, setContext } from 'svelte'

export type DisposableObject = {
  dispose: () => void
}

export interface DisposalContext {
  /**
   * Register an object that should be disposed at the end of its lifecycle,
   * effectivly incrementing the mount count.
   */
  disposableObjectMounted: (object: DisposableObject) => void

  /**
   * Mark an object as unmounted, effectivly decrementing the mount count. If
   * the mount count is 0, the object will be disposed.
   */
  disposableObjectUnmounted: (object: DisposableObject) => void

  /** Remove an object from the disposal context */
  removeObjectFromDisposal: (object: DisposableObject) => void

  /** Objects that *can* be disposed */
  disposableObjects: Map<DisposableObject, number>
}

export const createDisposalContext = (): DisposalContext => {
  const disposableObjects = new Map<DisposableObject, number>()

  const context: DisposalContext = {
    disposableObjects,
    removeObjectFromDisposal: (object) => {
      disposableObjects.delete(object)
    },
    disposableObjectMounted: (object) => {
      const currentValue = disposableObjects.get(object)
      disposableObjects.set(object, currentValue ? currentValue + 1 : 1)
    },
    disposableObjectUnmounted: (object) => {
      const currentValue = disposableObjects.get(object) ?? 0

      if (currentValue - 1 <= 0) {
        object?.dispose?.()
        disposableObjects.delete(object)
      } else {
        disposableObjects.set(object, currentValue - 1)
      }
    }
  }

  setContext<DisposalContext>('threlte-disposal-context', context)

  return context
}

export const useDisposal = (): DisposalContext => {
  const context = getContext<DisposalContext>('threlte-disposal-context')

  if (!context) {
    throw new Error('useDisposal can only be used in a child component to <Canvas>.')
  }

  return context
}
