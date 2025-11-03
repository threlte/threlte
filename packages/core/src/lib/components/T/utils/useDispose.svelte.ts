import { getContext, setContext } from 'svelte'
import { useDisposal, type DisposableObject } from '../../../context/fragments/disposal.js'

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

export const useSetDispose = (getDispose: () => boolean | undefined) => {
  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  // We merge the local dispose with the parent dispose. If the parent dispose
  // is not set, we use true as default.
  const mergedDispose = $derived(getDispose() ?? parentDispose?.() ?? true)

  setContext<ThrelteDisposeContext>(contextName, () => mergedDispose)
}

export const useDispose = (getDisposable: () => DisposableObject) => {
  const disposable = $derived(getDisposable())

  const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } =
    useDisposal()

  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  // We merge the local dispose with the parent dispose. If the parent dispose
  // is not set, we use true as default.
  const dispose = $derived(parentDispose?.() ?? true)

  $effect(() => {
    if (dispose) {
      disposableObjectMounted(disposable)
      return () => disposableObjectUnmounted(disposable)
    }

    removeObjectFromDisposal(disposable)
    return
  })
}
