<script lang="ts">
  import { clamp, mapLinear } from 'three/src/math/MathUtils.js'

  export let progress: number

  export let from: number = 0
  export let to: number = 1

  $: p = clamp(mapLinear(progress, from, to, 1, 0), 0, 1)
</script>

<div style="opacity: {p};">
  {#if p > 0}
    <slot />
  {/if}
</div>
