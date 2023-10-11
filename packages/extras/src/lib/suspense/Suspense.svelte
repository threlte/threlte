<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { createSuspenseContext } from './context'
  import { HierarchicalObject, T, useParent, watch } from '@threlte/core'
  import { Group } from 'three'

  type $$Events = {
    load: void
    error: Error
  }

  export let final = false

  const dispatch = createEventDispatcher<{
    load: void
    suspend: void
  }>()

  const { suspended, errors, setFinal } = createSuspenseContext({ final })
  $: setFinal(final)

  $: if (!$suspended) dispatch('load')
  $: if ($suspended) dispatch('suspend')

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
