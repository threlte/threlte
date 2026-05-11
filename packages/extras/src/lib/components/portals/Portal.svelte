<script lang="ts">
  import type { Snippet } from 'svelte'
  import { usePortalContext } from './usePortalContext.svelte.js'
  import { SvelteSet } from 'svelte/reactivity'

  interface Props {
    id?: string
    children?: Snippet
  }

  let { id = 'default', children }: Props = $props()

  const portals = usePortalContext()

  $effect.pre(() => {
    if (!children) return

    const currentId = id

    if (!portals.has(currentId)) {
      portals.set(currentId, new SvelteSet())
    }

    portals.get(currentId)?.add(children)
    return () => {
      portals.get(currentId)?.delete(children)
    }
  })
</script>
