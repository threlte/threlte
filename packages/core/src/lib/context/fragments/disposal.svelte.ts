import { getContext, setContext, tick } from 'svelte'

export type DisposableObject = {
  dispose: () => void
}

export type DisposalContext = {
  /**
   * Dispose objects, happens automatically as part of a task.
   * @param force - Force disposal
   */
  dispose: (force?: boolean) => void

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
  shouldDispose: boolean
}

export const createDisposalContext = (): DisposalContext => {
  const disposableObjects = new Map()

  let shouldDispose = false

  const context: DisposalContext = {
    disposableObjects,
    get shouldDispose() {
      return shouldDispose
    },
    removeObjectFromDisposal: (object) => {
      disposableObjects.delete(object)
    },
    disposableObjectMounted: (object) => {
      const currentValue = disposableObjects.get(object)
      disposableObjects.set(object, currentValue ? currentValue + 1 : 1)
    },
    disposableObjectUnmounted: (object) => {
      const currentValue = disposableObjects.get(object)

      if (currentValue && currentValue > 0) {
        disposableObjects.set(object, currentValue - 1)
        if (currentValue - 1 <= 0) {
          shouldDispose = true
        }
      }
    },

    dispose: async (force = false) => {
      await tick()
      if (!shouldDispose && !force) return

      disposableObjects.forEach((mounted, object) => {
        if (mounted === 0 || force) {
          object?.dispose?.()
          disposableObjects.delete(object)
        }
      })
      shouldDispose = false
    }
  }

  $effect(() => {
    return () => {
      context.dispose(true)
    }
  })

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
