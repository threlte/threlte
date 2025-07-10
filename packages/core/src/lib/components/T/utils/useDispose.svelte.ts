import { getContext, onMount, setContext } from 'svelte'
import { useDisposal, type DisposableObject } from '../../../context/fragments/disposal'

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

  let previousDisposable: DisposableObject | undefined

  const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } =
    useDisposal()

  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  // We merge the local dispose with the parent dispose. If the parent dispose
  // is not set, we use true as default.
  const mergedDispose = $derived(parentDispose?.() ?? true)

  $effect(() => {
    if (disposable === previousDisposable) {
      // dispose changed
      if (!mergedDispose) {
        // disposal is no longer enabled, so we need to deregister the previous ref
        if (previousDisposable) removeObjectFromDisposal(previousDisposable)
      } else {
        // disposal is enabled, so we need to register the previous ref
        if (previousDisposable) disposableObjectMounted(previousDisposable)
      }
    } else {
      // ref changed
      if (mergedDispose) {
        // we're disposing the old ref
        if (previousDisposable) disposableObjectUnmounted(previousDisposable)
        // and registering the new ref
        if (disposable) disposableObjectMounted(disposable)
      }
    }

    previousDisposable = disposable
  })

  onMount(() => {
    if (!mergedDispose) return

    return () => {
      disposableObjectUnmounted(disposable)
    }
  })
}
