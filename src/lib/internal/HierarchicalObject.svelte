<script lang="ts" context="module">
  import { getContext, onDestroy, setContext } from 'svelte'
  import { writable, Writable } from 'svelte/store'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import type { HierarchicalObjectProperties } from '../types/components'
  import type { ThrelteParentContext } from '../types/types'

  export const setParent = (objectStore: Writable<Object3D>) => {
    setContext<ThrelteParentContext>('threlte-parent', objectStore)
  }

  export const getParent = () => {
    return getContext<ThrelteParentContext>('threlte-parent')
  }
</script>

<script lang="ts">
  // IMPORTANT: get the parent as soon as possible.
  // svelte contexts are also available inside components that
  // declare the context.
  const currentParent = getParent()
  let previousParent: Object3D

  // object property …
  export let object: HierarchicalObjectProperties['object']

  // … but we only work with this store to stay consistent
  const currentObject = writable(object)
  $: $currentObject = object

  let previousObject: Object3D

  setParent(currentObject)

  const { invalidate } = useThrelte()

  $: {
    // on object change
    if (previousObject && $currentObject !== previousObject) {
      if (previousObject) {
        $currentParent.remove(previousObject)
      }
      $currentParent.add($currentObject)
      invalidate(`HierarchicalObject: object changed`)
    }
    previousObject = $currentObject
  }

  $: {
    // on parent change
    if (previousParent && $currentParent !== previousParent) {
      previousParent.remove($currentObject)
      $currentParent.add($currentObject)
      invalidate(`HierarchicalObject: parent changed`)
    }
    previousParent = $currentParent
  }

  $currentParent.add($currentObject)
  invalidate('HierarchicalObject: object added')

  onDestroy(() => {
    $currentParent.remove($currentObject)
    invalidate('HierarchicalObject: object removed')
  })
</script>

<slot />
