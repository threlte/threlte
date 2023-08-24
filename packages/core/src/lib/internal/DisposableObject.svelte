<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import { useThrelteInternal } from '../hooks/useThrelteInternal'
  import type { DisposableObjectProperties } from './DisposableObject.svelte'

  type ThrelteDisposeContext = Writable<boolean>

  const { collectDisposableObjects, addDisposableObjects, removeDisposableObjects } =
    useThrelteInternal()

  export let object: DisposableObjectProperties['object'] = undefined
  let previousObject = object
  export let dispose: DisposableObjectProperties['dispose'] = undefined

  const contextName = 'threlte-disposable-object-context'
  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  const mergedDispose = writable(dispose ?? $parentDispose ?? true)
  $: mergedDispose.set(dispose ?? $parentDispose ?? true)

  setContext<ThrelteDisposeContext>(contextName, mergedDispose)

  let disposables = $mergedDispose ? collectDisposableObjects(object) : []
  addDisposableObjects(disposables)

  $: {
    if (object !== previousObject) {
      removeDisposableObjects(disposables)
      disposables = $mergedDispose ? collectDisposableObjects(object) : []
      addDisposableObjects(disposables)
      previousObject = object
    }
  }

  onDestroy(() => {
    removeDisposableObjects(disposables)
  })
</script>

<slot />
