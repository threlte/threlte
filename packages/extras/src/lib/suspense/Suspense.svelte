<script lang="ts">
  import { T, useParentObject3D, useThrelte } from '@threlte/core'
  import { Group } from 'three'
  import { createSuspenseContext } from './context.svelte.js'
  import type { SuspenseProps } from './types.js'

  let {
    final = false,
    onload,
    onsuspend,
    onerror,
    error,
    fallback,
    children
  }: SuspenseProps = $props()

  const { suspended, errors } = createSuspenseContext(() => final)
  $effect(() => {
    if (!suspended.current) onload?.()
  })
  $effect(() => {
    if (suspended.current) onsuspend?.()
  })
  $effect(() => {
    if (errors.current.length > 0) onerror?.(errors.current)
  })

  const { invalidate } = useThrelte()

  const group = new Group()
  const parent = useParentObject3D()

  $effect.pre(() => {
    // we don't have a parent, so we can't add ourselves to it
    if (!parent.current) return

    // if the component is suspended or has errors, we remove ourselves from the parent
    if (suspended.current || errors.current.length) {
      parent.current.remove(group)
      invalidate()
      return
    }

    parent.current.add(group)
    invalidate()

    return () => {
      parent.current.remove(group)
      invalidate()
    }
  })
</script>

<!-- Block the graph from mounting to the parent -->
<T
  is={group}
  attach={false}
>
  {@render children?.({ suspended: suspended.current, errors: errors.current })}
</T>

{#if errors.current.length}
  {@render error?.({ errors: errors.current })}
{:else if suspended.current}
  {@render fallback?.()}
{/if}
