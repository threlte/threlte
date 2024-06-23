<script lang="ts">
  import { HierarchicalObject, T, useParent, watch } from '@threlte/core'
  import { Group } from 'three'
  import { createSuspenseContext } from './context'
  import type { Snippet } from 'svelte'

  interface Props {
    final?: boolean

    children: Snippet

    onload?: () => void
    onerror?: (error: Error[]) => void
    onsuspend?: () => void
  }

  let { final = false, onload, onsuspend, onerror, children }: Props = $props()

  const { suspended, errors, setFinal } = createSuspenseContext({ final })
  $effect.pre(() => setFinal(final))
  $effect.pre(() => {
    if (!$suspended) onload?.()
  })
  $effect.pre(() => {
    if ($suspended) onsuspend?.()
  })
  $effect.pre(() => {
    if ($errors.length > 0) onerror?.($errors)
  })

  const group = new Group()
  const parent = useParent()

  watch([parent, suspended, errors], ([parent, suspended, errors]) => {
    // we don't have a parent, so we can't add ourselves to it
    if (!parent) return
    // if the component is suspended or has errors, we remove ourselves from the parent
    if (suspended || errors.length) {
      parent.remove(group)
      return
    }
    parent.add(group)
    return () => {
      parent.remove(group)
    }
  })
</script>

<!-- Block the graph from mounting to the parent -->
<HierarchicalObject>
  <T is={group}>
    <slot
      suspended={$suspended}
      errors={$errors}
    />
  </T>
</HierarchicalObject>

{#if $errors.length}
  <slot
    name="error"
    errors={$errors}
  />
{:else if $suspended}
  <slot name="fallback" />
{/if}
