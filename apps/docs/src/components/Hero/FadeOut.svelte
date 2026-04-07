<script lang="ts">
  import { MathUtils } from 'three'

  interface Props {
    progress: number
    from?: number
    to?: number
    children?: import('svelte').Snippet
  }

  let { progress, from = 0, to = 1, children }: Props = $props()

  let p = $derived(MathUtils.clamp(MathUtils.mapLinear(progress, from, to, 1, 0), 0, 1))
</script>

<div style="opacity: {p};">
  {#if p > 0}
    {@render children?.()}
  {/if}
</div>
