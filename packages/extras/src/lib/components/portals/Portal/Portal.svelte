<script lang="ts">
  import { HierarchicalObject, watch } from '@threlte/core'
  import type { Object3D } from 'three'
  import { usePortalContext } from '../usePortalContext'
  import { writable } from 'svelte/store'

  export let id = 'default'
  export let object: Object3D | undefined = undefined

  const { getPortal } = usePortalContext()

  const children = writable<Object3D[]>([])
  const target = writable<Object3D | undefined>()

  $: portal = getPortal(id)
  $: target.set(object ?? $portal)

  watch([children, target], ([children, target]) => {
    if (target === undefined) return

    for (const child of children) {
      if (target.children.includes(child)) continue
      target.add(child)
    }

    return () => {
      for (const child of children) {
        if (target.children.includes(child)) {
          target.remove(child)
        }
      }
    }
  })
</script>

{#if $target}
  <HierarchicalObject
    onChildMount={(child) =>
      children.update((array) => {
        array.push(child)
        return array
      })}
    onChildDestroy={(child) =>
      children.update((array) => {
        array.splice(array.indexOf(child), 1)
        return array
      })}
  >
    <slot />
  </HierarchicalObject>
{/if}
