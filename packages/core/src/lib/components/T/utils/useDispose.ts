import { getContext, onDestroy, setContext } from 'svelte'
import { derived, get, writable, type Readable } from 'svelte/store'
import { useDisposal, type DisposableObject } from '../../../context/fragments/disposal'
import { isInstanceOf, watch } from '../../../utilities'

const contextName = Symbol('threlte-disposable-object-context')
type ThrelteDisposeContext = Readable<boolean>

/**
 * Checks if the given object is a disposable object. Scenes are not disposable.
 * @param object - The object to check.
 * @returns True if the object is a disposable object, false otherwise.
 */
const isDisposableObject = (object: unknown): object is DisposableObject => {
  return typeof (object as any)?.dispose === 'function' && !isInstanceOf(object, 'Scene')
}

export const useDispose = (dispose: boolean | undefined) => {
  let previousRef: DisposableObject | undefined = undefined
  const currentRef = writable<DisposableObject | undefined>(undefined)
  const localDispose = writable<boolean | undefined>(dispose)

  const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } =
    useDisposal()

  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  // We merge the local dispose with the parent dispose. If the parent dispose
  // is not set, we use true as default.
  const mergedDispose = derived(
    [localDispose, parentDispose ?? writable(true)],
    ([localDispose, parentDispose]) => localDispose ?? parentDispose ?? true
  )

  setContext<ThrelteDisposeContext>(contextName, mergedDispose)

  watch([currentRef, mergedDispose], ([ref, mergedDispose]) => {
    if (ref === previousRef) {
      // dispose changed
      if (!mergedDispose) {
        // disposal is no longer enabled, so we need to deregister the previous ref
        if (previousRef) removeObjectFromDisposal(previousRef)
      } else {
        // disposal is enabled, so we need to register the previous ref
        if (previousRef) disposableObjectMounted(previousRef)
      }
    } else {
      // ref changed
      if (mergedDispose) {
        // we're disposing the old ref
        if (previousRef) disposableObjectUnmounted(previousRef)
        // and registering the new ref
        if (ref) disposableObjectMounted(ref)
      }
    }

    previousRef = ref
  })

  onDestroy(() => {
    if (!get(mergedDispose)) return
    const ref = get(currentRef)
    if (ref) disposableObjectUnmounted(ref)
  })

  const updateRef = (ref: unknown) => {
    if (!isDisposableObject(ref)) return
    currentRef.set(ref)
  }

  const updateDispose = (dispose: boolean | undefined) => {
    localDispose.set(dispose)
  }

  return {
    updateRef,
    updateDispose
  }
}
