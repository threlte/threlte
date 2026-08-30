<script lang="ts">
  import { untrack, type Snippet } from 'svelte'
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
