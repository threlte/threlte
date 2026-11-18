<script lang="ts">
  import { untrack } from 'svelte'
  import { usePortalContext } from './usePortalContext.svelte.js'
  import { SvelteSet } from 'svelte/reactivity'
  import type { PortalProps } from './types.js'

  let { id = 'default', children }: PortalProps = $props()

  const portals = usePortalContext()

  $effect.pre(() => {
    if (!children) return

    const currentId = id

    return untrack(() => {
      let contents = portals.get(currentId)

      if (contents === undefined) {
        contents = new SvelteSet()
        portals.set(currentId, contents)
      }

      contents.add(children)
      return () => contents.delete(children)
    })
  })
</script>
