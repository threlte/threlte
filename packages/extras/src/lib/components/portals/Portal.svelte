<script lang="ts">
  import { T } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Object3D } from 'three'
  import { usePortalContext } from './usePortalContext.svelte'

  interface Props {
    id?: string
    object?: Object3D | undefined
    children?: Snippet
  }

  let { id = 'default', object, children }: Props = $props()

  const { getPortal } = usePortalContext()
  const portal = getPortal(id)

  let target = $derived(object ?? portal.current)
</script>

{#if target}
  <T.Object3D attach={target}>
    {@render children?.()}
  </T.Object3D>
{/if}
