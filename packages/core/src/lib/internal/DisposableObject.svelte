<script lang="ts" context="module">
  /**
   * Recursively disposes an object including all properties that hold a function "dispose".
   * Does not dispose children.
   * This function needs to be bulletproof.
   *
   * TODO: Implement a list of returnable keys for performance reasons
   *
   * @param obj
   */
  const disposeObject = <Obj extends DisposableObjectProperties['object']>(obj?: Obj) => {
    if (!obj) return
    // Scenes can't be disposed
    if (obj?.dispose && typeof obj.dispose === 'function' && obj.type !== 'Scene') {
      obj.dispose()
    }
    // iterate over properties of obj
    Object.entries(obj).forEach(([propKey, propValue]) => {
      // we don't want to dispose the parent
      if (propKey === 'parent' || propKey === 'children') return
      // children don't need to be disposed as they manage their own disposal
      const value = propValue as any
      if (value?.dispose) {
        disposeObject(value)
      }
    })
  }
</script>

<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { DisposableObjectProperties } from '../types/components'
  import type { ThrelteDisposeContext } from '../types/types'

  export let object: DisposableObjectProperties['object'] = undefined
  let previousObject = object
  export let dispose: DisposableObjectProperties['dispose'] = undefined

  const parentDispose = getContext<ThrelteDisposeContext | undefined>('threlte-dispose-context')

  let mergedDispose = writable(dispose ?? $parentDispose ?? true)
  $: mergedDispose.set(dispose ?? $parentDispose ?? true)

  setContext<ThrelteDisposeContext>('threlte-dispose-context', mergedDispose)

  $: {
    if (object !== previousObject) disposeObject(object)
    previousObject = object
  }

  onDestroy(() => {
    disposeObject(object)
  })
</script>

<slot />
