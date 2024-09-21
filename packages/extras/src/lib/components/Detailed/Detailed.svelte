<script lang="ts">
  import type { DetailedProps } from './Detailed.svelte'
  import { LOD } from 'three'
  import { injectPlugin, T } from '@threlte/core'
  import { onMount } from 'svelte'

  let {
    distances = [],
    hysteresis = 0,
    ref = $bindable(),
    children,
    ...props
  }: DetailedProps = $props()

  const lod = new LOD()
  injectPlugin('detailed', ({ ref }) => {
    onMount(() => {
      if (ref.parent === lod) {
        lod.levels.length = 0
        lod.children.forEach((object, index) => {
          lod.levels.push({ object, hysteresis, distance: distances[index] })
        })
      }
    })
  })
</script>

<T
  is={lod}
  bind:ref
  {...props}
>
  {@render children?.({ ref: lod })}
</T>
