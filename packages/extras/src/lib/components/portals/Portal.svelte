<script lang="ts">
  import { untrack, type Snippet } from 'svelte'
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
