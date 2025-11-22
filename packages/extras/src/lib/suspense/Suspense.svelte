<script lang="ts">
  import { T, useParentObject3D, useThrelte, watch } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Group } from 'three'
  import { createSuspenseContext } from './context.js'

  interface Props {
    final?: boolean

    children?: Snippet<[{ suspended: boolean; errors: Error[] }]>
    error?: Snippet<[{ errors: Error[] }]>
    fallback?: Snippet

    onload?: () => void
    onerror?: (error: Error[]) => void
    onsuspend?: () => void
  }

  let { final = false, onload, onsuspend, onerror, error, fallback, children }: Props = $props()

  const { suspended, errors, setFinal } = createSuspenseContext({ final })
  $effect(() => setFinal(final))
  $effect(() => {
    if (!$suspended) onload?.()
  })
  $effect(() => {
    if ($suspended) onsuspend?.()
  })
  $effect(() => {
    if ($errors.length > 0) onerror?.($errors)
  })

  const { invalidate } = useThrelte()

  const group = new Group()
  const parentObject3D = useParentObject3D()

  watch([parentObject3D, suspended, errors], ([parent, suspended, errors]) => {
    // we don't have a parent, so we can't add ourselves to it
    if (!parent) return

    // if the component is suspended or has errors, we remove ourselves from the parent
    if (suspended || errors.length) {
      parent.remove(group)
      invalidate()
      return
    }

    parent.add(group)
    invalidate()

    return () => {
      parent.remove(group)
      invalidate()
    }
  })
</script>

<!-- Block the graph from mounting to the parent -->
<T
  is={group}
  attach={false}
>
  {@render children?.({ suspended: $suspended, errors: $errors })}
</T>

{#if $errors.length}
  {@render error?.({ errors: $errors })}
{:else if $suspended}
  {@render fallback?.()}
{/if}
