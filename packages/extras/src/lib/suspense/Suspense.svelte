<script lang="ts">
  import { T } from '@threlte/core'
  import { type Snippet } from 'svelte'
  import { Group } from 'three'
  import InnerSuspense from './InnerSuspense.svelte'

  interface Props {
    children?: Snippet<[{ suspended: boolean }]>
    error?: Snippet<[{ error: unknown; reset: () => void }]>
    fallback?: Snippet

    onload?: () => void
    onerror?: ((error: unknown, reset: () => void) => void) | undefined
    onsuspend?: () => void
  }

  let { onload, onsuspend, onerror, error, fallback, children: c }: Props = $props()

  const group = new Group()
</script>

<svelte:boundary {onerror}>
  <InnerSuspense
    {onsuspend}
    {onload}
  >
    {#snippet children(suspended: boolean)}
      <!-- Block the graph from mounting to the parent -->
      <T
        is={group}
        attach={suspended ? false : undefined}
      >
        {@render c?.({ suspended: suspended })}
      </T>
    {/snippet}
  </InnerSuspense>

  {#snippet pending()}
    {@render fallback?.()}
  {/snippet}

  {#snippet failed(reason, reset)}
    {@render error?.({ error: reason, reset })}
  {/snippet}
</svelte:boundary>
