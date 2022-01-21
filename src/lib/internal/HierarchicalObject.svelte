<script lang="ts" context="module">
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { Object3D } from 'three'
  import { usePrevious, UsePreviousResult } from '../hooks/usePrevious'
  import { useThrelte } from '../hooks/useThrelte'
  import type { HierarchicalObjectProperties } from '../types/components'
  import type { ThrelteParentContext } from '../types/types'

  export const setParent = (objectStore: UsePreviousResult<Object3D>) => {
    setContext<ThrelteParentContext>('threlte-parent', objectStore)
  }

  export const getParent = () => {
    return getContext<ThrelteParentContext>('threlte-parent')
  }
</script>

<script lang="ts">
  export let object: HierarchicalObjectProperties['object']

  const { current: currentParent, previous: previousParent } = getParent()

  const { invalidate } = useThrelte()

  const objectStore = usePrevious(object, (a, b) => {
    return a.uuid === b.uuid
  })
  const { current: currentObject, previous: previousObject } = objectStore
  $: currentObject.set(object)
  setParent(objectStore)

  const onObjectChange = () => {
    if ($previousObject) {
      $currentParent.remove($previousObject)
    }
    $currentParent.add($currentObject)
    invalidate(`HierarchicalObject: object changed`)
  }

  const onParentChange = () => {
    if ($previousParent) {
      $previousParent.remove($currentObject)
    }
    $currentParent.add($currentObject)
    invalidate(`HierarchicalObject: parent changed`)
  }

  $: $currentObject && $previousObject && onObjectChange()
  $: $currentParent && $previousParent && onParentChange()

  $currentParent.add($currentObject)
  invalidate('HierarchicalObject: object added')

  onDestroy(() => {
    $currentParent.remove($currentObject)
    invalidate('HierarchicalObject: object removed')
  })
</script>

<slot />
