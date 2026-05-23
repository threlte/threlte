<script lang="ts">
  import { T, useParentObject3D, useThrelte } from '@threlte/core'
  import { Group } from 'three'
  import { createSuspenseContext } from './context.js'
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
  const parent = useParentObject3D()

  $effect.pre(() => {
    // we don't have a parent, so we can't add ourselves to it
    if (!$parent) return

    // if the component is suspended or has errors, we remove ourselves from the parent
    if ($suspended || $errors.length) {
      $parent.remove(group)
      invalidate()
      return
    }

    $parent.add(group)
    invalidate()

    return () => {
      $parent.remove(group)
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
