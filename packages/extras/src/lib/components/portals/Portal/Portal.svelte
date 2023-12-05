<script lang="ts">
  import { HierarchicalObject } from '@threlte/core'
  import type { Object3D } from 'three'
  import { usePortalContext } from '../usePortalContext'

  export let id = 'default'
  export let object: Object3D | undefined = undefined

  const { getPortal } = usePortalContext()

  const portal = getPortal(id)

  $: portalTarget = object ?? $portal
</script>

{#if portalTarget}
  <HierarchicalObject
    onChildMount={(child) => {
      portalTarget?.add(child)
    }}
    onChildDestroy={(child) => {
      portalTarget?.remove(child)
    }}
  >
    <slot />
  </HierarchicalObject>
{/if}
