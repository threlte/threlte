<script lang="ts">
  import { T } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Group } from 'three'
  import { createSuspenseContext } from './context.svelte.js'

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

  const { suspended, errors } = createSuspenseContext(() => ({ final }))

  $effect(() => {
    if (suspended.current) {
      onsuspend?.()
    } else {
      onload?.()
    }
  })

  $effect(() => {
    if (errors.current.length > 0) {
      onerror?.(errors.current)
    }
  })

  const group = new Group()
</script>

<!-- Block the graph from mounting to the parent -->
<T
  is={group}
  attach={suspended.current || errors.current.length > 0 ? false : undefined}
>
  {@render children?.({ suspended: suspended.current, errors: errors.current })}
</T>

{#if errors.current.length}
  {@render error?.({ errors: errors.current })}
{:else if suspended.current}
  {@render fallback?.()}
{/if}
