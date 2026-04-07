<script lang="ts">
  import { T } from '@threlte/core'
  import { tick, type Snippet } from 'svelte'
  import { Group } from 'three'

  interface Props {
    children?: Snippet<[{ suspended: boolean }]>
    error?: Snippet<[{ error: unknown; reset: () => void }]>
    fallback?: Snippet

    onload?: () => void
    onerror?: ((error: unknown, reset: () => void) => void) | undefined
    onsuspend?: () => void
  }

  let { onload, onsuspend, onerror, error, fallback, children }: Props = $props()

  $effect(() => {
    if ($effect.pending() > 0) {
      onsuspend?.()
    } else {
      onload?.()
    }
  })

  const group = new Group()
</script>

<svelte:boundary {onerror}>
  <!-- Block the graph from mounting to the parent -->
  <T
    is={group}
    attach={$effect.pending() > 0 ? false : undefined}
  >
    {@render children?.({ suspended: $effect.pending() > 0 })}
  </T>

  {#snippet pending()}
    {@render fallback?.()}
  {/snippet}

  {#snippet failed(reason, reset)}
    {@render error?.({ error: reason, reset })}
  {/snippet}
</svelte:boundary>
