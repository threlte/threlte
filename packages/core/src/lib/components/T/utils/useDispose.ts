import { getContext, onDestroy, setContext } from 'svelte'
import { derived, get, writable, type Readable } from 'svelte/store'
import { useDisposal, type DisposableThreeObject } from '../../../context/fragments/disposal'
import { watch } from '../../../utilities'

const contextName = Symbol('threlte-disposable-object-context')
type ThrelteDisposeContext = Readable<boolean>

/**
 * Checks if the given object is a disposable object. Scenes are not disposable.
 * @param object - The object to check.
 * @returns True if the object is a disposable object, false otherwise.
 */
const isDisposableObject = (object: unknown): object is DisposableThreeObject => {
  return (
    typeof object === 'object' &&
    object !== null &&
    'dispose' in object &&
    typeof object.dispose === 'function' &&
    !('isScene' in object)
  )
}

export const useDispose = (dispose: boolean | undefined) => {
  let previousRef: DisposableThreeObject | undefined = undefined
  const currentRef = writable<DisposableThreeObject | undefined>(undefined)
  const localDispose = writable<boolean | undefined>(dispose)

  // We keep a local collection of objects that can be disposed which are
  // related to the current ref
  let disposables: DisposableThreeObject[] = []

  const { collectDisposableObjects, addDisposableObjects, maybeDisposeObjects } = useDisposal()

  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  // We merge the local dispose with the parent dispose. If the parent dispose
  // is not set, we use true as default.
  const mergedDispose = derived(
    [localDispose, parentDispose ?? writable(true)],
    ([localDispose, parentDispose]) => localDispose ?? parentDispose ?? true
  )

  setContext<ThrelteDisposeContext>(contextName, mergedDispose)

  watch([currentRef, mergedDispose], ([ref, mergedDispose]) => {
    // If the merged dispose is not set, we don't need to dispose anything
    if (!mergedDispose) return

    // If the ref is the same as the previous ref, we don't need to dispose anything
    if (ref === previousRef) return

    // Dispose all objects related to the previous ref
    maybeDisposeObjects(disposables)
    // Collect the new disposables
    disposables = collectDisposableObjects(ref)
    // Add the new disposables to the disposal system so that
    // they won't get disposed when any other component tries to dispose them.
    addDisposableObjects(disposables)

    previousRef = ref
  })

  onDestroy(() => {
    if (!get(mergedDispose)) return
    maybeDisposeObjects(disposables)
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
