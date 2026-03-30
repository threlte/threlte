import { getContext, onDestroy, setContext, tick } from 'svelte'

export type DisposableObject = {
  dispose: () => void
}

export type DisposalContext = {
  /**
   * Dispose objects, happens automatically as part of a task.
   * @param force - Force disposal
   */
  dispose: (force?: boolean) => void
  /** Register an object that should be disposed at the end of its lifecycle,
   * effectivly incrementing the mount count. */
  disposableObjectMounted: (object: DisposableObject) => void
  /** Mark an object as unmounted, effectivly decrementing the mount count. If
   * the mount count is 0, the object will be disposed. */
  disposableObjectUnmounted: (object: DisposableObject) => void
  /** Remove an object from the disposal context */
  removeObjectFromDisposal: (object: DisposableObject) => void
  /** Objects that *can* be disposed */
  disposableObjects: Map<DisposableObject, number>
  shouldDispose: boolean
}

export const createDisposalContext = (): DisposalContext => {
  const context: DisposalContext = {
    removeObjectFromDisposal: (object) => {
      context.disposableObjects.delete(object)
    },
    disposableObjectMounted: (object) => {
      const currentValue = context.disposableObjects.get(object)
      if (currentValue) {
        context.disposableObjects.set(object, currentValue + 1)
      } else {
        context.disposableObjects.set(object, 1)
      }
    },
    disposableObjectUnmounted: (object) => {
      const currentValue = context.disposableObjects.get(object)
      if (currentValue && currentValue > 0) {
        context.disposableObjects.set(object, currentValue - 1)
        if (currentValue - 1 <= 0) {
          context.shouldDispose = true
        }
      }
    },
    disposableObjects: new Map(),
    shouldDispose: false,
    dispose: async (force = false) => {
      await tick()
      if (!context.shouldDispose && !force) return
      context.disposableObjects.forEach((mounted, object) => {
        if (mounted === 0 || force) {
          object?.dispose?.()
          context.disposableObjects.delete(object)
        }
      })
      context.shouldDispose = false
    }
  }

  onDestroy(() => {
    context.dispose(true)
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
