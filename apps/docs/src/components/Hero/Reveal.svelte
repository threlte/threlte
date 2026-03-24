<script lang="ts">
  import type { Snippet } from 'svelte'
  import { MathUtils } from 'three'

  interface Props {
    progress: number
    from?: number
    to?: number
    children?: Snippet
  }

  let { progress, from = 0, to = 1, children }: Props = $props()

  let p = $derived(MathUtils.clamp(MathUtils.mapLinear(progress, from, to, 0, 1), 0, 1))
</script>

<div
  class="reveal"
  style="--progress: {p};"
>
  {@render children?.()}
</div>

<style>
  .reveal {
    --enter: calc(var(--progress) * 200%);
    --leave: calc(var(--enter) - 100%);
    mask-position: center;
    -webkit-mask-position-x: center;
    -webkit-mask-position-y: center;
    mask-size: cover;
    mask-image: linear-gradient(90deg, #000 var(--leave), transparent var(--enter));
  }
</style>
