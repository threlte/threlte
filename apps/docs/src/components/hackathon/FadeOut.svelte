<script lang="ts">
  import { MathUtils } from 'three'

  export let progress: number

  export let from: number = 0
  export let to: number = 1

  $: p = MathUtils.clamp(MathUtils.mapLinear(progress, from, to, 1, 0), 0, 1)
</script>

<div style="opacity: {p};">
  {#if p > 0}
    <slot />
  {/if}
</div>
