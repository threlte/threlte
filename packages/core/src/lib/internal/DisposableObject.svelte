<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import { useDisposal } from '../context/fragments/disposal'
  import type { DisposableObjectProperties } from './DisposableObject.svelte'

  type ThrelteDisposeContext = Writable<boolean>

  let { object, dispose, children }: DisposableObjectProperties = $props()

  const { collectDisposableObjects, addDisposableObjects, removeDisposableObjects } = useDisposal()

  let previousObject = object

  const contextName = 'threlte-disposable-object-context'
  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  const mergedDispose = writable(dispose ?? $parentDispose ?? true)
  $effect.pre(() => mergedDispose.set(dispose ?? $parentDispose ?? true))

  setContext<ThrelteDisposeContext>(contextName, mergedDispose)

  let disposables = $mergedDispose ? collectDisposableObjects(object) : []
  addDisposableObjects(disposables)

  $effect.pre(() => {
    if (object !== previousObject) {
      removeDisposableObjects(disposables)
      disposables = $mergedDispose ? collectDisposableObjects(object) : []
      addDisposableObjects(disposables)
      previousObject = object
    }
  })

  onDestroy(() => {
    removeDisposableObjects(disposables)
  })
</script>

{#if children}
  {@render children()}
{/if}
