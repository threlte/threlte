<script lang="ts">
  import type { ThingProps } from './types.js'

  let {
    name,
    size = 1,
    speed = 0.5,
    value = $bindable(3),
    onchange,
    ref = $bindable(),
    children
  }: ThingProps = $props()
</script>

<button
  bind:this={ref}
  onclick={() => onchange?.({ size })}
>
  {name}
  {speed}
  {value}
  {@render children?.()}
</button>
