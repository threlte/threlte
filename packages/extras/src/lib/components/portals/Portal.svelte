<script lang="ts">
  import { T } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Object3D } from 'three'
  import { usePortalContext } from './usePortalContext.svelte'
  import { SvelteSet } from 'svelte/reactivity'

  interface Props {
    id?: string
    object?: Object3D | undefined
    children?: Snippet
  }

  let { id = 'default', object, children }: Props = $props()

  const { getPortal } = usePortalContext()
  const portal = getPortal(id)

  let target = $derived(object ?? portal.current)

  const portalChildren = new SvelteSet<Object3D>()

  const proxy = new Object3D()

  proxy.add = (child: Object3D) => {
    portalChildren.add(child)
    return child
  }

  proxy.remove = (child: Object3D) => {
    portalChildren.delete(child)
    return child
  }

  proxy.clear = () => {
    portalChildren.clear()
    return proxy
  }

  $effect.pre(() => {
    let targetRef = target
    if (targetRef === undefined) return

    for (const child of portalChildren) {
      if (targetRef.children.includes(child)) continue
      targetRef.add(child)
    }

    return () => {
      for (const child of portalChildren) {
        if (targetRef.children.includes(child)) {
          targetRef.remove(child)
        }
      }
    }
  })
</script>

{#if target}
  <T
    is={proxy}
    attach={false}
  >
    {@render children?.()}
  </T>
{/if}
