<script lang="ts" context="module">
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import type { HierarchicalObjectProperties } from '../types/components'
  import type { ThrelteParentContext } from '../types/types'

  export const setParent = (obj: Object3D) => {
    setContext<ThrelteParentContext>('threlte-parent', obj)
  }

  export const getParent = () => {
    return getContext<ThrelteParentContext>('threlte-parent')
  }
</script>

<script lang="ts">
  export let object: HierarchicalObjectProperties['object']

  const { invalidate } = useThrelte()

  const parent = getParent()
  if (parent) parent.add(object)
  setParent(object)
  invalidate('HierarchicalObject: added to parent')

  onDestroy(() => {
    if (!parent) return
    parent.remove(object)
    invalidate('HierarchicalObject: removed from parent')
  })
</script>

<slot />
