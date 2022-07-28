<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { useThrelteDisposal } from '../hooks/useThrelteDisposal'
  import type { DisposableObjectProperties } from '../types/components'
  import type { ThrelteDisposeContext } from '../types/types'

  const { addDisposableObject } = useThrelteDisposal()

  export let object: DisposableObjectProperties['object'] = undefined
  let previousObject = object
  export let dispose: DisposableObjectProperties['dispose'] = undefined

  const contextName = 'threlte-disposable-object-context'
  const parentDispose = getContext<ThrelteDisposeContext | undefined>(contextName)

  let mergedDispose = writable(dispose ?? $parentDispose ?? true)
  $: mergedDispose.set(dispose ?? $parentDispose ?? true)

  setContext<ThrelteDisposeContext>(contextName, mergedDispose)

  $: {
    if (object !== previousObject && $mergedDispose) addDisposableObject(object)
    previousObject = object
  }

  onDestroy(() => {
    if ($mergedDispose) addDisposableObject(object)
  })
</script>

<slot />
