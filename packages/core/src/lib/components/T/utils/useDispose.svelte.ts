import { getContext, setContext } from 'svelte'
import { useDisposal, type DisposableObject } from '../../../context/fragments/disposal.svelte.js'
import type { MaybeInstance } from '../types.js'

const contextName = Symbol('threlte-disposable-object-context')

type ThrelteDisposeContext = () => boolean

/**
 * Checks if the given object is a disposable object. Scenes are not disposable.
 * @param object - The object to check.
 * @returns True if the object is a disposable object, false otherwise.
 */
export const isDisposableObject = (object: unknown): object is DisposableObject => {
  return typeof (object as any)?.dispose === 'function'
}

export const useDispose = <T>(
  object: () => MaybeInstance<T>,
  dispose: () => boolean | undefined
) => {
  const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } =
    useDisposal()

  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  // We merge the local dispose with the parent dispose. If the parent dispose
  // is not set, we use true as default.
  const mergedDispose = $derived.by(() => {
    if (dispose() === false) return false
    if (parentDispose?.() === false) return false
    return true
  })

  setContext<ThrelteDisposeContext>(contextName, () => mergedDispose)

  const mountedObjects = new Set<DisposableObject>()

  // Track objects as `is` changes — mount new ones, but never unmount here.
  // Disposal only happens when the component itself unmounts.
  $effect(() => {
    const disposable = object()

    if (!isDisposableObject(disposable)) return

    if (mergedDispose) {
      disposableObjectMounted(disposable)
      mountedObjects.add(disposable)
    } else {
      removeObjectFromDisposal(disposable)
      mountedObjects.delete(disposable)
    }
  })

  // Unmount all tracked objects on component destroy
  $effect(() => {
    return () => {
      for (const obj of mountedObjects) {
        disposableObjectUnmounted(obj)
      }
      mountedObjects.clear()
    }
  })
}
