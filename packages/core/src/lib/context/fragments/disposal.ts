import { getContext, onDestroy, setContext, tick } from 'svelte'

export type DisposableThreeObject = {
  dispose?: () => void
  type?: string
} & Record<string, unknown>

export type DisposalContext = {
  dispose: (force?: boolean) => void
  collectDisposableObjects: (
    object?: DisposableThreeObject,
    arr?: DisposableThreeObject[]
  ) => DisposableThreeObject[]
  addDisposableObjects: (objects: DisposableThreeObject[]) => void
  removeDisposableObjects: (objects: DisposableThreeObject[]) => void
  disposableObjects: Map<DisposableThreeObject, number>
  shouldDispose: boolean
}

export const createDisposalContext = (): DisposalContext => {
  const context: DisposalContext = {
    collectDisposableObjects: (object, objects) => {
      const disposables: DisposableThreeObject[] = objects ?? []
      if (!object) return disposables
      // Scenes can't be disposed
      if (object?.dispose && typeof object.dispose === 'function' && object.type !== 'Scene') {
        disposables.push(object)
      }
      // iterate over properties of object
      Object.entries(object).forEach(([propKey, propValue]) => {
        // we don't want to dispose the parent, we can skip "children"
        if (propKey === 'parent' || propKey === 'children' || typeof propValue !== 'object') return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = propValue as any
        if (value?.dispose) {
          context.collectDisposableObjects(value, disposables)
        }
      })
      return disposables
    },
    addDisposableObjects: (objects) => {
      objects.forEach((obj) => {
        const currentValue = context.disposableObjects.get(obj)
        if (currentValue) {
          context.disposableObjects.set(obj, currentValue + 1)
        } else {
          context.disposableObjects.set(obj, 1)
        }
      })
    },
    removeDisposableObjects: (objects) => {
      if (objects.length === 0) return
      objects.forEach((obj) => {
        const currentValue = context.disposableObjects.get(obj)
        if (currentValue && currentValue > 0) {
          context.disposableObjects.set(obj, currentValue - 1)
        }
      })
      context.shouldDispose = true
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
