<!--
  @component

  This component is the backbone of the scene graph hierarchy system.
  Child objects that also house this component register themselves onto
  this component and let the parent decide on what to do with it.

-->
<script lang="ts" context="module">
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { Object3D } from 'three'
  import { useParent, setParent } from '../hooks/useParent'
  import { createObjectStore } from '../lib/createObjectStore'
  import type { HierarchicalObjectProperties } from './HierarchicalObject.svelte'
  import { useThrelte } from '../context/compounds/useThrelte'

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
  let {
    object,
    onChildMount,
    onChildDestroy,
    parent = $bindable(),
    children
  }: HierarchicalObjectProperties & { parent: Object3D | undefined } = $props()

  const onChildMountProxy: HierarchicalObjectProperties['onChildMount'] = (child) => {
    // maybe call provided method
    onChildMount?.(child)
  }

  const onChildDestroyProxy: HierarchicalObjectProperties['onChildDestroy'] = (child) => {
    // maybe call provided method
    onChildDestroy?.(child)
  }

  const { invalidate } = useThrelte()
  const parentStore = useParent()

  parent = $parentStore
  $effect.pre(() => {
    parent = $parentStore
  })

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
  $effect.pre(() => objectStore.set(object))

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

  setParent(objectStore)
</script>

{@render children()}
