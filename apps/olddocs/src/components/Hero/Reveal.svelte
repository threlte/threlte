<script lang="ts">
  import { clamp, mapLinear } from 'three/src/math/MathUtils.js'

  export let progress: number

  export let from: number = 0
  export let to: number = 1

  $: p = clamp(mapLinear(progress, from, to, 0, 1), 0, 1)
</script>

<div
  class="reveal"
  style="--progress: {p};"
>
  <slot />
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
