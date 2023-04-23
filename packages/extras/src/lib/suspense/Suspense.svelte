<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { createSuspenseContext } from './context'
  import { T } from '@threlte/core'

  export let final = false

  const { suspended, errors } = createSuspenseContext()

  const dispatch = createEventDispatcher<{
    load: void
  }>()

  $: if (!$suspended) dispatch('load')

  $: showErrors = $errors.size > 0
  $: showFallback = !showErrors && $suspended
  $: showContent = !showErrors && !$suspended
</script>

<T.Group visible={showContent}>
  <slot suspended={$suspended} errors={$errors} />
</T.Group>

{#if showFallback}
  <slot name="fallback" />
{/if}

{#if showErrors}
  <slot name="error" errors={$errors} />
{/if}
