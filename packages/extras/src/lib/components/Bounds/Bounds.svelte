<script lang="ts">
  import { T } from '@threlte/core'
  import { Group } from 'three'
  import type { BoundsProps } from './types.js'

  let {
    maxDuration = 1,
    margin = 1.2,
    observe = false,
    fit = false,
    clip = false,
    interpolateFunc = (t) => t,
    onFit = () => {},
    ref = $bindable(),
    children,
    ...props
  }: BoundsProps = $props()

  const group = new Group()
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  {@render children?.({ ref: group })}
</T>
