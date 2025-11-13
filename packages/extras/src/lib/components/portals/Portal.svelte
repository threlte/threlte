<script lang="ts">
  import type { Snippet } from 'svelte'
  import { usePortalContext } from './usePortalContext.svelte.js'
  import { SvelteSet } from 'svelte/reactivity'

  interface Props {
    id?: string
    object?: never
    children?: Snippet
  }

  let { id = 'default', object, children }: Props = $props()

  $effect.pre(() => {
    if (object) {
      console.error('<Portal>: "object" prop has been removed. Use "attach" instead.')
    }
  })

  const portals = usePortalContext()

  $effect.pre(() => {
    if (!children) return

    if (!portals.has(id)) {
      portals.set(id, new SvelteSet())
    }

    portals.get(id)?.add(children)
    return () => portals.get(id)?.delete(children)
  })
</script>
