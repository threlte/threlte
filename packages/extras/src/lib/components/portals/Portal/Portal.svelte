<script lang="ts">
  import { T, watch } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { writable } from 'svelte/store'
  import { Object3D } from 'three'
  import { usePortalContext } from '../usePortalContext'

  interface Props {
    id?: string
    object?: Object3D | undefined
    children?: Snippet
  }

  let { id = 'default', object, children: childrenSnippet }: Props = $props()

  const { getPortal } = usePortalContext()

  const children = writable<Object3D[]>([])
  const target = writable<Object3D | undefined>()

  let portal = $derived(getPortal(id))
  $effect.pre(() => target.set(object ?? $portal))

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

  const proxy = new Object3D()
  proxy.add = (child: Object3D) => {
    children.update((array) => {
      array.push(child)
      return array
    })
    return child
  }
  proxy.remove = (child: Object3D) => {
    children.update((array) => {
      array.splice(array.indexOf(child), 1)
      return array
    })
    return child
  }
</script>

{#if $target}
  <T
    is={proxy}
    attach={false}
  >
    {@render childrenSnippet?.()}
  </T>
{/if}
