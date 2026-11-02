<script lang="ts">
  import type { ThingProps } from './types.js'

  let {
    name,
    size = 1,
    speed = 0.5,
    // an arrow function default
    shape = (progress) => progress * 2,
    url = 'https://example.com/thing.json' /* a URL default */,
    value = $bindable(3),
    onchange,
    onpick,
    onclear,
    ref = $bindable(),
    children
  }: ThingProps = $props()
</script>

<button
  bind:this={ref}
  data-url={url}
  onclick={() => onchange?.({ size: shape(size) })}
  ondblclick={() => onpick?.(0, name)}
  oncontextmenu={() => onclear?.()}
>
  {name}
  {speed}
  {value}
  {@render children?.()}
</button>
