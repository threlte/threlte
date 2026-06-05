<script lang="ts">
  import type { Snippet } from 'svelte'
  import { scrollPos } from './scrollPos'

  interface Props {
    in?: number | undefined
    out?: number | undefined
    children?: Snippet
    fallback?: Snippet
  }

  let { in: _in, out: _out, children, fallback }: Props = $props()
</script>

{#if (_in === undefined || $scrollPos > _in) && (_out === undefined || $scrollPos < _out)}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
