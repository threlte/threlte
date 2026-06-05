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

  // @Todo Remove in Threlte 9
  $effect.pre(() => {
    if (object) {
      console.error('<Portal>: "object" prop has been removed. Use "attach" instead.')
    }
  })

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
