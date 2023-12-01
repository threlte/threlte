<!--
  @component

  This component is the backbone of the scene graph hierarchy system.
  Child objects that also house this component register themselves onto
  this component and let the parent decide on what to do with it.

-->
<script
  lang="ts"
  context="module"
>
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { Object3D } from 'three'
  import { type ThrelteParentContext, useParent } from '../hooks/useParent'
  import { useThrelte } from '../hooks/useThrelte'
  import { createObjectStore } from '../lib/createObjectStore'
  import type { HierarchicalObjectProperties } from './HierarchicalObject.svelte'

  const useHierarchicalObject = () => {
    return {
      onChildMount: getContext<HierarchicalObjectProperties['onChildMount']>(
        'threlte-hierarchical-object-on-mount'
      ),
      onChildDestroy: getContext<HierarchicalObjectProperties['onChildDestroy']>(
        'threlte-hierarchical-object-on-destroy'
      )
    }
  }
</script>

<script lang="ts">
  export let object: HierarchicalObjectProperties['object'] = undefined

  export let children: Object3D[] = []

  export let onChildMount: HierarchicalObjectProperties['onChildMount'] = undefined
  const onChildMountProxy: HierarchicalObjectProperties['onChildMount'] = (child) => {
    // keep track of children
    children.push(child)
    children = children

    // maybe call provided method
    onChildMount?.(child)
  }

  export let onChildDestroy: HierarchicalObjectProperties['onChildDestroy'] = undefined
  const onChildDestroyProxy: HierarchicalObjectProperties['onChildDestroy'] = (child) => {
    // keep track of children
    const index = children.findIndex((c) => c.uuid === child.uuid)
    if (index !== -1) children.splice(index, 1)
    children = children

    // maybe call provided method
    onChildDestroy?.(child)
  }

  const { invalidate } = useThrelte()

  const parentStore = useParent()
  export let parent: Object3D | undefined = $parentStore
  $: parent = $parentStore

  /**
   * Get the parent methods …
   */
  const parentCallbacks = useHierarchicalObject()
  if (object) {
    parentCallbacks.onChildMount?.(object)
    invalidate()
  }
  const objectStore = createObjectStore(object, (newObject, oldObject) => {
    if (oldObject) {
      parentCallbacks.onChildDestroy?.(oldObject)
      invalidate()
    }
    if (newObject) {
      parentCallbacks.onChildMount?.(newObject)
      invalidate()
    }
  })
  $: objectStore.set(object)
  onDestroy(() => {
    if (object) {
      parentCallbacks.onChildDestroy?.(object)
      invalidate()
    }
  })

  /**
   * … then set the context so that child components can
   * call these methods on this component
   */
  setContext<HierarchicalObjectProperties['onChildMount']>(
    'threlte-hierarchical-object-on-mount',
    onChildMountProxy
  )
  setContext<HierarchicalObjectProperties['onChildDestroy']>(
    'threlte-hierarchical-object-on-destroy',
    onChildDestroyProxy
  )

  setContext<ThrelteParentContext>('threlte-hierarchical-parent-context', objectStore)
</script>

<slot />
